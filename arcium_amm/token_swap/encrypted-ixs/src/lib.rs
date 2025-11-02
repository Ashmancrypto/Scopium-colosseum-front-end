use arcis_imports::*;

#[encrypted]
mod circuits {
    use arcis_imports::*;

    /// User's confidential swap input for Token A
    pub struct SwapInput {
        pub token_a_amount: u64,
    }

    /// Calculated swap output for Token B
    pub struct SwapOutput {
        pub token_b_amount: u64,
    }

    /// Confidential token swap using constant product AMM (x * y = k).
    ///
    /// Formula: amount_out = (amount_in * reserve_b) / (reserve_a + amount_in)
    /// - Reserves are public for transparency
    /// - User input is encrypted for privacy
    /// - Fee applied before calculation
    ///
    /// # Arguments
    /// * `input_ctxt` - Encrypted Token A amount
    /// * `reserve_a` - Pool reserve of Token A
    /// * `reserve_b` - Pool reserve of Token B
    /// * `fee_bps` - Trading fee in basis points (30 = 0.3%)
    ///
    /// # Returns
    /// Token B amount user receives
    #[instruction]
    pub fn calculate_swap_amm(
        input_ctxt: Enc<Shared, SwapInput>,
        reserve_a: u64,
        reserve_b: u64,
        fee_bps: u64,
    ) -> u64 {
        let input = input_ctxt.to_arcis();
        let amount_in = input.token_a_amount;

        // Apply fee: amount_in_with_fee = amount_in * (10000 - fee_bps) / 10000
        let fee_multiplier = 10000u64 - fee_bps;
        let amount_in_with_fee = (amount_in * fee_multiplier) / 10000;

        // AMM formula: amount_out = (amount_in * reserve_b) / (reserve_a + amount_in)
        let numerator = amount_in_with_fee * reserve_b;
        let denominator = reserve_a + amount_in_with_fee;
        let amount_out = numerator / denominator;

        amount_out.reveal()
    }

    /// Simple fixed-rate swap
    #[instruction]
    pub fn calculate_swap(input_ctxt: Enc<Shared, SwapInput>) -> u64 {
        let input = input_ctxt.to_arcis();
        let exchange_rate = 2u64;
        let token_b_amount = input.token_a_amount * exchange_rate;
        token_b_amount.reveal()
    }

    /// Validates swap amount is within limits.
    ///
    /// # Arguments
    /// * `input_ctxt` - Encrypted Token A amount
    /// * `min_amount` - Minimum allowed amount
    /// * `max_amount` - Maximum allowed amount
    ///
    /// # Returns
    /// `true` if amount is within limits, `false` otherwise
    #[instruction]
    pub fn validate_swap_amount(
        input_ctxt: Enc<Shared, SwapInput>,
        min_amount: u64,
        max_amount: u64,
    ) -> bool {
        let input = input_ctxt.to_arcis();
        let is_valid = input.token_a_amount >= min_amount && input.token_a_amount <= max_amount;
        is_valid.reveal()
    }
}
