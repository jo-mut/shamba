"use client"
import { createContext } from 'react';
import { DepositToken, Token } from '../types/types';

interface PoolContextType {
    address: string | undefined;
    poolDetails: any | null;
    setPoolDetails: React.Dispatch<React.SetStateAction<any>>;
    setModifyPoolID: React.Dispatch<React.SetStateAction<any>>,
    loader: boolean;
    setLoader: React.Dispatch<React.SetStateAction<any>>,
    checkAdmin: boolean;
    modifyPoolID: string;
    sweep: (token: Token) => void;
    modifyPool: () => void;
    createPool: () => void;
    transferToken: (amount: string, transferAddress: string) => void;
    addTokenToMetamask: () => void;
    setWithdrawPoolID: (index: string | number) => void;
}


const PoolContext = createContext<PoolContextType>({
    address: '',
    poolDetails: null,
    loader: false,
    checkAdmin: false,
    modifyPoolID: '',
    setLoader: () => { },
    setPoolDetails: () => { },
    sweep: () => { },
    modifyPool: () => { },
    createPool: () => { },
    transferToken: (amount: string, transferAddress: string) => { },
    setModifyPoolID: () => {},
    addTokenToMetamask: () => {},
    setWithdrawPoolID: (index: string | number) => {}
});

export default PoolContext;