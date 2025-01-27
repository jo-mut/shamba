"use client"

import React, { useEffect, useState } from 'react'
import PoolContext from './PoolContext'
import { useAccount } from 'wagmi';
import { contractData, sweep, modifyPool, createPool, transferToken } from "../../context"


const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS!

function PoolProvider({ children }: any) {
    const { address } = useAccount();
    const [loader, setLoader] = useState<boolean>(false);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [poolDetails, setPoolDetails] = useState();
    const [modifyPoolID, setModifyPoolID] = useState<string>('');

    const loadData = async () => {
        if (address) {
            setLoader(true)
            if (address?.toLowerCase() == ADMIN_ADDRESS?.toLowerCase()) {
                setCheckAdmin(true);
                const data = await contractData(address);
                setPoolDetails(data);
                console.log("contract data: ", data);
            }

            setLoader(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [address])


    return (
        <PoolContext.Provider value={{
            address,
            poolDetails,
            setPoolDetails,
            setLoader,
            checkAdmin,
            loader,
            modifyPoolID,
            sweep,
            modifyPool,
            createPool,
            transferToken,
            setModifyPoolID
        }}>
            {children}
        </PoolContext.Provider>
    )
}

export default PoolProvider