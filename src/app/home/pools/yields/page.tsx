"use client"
import PoolContext from "@/app/providers/PoolContext";
import { Pool, PoolDetails } from "@/app/types/types";
import { copyAddress, shortenAddress } from "@/context";
import React, { useContext } from "react";
import { FaRegCopy } from "react-icons/fa";

interface PageProps {
  setSelectedPool: (pool: Pool) => void;
  setSelectedToken: (pool: Pool) => void;
  setPoolID: (poolID: string | number) => void;
}

const Pools = ({
  setSelectedPool,
  setSelectedToken,
  setPoolID
}: PageProps) => {
  const { poolDetails } = useContext(PoolContext);
  const poolArray = poolDetails?.poolInfoArray ?? [];
  return (
    <div id="staking" className="section">
      <div className="container">
        <div className="row">
          {poolArray.map((pool: any, index: number) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="node">
                <div className="node-title">
                  <h3 className="font-bold">
                    {index == 0
                      ? "Maximum"
                      : index == 1
                        ? "Standard"
                        : index == 2
                          ? "Lite"
                          : "Advance"}
                  </h3>
                  <h3 className="font-bold">#POO-{index}</h3>
                </div>
                <ul className="node-list">
                  <li className="node-text tokens">
                    <span>
                      Deposited: {pool?.amount} &nbsp;
                      {pool?.depositToken.symbol} &nbsp;
                    </span>
                    <span>
                      Reward: {pool?.userReward} &nbsp;
                      {pool?.depositToken.symbol}
                    </span>
                  </li>
                  <li className="node-text stake-token">
                    <div className="node-align">
                      <span> Stake Token:</span>
                      <span>{shortenAddress(pool.depositTokenAddress)}</span>
                      <span className="red">
                        &nbsp; &nbsp;
                        {pool.depositToken.symbol}
                        &nbsp; &nbsp;
                      </span>
                      <FaRegCopy
                        onClick={() => copyAddress(pool.depositTokenAddress)} />
                    </div>
                  </li>
                  <li className="node-text reward-token">
                    <div className="node-align">
                      <span>Reward Token: </span>
                      <span>{shortenAddress(pool.rewardTokenAddress)}</span>
                      <span className="red">
                        &nbsp; &nbsp;
                        {pool.rewardToken.symbol}
                        &nbsp; &nbsp;
                      </span>
                      <FaRegCopy
                        onClick={() => copyAddress(pool.rewardTokenAddress)} />
                    </div>
                  </li>
                  <li className="node-text deposit-amount">
                    <span>Deposited Amount:</span> &nbsp; &nbsp;
                    <span className="deals-text text-green-700">
                      {pool.depositedAmount}
                      {pool.depositToken.symbol}
                    </span>
                  </li>
                  <li className="node-text apy">
                    <span>APY:</span> &nbsp; &nbsp;
                    <span className="deals-text text-green-700">
                      {pool.apy} %
                    </span>
                  </li>
                  <li className="node-text lock-days">
                    <span>Lock Days:</span> &nbsp; &nbsp;
                    <span className="deals-text deals-text-sell">
                      {pool.lockDays} days
                    </span>
                  </li>
                  <li className="node-text total-deposited-amount">
                    <span>Total deposited amount:</span> &nbsp; &nbsp;
                    <span className="node-text text-green-700">
                      {pool?.depositedAmount || 0.0} {pool?.depositToken.symbol}%
                    </span>
                  </li>

                </ul>
                <button
                  className="node-btn"
                  data-bs-target="#modal-apool"
                  type="button"
                  data-bs-toggle="modal"
                  onClick={() => {
                    setPoolID(index == 0 ? 0 : index == 1 ? 1 : index == 2 ? 2 : "")
                    setSelectedPool(pool)
                    setSelectedToken(pool)
                  }}>
                  Invest
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Pools;
