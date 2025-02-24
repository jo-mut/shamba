"use client"
import fetchPools from '@/common/api/pools';
import { LiquidityPool } from '@/app/types/types';
import React, { useEffect, useState } from 'react'


const Liquidity = () => {
  const [uniswapPools, setUniswapPools] = useState<LiquidityPool[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const uniswapPools = await fetchPools()
      setUniswapPools(uniswapPools);
    }
    loadData()
  }, [])

  
  return (
    <>
      {uniswapPools.map((p, i) => (
        <div>
          {p.pool_id}
        </div>
      ))}
    </>
  )
}

export default Liquidity;
