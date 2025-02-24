"use client"

import React, { useContext, useEffect, useState } from "react";
import { copyAddress, shortenAddress } from "@/context";
import { FaRegCopy, FaEdit } from 'react-icons/fa';
import InputField from "@/components/views/ui/InputField";
import Title from "@/components/views/ui/Title";
import ClickButton from "@/components/views/ui/ClickButton";
import PoolContext from "@/app/providers/PoolContext";
import fetchPools from "@/common/api/pools";

interface PoolProps {
  setModifyPoolID: any
  createPool: any
  setLoader: any
  poolDetails: any
}

const Pool: React.FC<PoolProps> = () => {
  const { poolDetails, setModifyPoolID, createPool, setLoader } = useContext(PoolContext);
  const poolArray = poolDetails?.poolInfoArray ?? [];
  return (
    <div className="pools">
      <div className="create-pool">
        <button
          data-bs-target="#modal-create-pool"
          type="button"
          data-bs-toggle="modal"
          className='px-3.5 py-[7px] text-[15px] rounded font-semibold text-black 
        border border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out 
        duration-300 bg-transparent hover:text-white'>
          Create Pool
        </button>
      </div>
      <div className="container">
        <div className="row">
          {poolArray.map((pool: any, index: number) => (
            <div key={index} className="deals col-12 col-md-6 col-lg-4">
              <h5 className="font-bold mb-3" >#POO-{index}</h5>
              <div className="flex flex-row gap-3">
                <p className="font-bold"> Stake Token:</p>
                <p className="deals-exchange">
                  <span className="flex align-items-center flex-row justify-between red">
                    {shortenAddress(pool.depositTokenAddress)}
                    &nbsp; &nbsp;
                    {pool.depositToken.symbol}
                    &nbsp; &nbsp;
                    <FaRegCopy
                      onClick={() => copyAddress(pool.depositTokenAddress)} />
                  </span>
                </p>
              </div>
              <div className="flex flex-row  gap-3">
                <p className="font-semibold">Reward Token: </p>
                <p className="deals-exchange">
                  <span className="flex align-items-center flex-row justify-between red">
                    {shortenAddress(pool.rewardTokenAddress)}
                    &nbsp; &nbsp;
                    {pool.rewardToken.symbol}
                    &nbsp; &nbsp;
                    <FaRegCopy
                      onClick={() => copyAddress(pool.rewardTokenAddress)} />
                  </span>
                </p>
              </div>
              <div className="flex justify-between flex-row gap-3">
                <p className="font-semibold">Deposited Amount:</p>
                <p className="deals-text text-green-700">
                  {pool.depositedAmount}
                  &nbsp;
                  {pool.depositToken.symbol}
                </p>
              </div>
              <div className="flex justify-between flex-row gap-3">
                <p className="font-semibold">APY:</p>
                <p className="deals-text text-green-700">
                  {pool.apy} %
                </p>
              </div>
              <div className="flex justify-between flex-row gap-3">
                <p className="font-semibold">Lock Days:</p>
                <p className="deals-text deals-text-sell">
                  {pool.lockDays} days
                </p>
              </div>
              <div className="deals-text deals-text-sell mt-3">
                <button
                  className="flex-1 header-profile"
                  data-bs-target="#modal-apool"
                  type="button"
                  data-bs-toggle="modal"
                  onClick={() => setModifyPoolID(index)}>
                  <i className="ti">
                    <FaEdit />
                  </i>
                  <span>Update APY</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pool;
