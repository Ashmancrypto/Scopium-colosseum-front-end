import { createContext, useEffect, useState, useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { 
    contract_getMainStateInfo, 
    contract_isInitialized, 
    contract_initMainState, 
    contract_isPoolCreated, 
    contract_createPoolTx, 
    contract_buyTx, 
    contract_sellTx, 
    contract_updateMainStateInfo, 
    contract_isPoolComplete
} from './contracts';

export const ContractContext = createContext();

const ContractContextProvider = ({ children }) => {
    const [txLoading, setTxLoading] = useState(false);
    const wallet = useWallet();

    useEffect(() => {
        // Any initialization logic can go here
    }, []);

    const getOwnerAddress = async () => {
        const mainStateInfo = await contract_getMainStateInfo(wallet);
        if (!mainStateInfo) return null;
        return mainStateInfo.owner;
    };

    const getMainStateInfo = async () => {
        return await contract_getMainStateInfo(wallet);
    };

    const isContractInitialized = async () => {
        return await contract_isInitialized(wallet);
    };

    const initializeContract = async () => {
        setTxLoading(true);

        try {
            await contract_initMainState(wallet);
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }

        setTxLoading(false);
    };

    const isPoolCreated = async (baseToken, quoteMint) => {
        return await contract_isPoolCreated(wallet, baseToken, quoteMint);
    };

    const getCreatePoolTx = async (baseToken, quoteMint) => {
        let tx = null;

        setTxLoading(true);

        try {
            tx = await contract_createPoolTx(wallet, baseToken, quoteMint);
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }

        setTxLoading(false);

        return tx;
    };

    const getBuyTx = async (token, amount) => {
        let tx = null;

        setTxLoading(true);

        try {
            tx = await contract_buyTx(wallet, token, amount);
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }

        setTxLoading(false);

        return tx;
    };

    const getSellTx = async (token, amount) => {
        let tx = null;

        setTxLoading(true);

        try {
            tx = await contract_sellTx(wallet, token, amount);
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }

        setTxLoading(false);

        return tx;
    };

    const updateMainStateInfo = async (owner, feeRecipient, tradingFee, creatingFee) => {
        setTxLoading(true);

        try {
            await contract_updateMainStateInfo(wallet, owner, feeRecipient, tradingFee, creatingFee);
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }

        setTxLoading(false);
    };

    const isPoolComplete = async (baseToken, quoteMint) => {
        return await contract_isPoolComplete(wallet, baseToken, quoteMint);
    };

    const context = {
        txLoading,
        getOwnerAddress, 
        getMainStateInfo, 
        isContractInitialized, 
        initializeContract, 
        getCreatePoolTx, 
        isPoolCreated, 
        getBuyTx, 
        getSellTx, 
        updateMainStateInfo, 
        isPoolComplete
    };

    return <ContractContext.Provider value={context}>{children}</ContractContext.Provider>
};

export const useContract = () => {
    const contractManager = useContext(ContractContext);
    return contractManager || [{}, async () => {}];
};

export default ContractContextProvider;