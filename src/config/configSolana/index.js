import { Connection } from "@solana/web3.js";
import { 
    TxVersion, 
    MAINNET_PROGRAM_ID,
    DEVNET_PROGRAM_ID, 
    LOOKUP_TABLE_CACHE,
} from "@raydium-io/raydium-sdk";

export const isMainNet = true;

export const networkUrl = !isMainNet 
    ? "https://api.devnet.solana.com"
    : 'https://mainnet.helius-rpc.com/?api-key=3af51399-dce8-4b13-a7d7-07e45a62a116';
export const PROGRAMIDS = isMainNet ? MAINNET_PROGRAM_ID : DEVNET_PROGRAM_ID;
export const BUNDLR_URL = isMainNet ? "https://node1.bundlr.network" : "https://devnet.bundlr.network";
export const addLookupTableInfo = isMainNet ? LOOKUP_TABLE_CACHE : undefined;

export const connection = new Connection(networkUrl, "confirmed");

export const makeTxVersion = TxVersion.V0; // LEGACY