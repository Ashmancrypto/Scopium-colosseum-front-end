import { PublicKey } from '@solana/web3.js';
import { isMainNet } from '../../../config/configSolana';

export const PUMPFUN_PROGRAM_ID = isMainNet ? new PublicKey("61dBiC1bHGUzJJw5sdyERg8pH4AXqcA8taNTwRdaSNbA") : new PublicKey("61dBiC1bHGUzJJw5sdyERg8pH4AXqcA8taNTwRdaSNbA");
export const MAINSTATE_PREFIX_SEED = "main";
export const POOLSTATE_PREFIX_SEED = "pool";

export const BACKEND_URL = "https://launch.scopium.com"

export const TOKEN_TOTAL_SUPPLY = 1_000_000_000;
export const TOKEN_DECIMALS = 6;
export const QUOTE_DECIMALS = 9;
export const TRADING_FEE = 0.000001;
export const MIN_TOKEN_BALNCE_CHAT = 10000;
export const MAX_TXN_COL = 10;

export const TREASURY_WALLET = new PublicKey("4tp3Rgd9HwrZxY4oxeGV1FPG3JSeWtNRu1a217r698Fx")

export const VIRT_QUOTE_RESERVES = 28 * Math.pow(10, 9); // 28 SOL in lamports
export const REAL_BASE_RESERVES = 640_000_000 * Math.pow(10, 6); // 800M tokens with 6 decimals