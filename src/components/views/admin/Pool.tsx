"use client"

import React, { useState } from "react";
import { copyAddress, shortenAddress } from "@/context";
import { FaRegCopy, FaEdit } from 'react-icons/fa';
import ButtonCmp from "../ui/ButtonCmp";
import InputField from "../ui/InputField";
import Title from "../ui/Title";
import ClickButton from "../ui/ClickButton";


interface PoolProps {
  setModifyPoolID: any
  createPool: any
  setLoader: any
  poolDetails: any
}

const Pool: React.FC<PoolProps> = ({
  setModifyPoolID,
  createPool,
  setLoader,
  poolDetails
}) => {

  const [pool, setPool] = useState({
    _depositedToken: "",
    _rewardToken: "",
    _apy: "",
    _lockDays: ""
  })

  const poolArray = poolDetails?.poolInfoArray ?? [];
  console.log("created pool", poolArray);

  const handleCreatePool = async (pool: any) => {
    if (pool._depositedToken === '' || pool._rewardToken === ''
      || pool._apy === '' || pool._lockDays === '') return;

    setLoader(true);
      const receipt = await createPool(pool);
      if (receipt) {
        setLoader(false);
        window.location.reload();
      }
      setLoader(false);
  }

  return (
    <div className="row">
      <div className="col-4">
        <div className="shadow-md bg-gray-100 p-5 rounded-3xl">
          <Title
            title={"Provide pool details to create, new pool"} />
          <InputField
            size={"12"}
            title={"Stake Token Address"}
            type="text"
            name={"depositToken1"}
            placeholder="address"
            handleChange={(e: any) => setPool({ ...pool, _depositedToken: e.target.value })} />
          <InputField
            size={"12"}
            title={"Reward Token Address"}
            type="text"
            name={"rewardToken1"}
            placeholder="address"
            handleChange={(e: any) => setPool({ ...pool, _rewardToken: e.target.value })} />
          <InputField
            size={"12"}
            title={"APY %"}
            type="text"
            name="APY1"
            placeholder="APY"
            handleChange={(e: any) => setPool({ ...pool, _apy: e.target.value })} />
          <InputField
            size={"12"}
            title={"Lock days"}
            type="text"
            name="days1"
            placeholder="days"
            handleChange={(e: any) => setPool({ ...pool, _lockDays: e.target.value })} />
          <ClickButton
            handleClick={() => handleCreatePool(pool)}
            name={"Create Pool"} />
        </div>
      </div>
      <div className="col-8">
        <div className="row gap-3 ">
          {poolArray.map((pool: any, index: number) => (
            <div key={index} className="flex-1 col-3 pool-item bg-gray-200 rounded-2xl p-3">
              <h5 className="font-bold mb-3" >#POO-{index}</h5>
              <div className="flex flex-row gap-3">
                <p className="font-bold"> Stake Token:</p>
                <p className="deals__exchange">
                  <span className="flex align-items-center flex-row justify-between red">
                    {shortenAddress(pool.depositTokenAddress)}
                    &nbsp; &nbsp;
                    {pool.depositedToken.symbol}
                    &nbsp; &nbsp;
                    <FaRegCopy
                      onClick={() => copyAddress(pool.depositTokenAddress)} />
                  </span>
                </p>
              </div>
              <div className="flex flex-row  gap-3">
                <p className="font-semibold">Reward Token: </p>
                <p className="deals__exchange">
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
                <p className="deals__text text-green-700">

                  {pool.depositedAmount}
                  &nbsp;
                  {pool.depositedToken.symbol}
                </p>
              </div>
              <div className="flex justify-between flex-row gap-3">
                <p className="font-semibold">APY:</p>
                <p className="deals__text text-green-700">
                  {pool.apy} %
                </p>
              </div>
              <div className="flex justify-between flex-row gap-3">
                <p className="font-semibold">Lock Days:</p>
                <p className="deals__text deals__text--sell">
                  {pool.lockDays} days
                </p>
              </div>
              <div className="deals__text deals__text--sell mt-3">
                <button
                  className="flex-1 header__profile"
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
