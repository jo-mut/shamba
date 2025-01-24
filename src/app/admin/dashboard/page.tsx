"use client"
import PoolContext from '@/app/providers/PoolContext'
import AdminCard from '@/components/views/admin/AdminCard'
import Token from '@/components/views/admin/Token';
import React, { useContext } from 'react'

function Page() {
    const { poolDetails } = useContext(PoolContext);
    return (
       <div className='container'>
         <div className="row">
                {poolDetails?.poolInfoArray.map((pool: any, index: number) => (
                    <AdminCard
                        key={index}
                        value={`${pool.depositedAmount || "0.0"} ${pool.depositedToken.symbol}`}
                        name={`Current APY: ${pool.apy}`} />
                ))}
                <AdminCard
                    value={`${poolDetails?.deÌpositedAmount || "0.0"} ${poolDetails?.depositedToken.symbol}`}
                    name={`Total Stake`} />
                <AdminCard
                    value={`${poolDetails?.depositedToken?.balance?.slice(0, 8) || "0.0"} ${poolDetails?.depositedToken.symbol}`}
                    name={`Your Balance`} />
                <AdminCard
                    value={`${poolDetails?.contractTokenBalance || "0.0"} ${poolDetails?.depositedToken.symbol}`}
                    name={`Available Supply`} />
            </div>
            <Token
                token={poolDetails?.depositedToken} />
       </div>
    )
}

export default Page