"use client"
import PoolContext from '@/app/providers/PoolContext';
import Pool from '@/components/views/admin/Pool'
import React, { useContext } from 'react'

function Page() {
    const { setLoader, poolDetails, setModifyPoolID, createPool } = useContext(PoolContext);

    return (
        <Pool
            setModifyPoolID={setModifyPoolID}
            setLoader={setLoader}
            createPool={createPool}
            poolDetails={poolDetails} />
    )
}

export default Page