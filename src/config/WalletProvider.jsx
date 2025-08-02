import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    LedgerWalletAdapter,
    MathWalletAdapter,
    TokenPocketWalletAdapter,
    CoinbaseWalletAdapter,
    SafePalWalletAdapter,
    TrustWalletAdapter,
    CloverWalletAdapter,
    Coin98WalletAdapter,
    CoinhubWalletAdapter,
    HuobiWalletAdapter,
    HyperPayWalletAdapter,
    KeystoneWalletAdapter,
    KrystalWalletAdapter,
    NightlyWalletAdapter,
    NufiWalletAdapter,
    OntoWalletAdapter,
    SkyWalletAdapter,
    SpotWalletAdapter,
    TokenaryWalletAdapter,
    UnsafeBurnerWalletAdapter,
    WalletConnectWalletAdapter,
    XDEFIWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

export const SolanaWalletProvider = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new MathWalletAdapter(),
            new TokenPocketWalletAdapter(),
            new SafePalWalletAdapter(),
            new TrustWalletAdapter(),
            new CloverWalletAdapter(),
            new Coin98WalletAdapter(),
            new CoinhubWalletAdapter(),
            new HuobiWalletAdapter(),
            new HyperPayWalletAdapter(),
            new KeystoneWalletAdapter(),
            new KrystalWalletAdapter(),
            new NightlyWalletAdapter(),
            new NufiWalletAdapter(),
            new OntoWalletAdapter(),
            new SkyWalletAdapter(),
            new SpotWalletAdapter(),
            new TokenaryWalletAdapter(),
            new UnsafeBurnerWalletAdapter(),
            new WalletConnectWalletAdapter({
                network,
                options: {
                    projectId: 'your-walletconnect-project-id',
                },
            }),
            new XDEFIWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};