"use client"
import { createContext } from 'react';

interface PoolContextType {
    poolDetails: any | null;
    setPoolDetails: React.Dispatch<React.SetStateAction<any>>;
    setModifyPoolID: React.Dispatch<React.SetStateAction<any>>,
    loader: boolean;
    setLoader: React.Dispatch<React.SetStateAction<any>>,
    checkAdmin: boolean;
    modifyPoolID: string;
    sweep: any
    modifyPool: any
    createPool: any
    transferToken: any
}


const PoolContext = createContext<PoolContextType>({
    poolDetails: null,
    loader: false,
    checkAdmin: false,
    modifyPoolID: '',
    setLoader: () => { },
    setPoolDetails: () => { },
    sweep: () => { },
    modifyPool: () => { },
    createPool: () => { },
    transferToken: () => { },
    setModifyPoolID: () => {}
});

export default PoolContext;