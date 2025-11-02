# Confidential Token Swap on Solana

This project demonstrates a privacy-preserving token swap using Arcium's Multi-Party Computation. Users can swap tokens while keeping their swap amounts completely confidential.

## How It Works

### The Privacy Problem in Traditional Swaps

On a public blockchain, all swap transactions are visible:
- Anyone can see how much you're swapping
- Large swaps can move markets before execution
- Front-running becomes trivial

### A Private Solution

Arcium enables confidential token swaps where:

1. **Encrypted Swap Amount**: User submits their Token A amount in encrypted form
2. **Private Rate Calculation**: Exchange rate is applied within the MPC environment
3. **Confidential Output**: Token B amount is calculated privately
4. **On-Chain Settlement**: Only final balances are updated on-chain

## Swap Flow

1. User initializes a swap session with encrypted Token A amount
2. The Solana program triggers confidential computation on Arcium network
3. Within Arcium's secure environment:
   - The swap amount is decrypted
   - Exchange rate is applied
   - Output amount of Token B is calculated
4. The result (Token B amount) is sent back to the Solana program
5. Token balances are updated on-chain

## Security Features

- **Swap Amount Privacy**: The amount being swapped remains confidential
- **Rate Calculation**: Exchange rate is applied within MPC
- **Fair Execution**: No front-running possible since swap amounts are hidden
- **Verifiable Settlement**: Final token transfers are transparent on-chain

## Exchange Rate

This project uses a fixed rate of **1:2** (1 Token A = 2 Token B) for demonstration purposes.
## Getting Started

Refer to the [Arcium documentation](https://docs.arcium.com/developers) for setup instructions.


## Future Works

### Token Integration 
-  Integrate SPL Token Program for real token transfers
-  Add token account validation and ownership checks
-  Implement escrow accounts for secure token custody during swaps
-  Support for multiple token pairs

### AMM Enhancement 
-  Complete AMM pool functionality with real liquidity
-  LP token minting for liquidity providers
-  Fee distribution mechanism
-  Impermanent loss calculations


### User Experience
-  Web3 frontend 
-  Real-time swap preview 
-  Mobile wallet integration
-  Multi-language support

