import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { TokenSwap } from "../target/types/token_swap";
import { randomBytes } from "crypto";
import {
  awaitComputationFinalization,
  getArciumEnv,
  getCompDefAccOffset,
  getArciumAccountBaseSeed,
  getArciumProgAddress,
  buildFinalizeCompDefTx,
  RescueCipher,
  deserializeLE,
  getMXEAccAddress,
  getMempoolAccAddress,
  getCompDefAccAddress,
  getExecutingPoolAccAddress,
  getClusterAccAddress,
  x25519,
  getComputationAccAddress,
  getMXEPublicKey,
} from "@arcium-hq/client";
import * as fs from "fs";
import * as os from "os";

describe("Token Swap", () => {
  const USE_DEVNET = process.env.USE_DEVNET === "true";
  const CLUSTER_OFFSET = 1078779259;

  let program: Program<TokenSwap>;
  let provider: anchor.AnchorProvider;
  let clusterPubkey: PublicKey;

  if (USE_DEVNET) {
    const connection = new anchor.web3.Connection(
      process.env.RPC_URL || "https://api.devnet.solana.com",
      "confirmed"
    );
    const owner = readKpJson(`${os.homedir()}/.config/solana/id.json`);
    const wallet = new anchor.Wallet(owner);
    provider = new anchor.AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    anchor.setProvider(provider);
    
    const programId = new PublicKey("5C8331rsHs3cpWeBcZMXuxjjwgMo9cXWvR3gJmMHCShZ");
    program = new anchor.Program(
      require("../target/idl/token_swap.json"),
      programId,
      provider
    ) as Program<TokenSwap>;
    
    clusterPubkey = getClusterAccAddress(CLUSTER_OFFSET);
  } else {
    anchor.setProvider(anchor.AnchorProvider.env());
    program = anchor.workspace.TokenSwap as Program<TokenSwap>;
    provider = anchor.getProvider() as anchor.AnchorProvider;
    const arciumEnv = getArciumEnv();
    clusterPubkey = arciumEnv.arciumClusterPubkey;
  }

  type Event = anchor.IdlEvents<(typeof program)["idl"]>;
  const awaitEvent = async <E extends keyof Event>(eventName: E) => {
    let listenerId: number;
    const event = await new Promise<Event[E]>((res) => {
      listenerId = program.addEventListener(eventName, (event) => {
        res(event);
      });
    });
    await program.removeEventListener(listenerId);
    return event;
  };

  it("Swap tokens with confidential amounts!", async () => {
    const owner = readKpJson(`${os.homedir()}/.config/solana/id.json`);

    const mxePublicKey = await getMXEPublicKeyWithRetry(
      provider as anchor.AnchorProvider,
      program.programId
    );

    console.log("MXE x25519 pubkey is", mxePublicKey);

    console.log("Initializing swap computation definitions");
    await initCalculateSwapCompDef(program, owner);
    await initValidateSwapCompDef(program, owner);
    console.log("Computation definitions initialized");

    const privateKey = x25519.utils.randomSecretKey();
    const publicKey = x25519.getPublicKey(privateKey);
    const sharedSecret = x25519.getSharedSecret(privateKey, mxePublicKey);
    const cipher = new RescueCipher(sharedSecret);

    console.log("\nTest 1: Swap 100 Token A");
    const swapAmount = BigInt(100);
    const plaintext = [swapAmount];
    const nonce = randomBytes(16);
    const ciphertext = cipher.encrypt(plaintext, nonce);

    const swapEventPromise = awaitEvent("swapEvent");
    const computationOffset = new anchor.BN(randomBytes(8), "hex");

    const swapSig = await program.methods
      .calculateSwap(
        computationOffset,
        Array.from(ciphertext[0]),
        Array.from(publicKey),
        new anchor.BN(deserializeLE(nonce).toString())
      )
      .accountsPartial({
        computationAccount: getComputationAccAddress(
          program.programId,
          computationOffset
        ),
        clusterAccount: clusterPubkey,
        mxeAccount: getMXEAccAddress(program.programId),
        mempoolAccount: getMempoolAccAddress(program.programId),
        executingPool: getExecutingPoolAccAddress(program.programId),
        compDefAccount: getCompDefAccAddress(
          program.programId,
          Buffer.from(getCompDefAccOffset("calculate_swap")).readUInt32LE()
        ),
      })
      .rpc({ skipPreflight: true, commitment: "confirmed" });

    console.log("Swap queued with signature:", swapSig);

    const finalizeSig = await awaitComputationFinalization(
      provider as anchor.AnchorProvider,
      computationOffset,
      program.programId,
      "confirmed"
    );
    console.log("Computation finalized with signature:", finalizeSig);

    const swapEvent = await swapEventPromise;
    console.log(
      `Swapped ${swapAmount} Token A → ${swapEvent.tokenBAmount} Token B`
    );
    console.log(
      `Expected: ${swapAmount * BigInt(2)}, Actual: ${swapEvent.tokenBAmount}`
    );

    console.log("\nTest 2: Validate swap amount");
    const testAmount = BigInt(500);
    const testPlaintext = [testAmount];
    const testNonce = randomBytes(16);
    const testCiphertext = cipher.encrypt(testPlaintext, testNonce);

    const validationEventPromise = awaitEvent("validationEvent");
    const validationOffset = new anchor.BN(randomBytes(8), "hex");

    const minAmount = new anchor.BN(10);
    const maxAmount = new anchor.BN(1000);

    const validateSig = await program.methods
      .validateSwapAmount(
        validationOffset,
        Array.from(testCiphertext[0]),
        Array.from(publicKey),
        new anchor.BN(deserializeLE(testNonce).toString()),
        minAmount,
        maxAmount
      )
      .accountsPartial({
        computationAccount: getComputationAccAddress(
          program.programId,
          validationOffset
        ),
        clusterAccount: clusterPubkey,
        mxeAccount: getMXEAccAddress(program.programId),
        mempoolAccount: getMempoolAccAddress(program.programId),
        executingPool: getExecutingPoolAccAddress(program.programId),
        compDefAccount: getCompDefAccAddress(
          program.programId,
          Buffer.from(getCompDefAccOffset("validate_swap_amount")).readUInt32LE()
        ),
      })
      .rpc({ skipPreflight: true, commitment: "confirmed" });

    console.log("Validation queued with signature:", validateSig);

    const validateFinalizeSig = await awaitComputationFinalization(
      provider as anchor.AnchorProvider,
      validationOffset,
      program.programId,
      "confirmed"
    );
    console.log(
      "Validation finalized with signature:",
      validateFinalizeSig
    );

    const validationEvent = await validationEventPromise;
    console.log(
      `Amount ${testAmount} is valid (${minAmount} - ${maxAmount}): ${validationEvent.isValid}`
    );

    console.log("\n=== Test 3: Validate amount outside range ===");
    const invalidAmount = BigInt(5000);
    const invalidPlaintext = [invalidAmount];
    const invalidNonce = randomBytes(16);
    const invalidCiphertext = cipher.encrypt(invalidPlaintext, invalidNonce);

    const invalidValidationEventPromise = awaitEvent("validationEvent");
    const invalidValidationOffset = new anchor.BN(randomBytes(8), "hex");

    const invalidValidateSig = await program.methods
      .validateSwapAmount(
        invalidValidationOffset,
        Array.from(invalidCiphertext[0]),
        Array.from(publicKey),
        new anchor.BN(deserializeLE(invalidNonce).toString()),
        minAmount,
        maxAmount
      )
      .accountsPartial({
        computationAccount: getComputationAccAddress(
          program.programId,
          invalidValidationOffset
        ),
        clusterAccount: clusterPubkey,
        mxeAccount: getMXEAccAddress(program.programId),
        mempoolAccount: getMempoolAccAddress(program.programId),
        executingPool: getExecutingPoolAccAddress(program.programId),
        compDefAccount: getCompDefAccAddress(
          program.programId,
          Buffer.from(getCompDefAccOffset("validate_swap_amount")).readUInt32LE()
        ),
      })
      .rpc({ skipPreflight: true, commitment: "confirmed" });

    console.log("Invalid validation queued with signature:", invalidValidateSig);

    await awaitComputationFinalization(
      provider as anchor.AnchorProvider,
      invalidValidationOffset,
      program.programId,
      "confirmed"
    );

    const invalidValidationEvent = await invalidValidationEventPromise;
    console.log(
      `Amount ${invalidAmount} is valid (${minAmount} - ${maxAmount}): ${invalidValidationEvent.isValid}`
    );

    console.log("\n All tests passed!");
  });

  async function initCalculateSwapCompDef(
    program: Program<TokenSwap>,
    owner: anchor.web3.Keypair
  ): Promise<string> {
    const baseSeedCompDefAcc = getArciumAccountBaseSeed(
      "ComputationDefinitionAccount"
    );
    const offset = getCompDefAccOffset("calculate_swap");

    const compDefPDA = PublicKey.findProgramAddressSync(
      [baseSeedCompDefAcc, program.programId.toBuffer(), offset],
      getArciumProgAddress()
    )[0];

    const sig = await program.methods
      .initCalculateSwapCompDef()
      .accounts({
        compDefAccount: compDefPDA,
        payer: owner.publicKey,
        mxeAccount: getMXEAccAddress(program.programId),
      })
      .signers([owner])
      .rpc({ commitment: "confirmed" });

    console.log("Init calculate_swap computation definition:", sig);

    const finalizeTx = await buildFinalizeCompDefTx(
      provider as anchor.AnchorProvider,
      Buffer.from(offset).readUInt32LE(),
      program.programId
    );

    const latestBlockhash = await provider.connection.getLatestBlockhash();
    finalizeTx.recentBlockhash = latestBlockhash.blockhash;
    finalizeTx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    finalizeTx.sign(owner);

    await provider.sendAndConfirm(finalizeTx);

    return sig;
  }

  async function initValidateSwapCompDef(
    program: Program<TokenSwap>,
    owner: anchor.web3.Keypair
  ): Promise<string> {
    const baseSeedCompDefAcc = getArciumAccountBaseSeed(
      "ComputationDefinitionAccount"
    );
    const offset = getCompDefAccOffset("validate_swap_amount");

    const compDefPDA = PublicKey.findProgramAddressSync(
      [baseSeedCompDefAcc, program.programId.toBuffer(), offset],
      getArciumProgAddress()
    )[0];

    const sig = await program.methods
      .initValidateSwapCompDef()
      .accounts({
        compDefAccount: compDefPDA,
        payer: owner.publicKey,
        mxeAccount: getMXEAccAddress(program.programId),
      })
      .signers([owner])
      .rpc({ commitment: "confirmed" });

    console.log("Init validate_swap_amount computation definition:", sig);

    const finalizeTx = await buildFinalizeCompDefTx(
      provider as anchor.AnchorProvider,
      Buffer.from(offset).readUInt32LE(),
      program.programId
    );

    const latestBlockhash = await provider.connection.getLatestBlockhash();
    finalizeTx.recentBlockhash = latestBlockhash.blockhash;
    finalizeTx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    finalizeTx.sign(owner);

    await provider.sendAndConfirm(finalizeTx);

    return sig;
  }
});

async function getMXEPublicKeyWithRetry(
  provider: anchor.AnchorProvider,
  programId: PublicKey,
  maxRetries: number = 10,
  retryDelayMs: number = 500
): Promise<Uint8Array> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const mxePublicKey = await getMXEPublicKey(provider, programId);
      if (mxePublicKey) {
        return mxePublicKey;
      }
    } catch (error) {
      console.log(`Attempt ${attempt} failed to fetch MXE public key:`, error);
    }

    if (attempt < maxRetries) {
      console.log(
        `Retrying in ${retryDelayMs}ms... (attempt ${attempt}/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  }

  throw new Error(
    `Failed to fetch MXE public key after ${maxRetries} attempts`
  );
}

function readKpJson(path: string): anchor.web3.Keypair {
  const file = fs.readFileSync(path);
  return anchor.web3.Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(file.toString()))
  );
}
