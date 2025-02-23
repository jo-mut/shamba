"use client"
import PoolContext from '@/app/providers/PoolContext'
import AdminCard from '@/components/views/admin/AdminCard';
import Token from '@/components/views/admin/Token';
import { Loader } from '@/components/views/main';
import React, { useContext, useEffect, useState } from 'react'
import Statistics from '../home/statistics/page';

function Page() {
    const { poolDetails } = useContext(PoolContext);
    const [loader, setLoader] = useState(false);

    const STAKING_DAPP = process.env.NEXT_PUBLIC_STAKING_DAPP;
    const TOKEN_EXPLORER = process.env.NEXT_PUBLIC_ADDRESS_EXPLORER;
    const ADDRESS_EXPLORER = process.env.NEXT_PUBLIC_TOKEN_EXPLORER;
    const TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;
    const token = poolDetails?.depositToken

    useEffect(() => {
        setLoader(true)
        if (poolDetails) {
            setLoader(false)
        }
    }, [poolDetails])

    return (
        <div className='container'>
            <div className="row">
                {poolDetails?.poolInfoArray.map((pool: any, index: number) => (
                    <AdminCard
                        key={index}
                        value={`${pool.depositedAmount || "0.0"} ${pool.depositToken.symbol}`}
                        name={`Current APY: ${pool.apy}`} />
                ))}
                <AdminCard
                    value={`${poolDetails?.totalDepositAmount || "0.0"} ${poolDetails?.depositToken.symbol}`}
                    name={`Total Stake`} />
                <AdminCard
                    value={`${poolDetails?.depositToken?.balance?.slice(0, 8) || "0.0"} ${poolDetails?.depositToken.symbol}`}
                    name={`Your Balance`} />
                <AdminCard
                    value={`${poolDetails?.contractTokenBalance || "0.0"} ${poolDetails?.depositToken.symbol}`}
                    name={`Available Supply`} />
            </div>
            <div className="col-12 col-lg-12 co-md-9 mt-4">
                <div className="invest invest__big shadow-md">
                    <h2 className="invest__title">
                        Block Explorer
                    </h2>
                    <div className="invest__group">
                        <input
                            className="form__input"
                            defaultValue={`${ADDRESS_EXPLORER}${STAKING_DAPP}`}
                            name="partnerlink"
                            id="partnerlink"
                            type="text" />
                    </div>
                    <p className="invest__text">
                        Stake Token stats
                    </p>
                    <table className="invest__table">
                        <thead>
                            <tr>
                                <th className="text-2xl font-bold">Token</th>
                                <th className="text-2xl font-bold">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{token?.name}</td>
                            </tr>
                            <tr>
                                <td>Symbol</td>
                                <td>{token?.symbol}</td>
                            </tr>
                            <tr>
                                <td>Total Supply</td>
                                <td>{token?.totalSupply}{token?.symbol}</td>
                            </tr>
                            <tr>
                                <td>Total Stake</td>
                                <td>{token?.contractTokenBalance || "0"} {token?.symbol}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Explore Token</td>
                                <td><a
                                    href={`${TOKEN_EXPLORER}${TOKEN}`}
                                    style={{ marginLeft: "10px" }}
                                    target="_blank"
                                    className="header__profile">
                                    <span>
                                        {token?.name} {token?.symbol}
                                    </span>
                                </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Page