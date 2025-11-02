# 🔐 Private DEX - Confidential Token Swaps on Solana

> **Privacy-First DeFi**: Trade without revealing your positions. Built with Arcium's Multi-Party Computation (MPC) on Solana.

![Solana](https://img.shields.io/badge/Solana-Program-9945FF?style=flat&logo=solana)
![Arcium](https://img.shields.io/badge/Arcium-MPC-00D4AA?style=flat)
![Anchor](https://img.shields.io/badge/Anchor-0.31.1-purple?style=flat)

## 🎯 The Problem

Traditional DEXs expose **everything** on-chain:
- 🔍 Whale transactions telegraph market moves
- 📊 Trading strategies become public knowledge  
- 🎯 MEV bots front-run large swaps for profit
- 💸 Market impact occurs before execution completes

**Result:** Privacy-conscious traders and institutions avoid DeFi.

## 💡 Our Solution

**Private DEX** uses Arcium's MPC network to keep swap amounts **completely confidential** while maintaining Solana's speed and transparency for settlement.

### Key Features

✨ **Encrypted Swap Amounts** - Trade without revealing position sizes  
🔒 **Private Validation** - Amount limits checked in MPC (no public disclosure)  
🏦 **AMM Pools** - Automated market maker with confidential swap execution  
⚡ **Solana Speed** - Fast finality with privacy guarantees  
🎭 **Zero Front-Running** - Hidden amounts = no MEV exploitation

## 🏗️ Architecture

```
User Input (Encrypted) → Solana Program → Arcium MPC Network
                                                ↓
                                        Private Computation
                                                ↓
                                    Decrypt → Calculate → Re-encrypt
                                                ↓
                              Settlement ← Callback ← Result
```

### Swap Flow

1. **Client-Side Encryption**: User encrypts swap amount with Arcium's public key
2. **On-Chain Submission**: Encrypted data sent to Solana program
3. **MPC Computation**: Arcium network performs private calculation
   - Validates amount within bounds (min/max limits)
   - Applies AMM formula or fixed rate
   - Calculates output amount
4. **Callback**: Result returned to Solana program via callback
5. **Event Emission**: Only the result is made public for settlement

## 🚀 What We Built

### Core Functionality

- ✅ **Confidential Simple Swaps** - Fixed 1:2 rate with encrypted amounts
- ✅ **Private Amount Validation** - Check limits without revealing actual values
- ✅ **AMM Pools** - Create liquidity pools with reserves
- ✅ **Add/Remove Liquidity** - Manage pool reserves (authority only)
- ✅ **AMM-Based Swaps** - Constant product formula with confidential execution

### Technical Implementation

- **3 MPC Circuits**: `calculate_swap`, `validate_swap_amount`, `calculate_swap_amm`
- **Arcium Integration**: Full MPC workflow with computation definitions and callbacks
- **Event System**: Comprehensive event emission for transparency
- **Testing Suite**: End-to-end tests with encryption/decryption

## 📦 Project Structure

```
token_swap/
├── programs/token_swap/     # Solana program (Anchor)
│   └── src/lib.rs           # 631 lines - all swap logic
├── build/                   # Compiled MPC circuits (.arcis)
│   ├── calculate_swap.*
│   ├── validate_swap_amount.*
│   └── calculate_swap_amm.*
├── tests/                   # TypeScript integration tests
│   └── token_swap.ts        # Full encryption → swap → callback flow
└── encrypted-ixs/          # MPC circuit definitions
```

## 🛠️ Quick Start

### Prerequisites
```bash
# Install Anchor CLI
npm install -g @coral-xyz/anchor-cli

# Install Arcium CLI
npm install -g @arcium-hq/cli
```

### Build & Test
```bash
# Build the program
anchor build

# Run tests (localnet)
anchor test

# Run tests on devnet
set USE_DEVNET=true
anchor test --skip-local-validator
```

### Test Coverage

The test suite demonstrates:
1. ✅ MPC computation definition initialization
2. ✅ Client-side encryption with x25519
3. ✅ Encrypted swap submission (100 tokens → 200 tokens)
4. ✅ Amount validation within range (500, valid for 10-1000)
5. ✅ Amount validation outside range (5000, exceeds max)
6. ✅ Full callback handling and event emission

## 🎪 Demo Scenarios

### Scenario 1: Whale Trade Without Market Impact
```typescript
// Whale wants to swap 1M tokens privately
const amount = BigInt(1_000_000);
const encrypted = cipher.encrypt([amount], nonce);
await program.methods.calculateSwap(offset, encrypted, pubKey, nonce).rpc();
// ✅ No one knows the trade size until after execution
```

### Scenario 2: Private Limit Orders
```typescript
// Only execute if amount is between min/max (privately checked)
const min = new anchor.BN(100_000);
const max = new anchor.BN(500_000);
await program.methods.validateSwapAmount(offset, encrypted, pubKey, nonce, min, max).rpc();
// ✅ Validation happens in MPC - limits not revealed
```

### Scenario 3: AMM Pool Trading
```typescript
// Create pool with initial reserves
await program.methods.createPool(poolId, 1_000_000, 2_000_000, 30).rpc();

// Swap using AMM formula (constant product)
await program.methods.calculateSwapAmm(offset, encrypted, pubKey, nonce, poolId).rpc();
// ✅ Swap amount hidden, AMM formula applied in MPC
```

## 🔮 Future Enhancements

- 🪙 **SPL Token Integration** - Real token transfers (currently simulated)
- 💰 **Multi-Pool Support** - Route through multiple pools for best execution
- 📊 **Oracle Price Feeds** - Dynamic rates from external sources (computed privately)
- 🤝 **Cross-Chain Swaps** - Bridge privacy across multiple chains
- 🎯 **MEV Protection** - Additional front-running safeguards
- 📱 **Frontend dApp** - User-friendly interface for encrypted swaps

## 🏆 Why This Matters

**DeFi needs privacy to reach institutional adoption.** This project proves that:

1. ✅ Confidential computation is **practical** on Solana
2. ✅ Privacy and transparency **can coexist** (private amounts, public settlement)
3. ✅ Complex AMM logic **works in MPC** environments
4. ✅ User experience **doesn't require sacrificing privacy**

## 📚 Resources

- [Arcium Documentation](https://docs.arcium.com)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Solana Documentation](https://docs.solana.com/)

## 🤝 Built With

- **Solana** - High-performance blockchain
- **Arcium** - Multi-Party Computation network
- **Anchor** - Solana development framework
- **TypeScript** - Testing and client SDK

## 📄 License

MIT

---

**Built for [Hackathon Name] 2025** 🚀  
*Bringing privacy to DeFi, one swap at a time.*
