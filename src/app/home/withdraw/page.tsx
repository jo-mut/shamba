"use client"
import PoolContext from "@/app/providers/PoolContext";
import { Pool, PoolDetails } from "@/app/types/types";
import React, { useContext } from "react";
import { FaRegCopy } from "react-icons/fa";

const Page = () => {
  const { poolDetails, setWithdrawPoolID } = useContext(PoolContext);
  const poolArray = poolDetails?.poolInfoArray ?? [];

  return (
    <div id="crypto" className="section">
      <div className="container">
        <div className="row">
          {poolArray?.map((pool: Pool, index: number) => (
            <div key={index} className={`col-12 col-md-6 col-lg-4`}>
              <div
                key={index}
                className="node">
                <h3 className={`node-title font-bold node-title-${index == 0 ? "orange" : index == 1 ? "green"
                  : index == 2
                    ? "blue"
                    : "orange"}`}>
                  <b>{pool?.amount}</b> {pool?.rewardToken.symbol}
                </h3>

                <span className="node-date font-semibold">
                  {pool?.lockDays} days
                </span>
                <span className="node-price font-semibold">
                  {" "}
                  Reward: {pool?.userReward} {pool?.rewardToken.symbol}
                </span>

                <ul className="node-list mt-3">
                  <li>
                    <div className="flex flex-row align-items-center">
                      <b>{pool?.depositToken.symbol} &nbsp; &nbsp; </b>
                      {pool?.rewardToken.address.slice(0, 15)} &nbsp; <FaRegCopy />
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-row align-items-center">
                      <b>{pool?.rewardToken.symbol} &nbsp; &nbsp; </b>
                      {pool?.rewardToken.address.slice(0, 15)} &nbsp; <FaRegCopy />
                    </div>
                  </li>
                  <li>
                    <b>Current APY &nbsp; &nbsp; </b>
                    {pool?.apy} %
                  </li>
                  <li>
                    <b>Last Reward &nbsp; &nbsp; </b>
                    {pool?.lastRewardAt}
                    {pool?.rewardToken.symbol}
                  </li>
                </ul>

                <button
                  className="node-btn"
                  data-bs-target="#modal-node"
                  type="button"
                  data-bs-toggle="modal"
                  onClick={() => {
                    setWithdrawPoolID(index == 0 ? 0 : index == 1 ? 1 : index == 2 ? 2 : "")
                  }}>
                  Withdraw / Claim
                </button>
              </div>
            </div>
          )).slice(0, 3)}
        </div>
      </div>
    </div>
  )
};

export default Page;
