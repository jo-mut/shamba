"use client"
import PoolContext from '@/app/providers/PoolContext';
import ICOToken from '@/components/views/admin/ICOToken'
import React, { useContext } from 'react'

function Page() {
    const { setLoader } = useContext(PoolContext);
    return (
        <ICOToken
            setLoader={setLoader} />
    )
}

export default Page