use anchor_lang::prelude::*;
use arcium_anchor::prelude::*;
use arcium_client::idl::arcium::types::CallbackAccount;

const COMP_DEF_OFFSET_CALCULATE_SWAP: u32 = comp_def_offset("calculate_swap");
const COMP_DEF_OFFSET_VALIDATE_SWAP: u32 = comp_def_offset("validate_swap_amount");

declare_id!("5C8331rsHs3cpWeBcZMXuxjjwgMo9cXWvR3gJmMHCShZ");

#[arcium_program]
pub mod token_swap {
    use super::*;

    /// Setup MPC computation definition for swaps
    pub fn init_calculate_swap_comp_def(ctx: Context<InitCalculateSwapCompDef>) -> Result<()> {
        init_comp_def(ctx.accounts, true, 0, None, None)?;
        Ok(())
    }

    /// Submit encrypted swap request to MPC network
    pub fn calculate_swap(
        ctx: Context<CalculateSwap>,
        computation_offset: u64,
        token_a_amount: [u8; 32],
        pub_key: [u8; 32],
        nonce: u128,
    ) -> Result<()> {
        let args = vec![
            Argument::ArcisPubkey(pub_key),
            Argument::PlaintextU128(nonce),
            Argument::EncryptedU64(token_a_amount),
        ];

        ctx.accounts.sign_pda_account.bump = ctx.bumps.sign_pda_account;

        queue_computation(
            ctx.accounts,
            computation_offset,
            args,
            None,
            vec![CalculateSwapCallback::callback_ix(&[])],
        )?;

        Ok(())
    }

    /// Receive swap result from MPC and emit event
    #[arcium_callback(encrypted_ix = "calculate_swap")]
    pub fn calculate_swap_callback(
        ctx: Context<CalculateSwapCallback>,
        output: ComputationOutputs<CalculateSwapOutput>,
    ) -> Result<()> {
        let token_b_amount = match output {
            ComputationOutputs::Success(CalculateSwapOutput { field_0 }) => field_0,
            _ => return Err(ErrorCode::AbortedComputation.into()),
        };

        emit!(SwapEvent {
            token_b_amount,
        });

        Ok(())
    }

    /// Setup MPC computation definition for validation
    pub fn init_validate_swap_comp_def(ctx: Context<InitValidateSwapCompDef>) -> Result<()> {
        init_comp_def(ctx.accounts, true, 0, None, None)?;
        Ok(())
    }

    /// Submit encrypted amount for validation against min/max bounds
    pub fn validate_swap_amount(
        ctx: Context<ValidateSwapAmount>,
        computation_offset: u64,
        token_a_amount: [u8; 32],
        pub_key: [u8; 32],
        nonce: u128,
        min_amount: u64,
        max_amount: u64,
    ) -> Result<()> {
        let args = vec![
            Argument::ArcisPubkey(pub_key),
            Argument::PlaintextU128(nonce),
            Argument::EncryptedU64(token_a_amount),
            Argument::PlaintextU64(min_amount),
            Argument::PlaintextU64(max_amount),
        ];

        ctx.accounts.sign_pda_account.bump = ctx.bumps.sign_pda_account;

        queue_computation(
            ctx.accounts,
            computation_offset,
            args,
            None,
            vec![ValidateSwapAmountCallback::callback_ix(&[])],
        )?;

        Ok(())
    }

    /// Receive validation result from MPC and emit event
    #[arcium_callback(encrypted_ix = "validate_swap_amount")]
    pub fn validate_swap_amount_callback(
        ctx: Context<ValidateSwapAmountCallback>,
        output: ComputationOutputs<ValidateSwapAmountOutput>,
    ) -> Result<()> {
        let is_valid = match output {
            ComputationOutputs::Success(ValidateSwapAmountOutput { field_0 }) => field_0,
            _ => return Err(ErrorCode::AbortedComputation.into()),
        };

        emit!(ValidationEvent { is_valid });

        Ok(())
    }

    /// Initialize new liquidity pool
    pub fn create_pool(
        ctx: Context<CreatePool>,
        pool_id: u64,
        initial_reserve_a: u64,
        initial_reserve_b: u64,
        fee_bps: u16,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.pool;
        pool.authority = ctx.accounts.authority.key();
        pool.pool_id = pool_id;
        pool.reserve_a = initial_reserve_a;
        pool.reserve_b = initial_reserve_b;
        pool.fee_bps = fee_bps;
        pool.total_swaps = 0;
        pool.bump = ctx.bumps.pool;

        emit!(PoolCreatedEvent {
            pool_id,
            reserve_a: initial_reserve_a,
            reserve_b: initial_reserve_b,
            fee_bps,
        });

        Ok(())
    }

    /// Deposit tokens into pool
    pub fn add_liquidity(
        ctx: Context<ModifyPool>,
        amount_a: u64,
        amount_b: u64,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.pool;
        pool.reserve_a = pool.reserve_a.checked_add(amount_a).unwrap();
        pool.reserve_b = pool.reserve_b.checked_add(amount_b).unwrap();

        emit!(LiquidityAddedEvent {
            pool_id: pool.pool_id,
            amount_a,
            amount_b,
            new_reserve_a: pool.reserve_a,
            new_reserve_b: pool.reserve_b,
        });

        Ok(())
    }

    /// Withdraw tokens from pool (authority only)
    pub fn remove_liquidity(
        ctx: Context<ModifyPool>,
        amount_a: u64,
        amount_b: u64,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.pool;
        
        require!(
            ctx.accounts.authority.key() == pool.authority,
            ErrorCode::Unauthorized
        );

        pool.reserve_a = pool.reserve_a.checked_sub(amount_a).unwrap();
        pool.reserve_b = pool.reserve_b.checked_sub(amount_b).unwrap();

        emit!(LiquidityRemovedEvent {
            pool_id: pool.pool_id,
            amount_a,
            amount_b,
            new_reserve_a: pool.reserve_a,
            new_reserve_b: pool.reserve_b,
        });

        Ok(())
    }

    /// Setup MPC computation definition for AMM swaps 
    pub fn init_calculate_swap_amm_comp_def(ctx: Context<InitCalculateSwapAmmCompDef>) -> Result<()> {
        init_comp_def(ctx.accounts, true, 0, None, None)?;
        Ok(())
    }

    /// Submit encrypted AMM swap request using pool reserves
    pub fn calculate_swap_amm(
        ctx: Context<CalculateSwapAmm>,
        computation_offset: u64,
        token_a_amount: [u8; 32],
        pub_key: [u8; 32],
        nonce: u128,
    ) -> Result<()> {
        let pool = &ctx.accounts.pool;

        let args = vec![
            Argument::ArcisPubkey(pub_key),
            Argument::PlaintextU128(nonce),
            Argument::EncryptedU64(token_a_amount),
            Argument::PlaintextU64(pool.reserve_a),
            Argument::PlaintextU64(pool.reserve_b),
            Argument::PlaintextU64(pool.fee_bps as u64),
        ];

        ctx.accounts.sign_pda_account.bump = ctx.bumps.sign_pda_account;

        queue_computation(
            ctx.accounts,
            computation_offset,
            args,
            None,
            vec![CalculateSwapAmmCallback::callback_ix(&[
                CallbackAccount {
                    pubkey: pool.key(),
                    is_writable: true,
                },
            ])],
        )?;

        Ok(())
    }

    /// Receive AMM swap result from MPC and emit event
    #[arcium_callback(encrypted_ix = "calculate_swap_amm")]
    pub fn calculate_swap_amm_callback(
        ctx: Context<CalculateSwapAmmCallback>,
        output: ComputationOutputs<CalculateSwapAmmOutput>,
    ) -> Result<()> {
        let token_b_amount = match output {
            ComputationOutputs::Success(CalculateSwapAmmOutput { field_0 }) => field_0,
            _ => return Err(ErrorCode::AbortedComputation.into()),
        };

        // For now, just emit the event
        let pool = &ctx.accounts.pool;

        emit!(SwapAmmEvent {
            pool_id: pool.pool_id,
            token_b_amount,
            reserve_a: pool.reserve_a,
            reserve_b: pool.reserve_b,
        });

        Ok(())
    }
}

#[queue_computation_accounts("calculate_swap", payer)]
#[derive(Accounts)]
#[instruction(computation_offset: u64)]
pub struct CalculateSwap<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init_if_needed,
        space = 9,
        payer = payer,
        seeds = [&SIGN_PDA_SEED],
        bump,
        address = derive_sign_pda!(),
    )]
    pub sign_pda_account: Account<'info, SignerAccount>,
    #[account(
        address = derive_mxe_pda!()
    )]
    pub mxe_account: Account<'info, MXEAccount>,
    #[account(
        mut,
        address = derive_mempool_pda!()
    )]
    /// CHECK: mempool_account, checked by the arcium program
    pub mempool_account: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_execpool_pda!()
    )]
    /// CHECK: executing_pool, checked by the arcium program
    pub executing_pool: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_comp_pda!(computation_offset)
    )]
    /// CHECK: computation_account, checked by the arcium program.
    pub computation_account: UncheckedAccount<'info>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_CALCULATE_SWAP)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(
        mut,
        address = derive_cluster_pda!(mxe_account)
    )]
    pub cluster_account: Account<'info, Cluster>,
    #[account(
        mut,
        address = ARCIUM_FEE_POOL_ACCOUNT_ADDRESS,
    )]
    pub pool_account: Account<'info, FeePool>,
    #[account(
        address = ARCIUM_CLOCK_ACCOUNT_ADDRESS,
    )]
    pub clock_account: Account<'info, ClockAccount>,
    pub system_program: Program<'info, System>,
    pub arcium_program: Program<'info, Arcium>,
}

#[callback_accounts("calculate_swap")]
#[derive(Accounts)]
pub struct CalculateSwapCallback<'info> {
    pub arcium_program: Program<'info, Arcium>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_CALCULATE_SWAP)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(address = ::anchor_lang::solana_program::sysvar::instructions::ID)]
    /// CHECK: instructions_sysvar, checked by the account constraint
    pub instructions_sysvar: AccountInfo<'info>,
}

#[init_computation_definition_accounts("calculate_swap", payer)]
#[derive(Accounts)]
pub struct InitCalculateSwapCompDef<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        mut,
        address = derive_mxe_pda!()
    )]
    pub mxe_account: Box<Account<'info, MXEAccount>>,
    #[account(mut)]
    /// CHECK: comp_def_account, checked by arcium program.
    /// Can't check it here as it's not initialized yet.
    pub comp_def_account: UncheckedAccount<'info>,
    pub arcium_program: Program<'info, Arcium>,
    pub system_program: Program<'info, System>,
}

#[queue_computation_accounts("validate_swap_amount", payer)]
#[derive(Accounts)]
#[instruction(computation_offset: u64)]
pub struct ValidateSwapAmount<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init_if_needed,
        space = 9,
        payer = payer,
        seeds = [&SIGN_PDA_SEED],
        bump,
        address = derive_sign_pda!(),
    )]
    pub sign_pda_account: Account<'info, SignerAccount>,
    #[account(
        address = derive_mxe_pda!()
    )]
    pub mxe_account: Account<'info, MXEAccount>,
    #[account(
        mut,
        address = derive_mempool_pda!()
    )]
    /// CHECK: mempool_account, checked by the arcium program
    pub mempool_account: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_execpool_pda!()
    )]
    /// CHECK: executing_pool, checked by the arcium program
    pub executing_pool: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_comp_pda!(computation_offset)
    )]
    /// CHECK: computation_account, checked by the arcium program.
    pub computation_account: UncheckedAccount<'info>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_VALIDATE_SWAP)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(
        mut,
        address = derive_cluster_pda!(mxe_account)
    )]
    pub cluster_account: Account<'info, Cluster>,
    #[account(
        mut,
        address = ARCIUM_FEE_POOL_ACCOUNT_ADDRESS,
    )]
    pub pool_account: Account<'info, FeePool>,
    #[account(
        address = ARCIUM_CLOCK_ACCOUNT_ADDRESS,
    )]
    pub clock_account: Account<'info, ClockAccount>,
    pub system_program: Program<'info, System>,
    pub arcium_program: Program<'info, Arcium>,
}

#[callback_accounts("validate_swap_amount")]
#[derive(Accounts)]
pub struct ValidateSwapAmountCallback<'info> {
    pub arcium_program: Program<'info, Arcium>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_VALIDATE_SWAP)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(address = ::anchor_lang::solana_program::sysvar::instructions::ID)]
    /// CHECK: instructions_sysvar, checked by the account constraint
    pub instructions_sysvar: AccountInfo<'info>,
}

#[init_computation_definition_accounts("validate_swap_amount", payer)]
#[derive(Accounts)]
pub struct InitValidateSwapCompDef<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        mut,
        address = derive_mxe_pda!()
    )]
    pub mxe_account: Box<Account<'info, MXEAccount>>,
    #[account(mut)]
    /// CHECK: comp_def_account, checked by arcium program.
    /// Can't check it here as it's not initialized yet.
    pub comp_def_account: UncheckedAccount<'info>,
    pub arcium_program: Program<'info, Arcium>,
    pub system_program: Program<'info, System>,
}

// ========== Pool Account Structures ==========

#[account]
#[derive(InitSpace)]
pub struct LiquidityPool {
    pub authority: Pubkey,
    pub pool_id: u64,
    pub reserve_a: u64,
    pub reserve_b: u64,
    pub fee_bps: u16,
    pub total_swaps: u64,
    pub bump: u8,
}

#[derive(Accounts)]
#[instruction(pool_id: u64)]
pub struct CreatePool<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + LiquidityPool::INIT_SPACE,
        seeds = [b"pool", pool_id.to_le_bytes().as_ref()],
        bump,
    )]
    pub pool: Account<'info, LiquidityPool>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ModifyPool<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub pool: Account<'info, LiquidityPool>,
}

// ========== AMM Swap Accounts ==========

const COMP_DEF_OFFSET_CALCULATE_SWAP_AMM: u32 = comp_def_offset("calculate_swap_amm");

#[queue_computation_accounts("calculate_swap_amm", payer)]
#[derive(Accounts)]
#[instruction(computation_offset: u64)]
pub struct CalculateSwapAmm<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        mut,
        seeds = [&SIGN_PDA_SEED],
        bump,
        address = derive_sign_pda!(),
    )]
    pub sign_pda_account: Account<'info, SignerAccount>,
    #[account(
        address = derive_mxe_pda!()
    )]
    pub mxe_account: Account<'info, MXEAccount>,
    #[account(
        mut,
        address = derive_mempool_pda!()
    )]
    /// CHECK: mempool_account, checked by the arcium program
    pub mempool_account: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_execpool_pda!()
    )]
    /// CHECK: executing_pool, checked by the arcium program
    pub executing_pool: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_comp_pda!(computation_offset)
    )]
    /// CHECK: computation_account, checked by the arcium program.
    pub computation_account: UncheckedAccount<'info>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_CALCULATE_SWAP_AMM)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(
        mut,
        address = derive_cluster_pda!(mxe_account)
    )]
    pub cluster_account: Account<'info, Cluster>,
    #[account(
        mut,
        address = ARCIUM_FEE_POOL_ACCOUNT_ADDRESS,
    )]
    pub pool_account: Account<'info, FeePool>,
    #[account(
        address = ARCIUM_CLOCK_ACCOUNT_ADDRESS,
    )]
    pub clock_account: Account<'info, ClockAccount>,
    pub pool: Account<'info, LiquidityPool>,
    pub system_program: Program<'info, System>,
    pub arcium_program: Program<'info, Arcium>,
}

#[callback_accounts("calculate_swap_amm")]
#[derive(Accounts)]
pub struct CalculateSwapAmmCallback<'info> {
    pub arcium_program: Program<'info, Arcium>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_CALCULATE_SWAP_AMM)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(address = ::anchor_lang::solana_program::sysvar::instructions::ID)]
    /// CHECK: instructions_sysvar, checked by the account constraint
    pub instructions_sysvar: AccountInfo<'info>,
    #[account(mut)]
    pub pool: Account<'info, LiquidityPool>,
}

#[init_computation_definition_accounts("calculate_swap_amm", payer)]
#[derive(Accounts)]
pub struct InitCalculateSwapAmmCompDef<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        mut,
        address = derive_mxe_pda!()
    )]
    pub mxe_account: Box<Account<'info, MXEAccount>>,
    #[account(mut)]
    /// CHECK: comp_def_account, checked by arcium program.
    /// Can't check it here as it's not initialized yet.
    pub comp_def_account: UncheckedAccount<'info>,
    pub arcium_program: Program<'info, Arcium>,
    pub system_program: Program<'info, System>,
}

// ========== Events ==========

#[event]
pub struct SwapEvent {
    pub token_b_amount: u64,
}

#[event]
pub struct ValidationEvent {
    pub is_valid: bool,
}

#[event]
pub struct PoolCreatedEvent {
    pub pool_id: u64,
    pub reserve_a: u64,
    pub reserve_b: u64,
    pub fee_bps: u16,
}

#[event]
pub struct LiquidityAddedEvent {
    pub pool_id: u64,
    pub amount_a: u64,
    pub amount_b: u64,
    pub new_reserve_a: u64,
    pub new_reserve_b: u64,
}

#[event]
pub struct LiquidityRemovedEvent {
    pub pool_id: u64,
    pub amount_a: u64,
    pub amount_b: u64,
    pub new_reserve_a: u64,
    pub new_reserve_b: u64,
}

#[event]
pub struct SwapAmmEvent {
    pub pool_id: u64,
    pub token_b_amount: u64,
    pub reserve_a: u64,
    pub reserve_b: u64,
}

// ========== Errors ==========

#[error_code]
pub enum ErrorCode {
    #[msg("The computation was aborted")]
    AbortedComputation,
    #[msg("The cluster is not set")]
    ClusterNotSet,
    #[msg("Unauthorized")]
    Unauthorized,
}
