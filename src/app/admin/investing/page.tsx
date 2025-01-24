"use client"
import PoolContext from '@/app/providers/PoolContext';
import Investing from '@/components/views/admin/Investing'
import Staking from '@/components/views/admin/Staking'
import React, { useContext } from 'react'

function Page() {
    const { setLoader, poolDetails, sweep } = useContext(PoolContext);

    return (
        <>
            <Investing
                poolDetails={poolDetails} />
            <Staking
                poolDetails={poolDetails}
                sweep={sweep}
                setLoader={setLoader} />
        </>
    )
}

export default Page