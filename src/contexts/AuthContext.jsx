import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect, useCallback, createContext } from 'react';
import { useLogin } from '../hooks/auth/useLogin';
import { useLogout } from '../hooks/auth/useLogout';
import { getUser } from '../utils';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        wallets,
        wallet,
        publicKey,
        connected,
        connecting,
        disconnecting,
        select,
        connect,
        disconnect
    } = useWallet();

    const { login } = useLogin();
    const { logout } = useLogout();

    // Handle wallet authentication
    useEffect(() => {
        if (publicKey !== null && !disconnecting && !isAuthenticated) {
            const walletAddress = publicKey.toBase58();

            // Only login if we don't have a user or the wallet address changed
            if (!user) {
                setIsAuthenticated(true);
                login(walletAddress)
                    .then(() => {
                        const user = getUser();
                        setUser(user);
                    })
                    .catch((error) => {
                        console.error('Login failed:', error);
                    })
                    .finally(() => {
                        setIsAuthenticated(false);
                    });
            }
        }

        if (disconnecting && user) {
            logout();
            setUser(null);
        }
    }, [publicKey, disconnecting]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

