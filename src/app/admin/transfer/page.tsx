"use client"
import PoolContext from '@/app/providers/PoolContext';
import Transfer from '@/components/views/admin/Transfer'
import React, { useContext } from 'react'

function Page() {
    const { setLoader, poolDetails, transferToken, address } = useContext(PoolContext);

    return (
        <Transfer
            poolDetails={poolDetails}
            transferToken={transferToken}
            setLoader={setLoader}
            address={address} />
    )
}

export default Page