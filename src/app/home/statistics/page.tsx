"use client"
import { Pool, PoolDetails } from "@/app/types/types";
import React from "react";

interface PageProps {
  poolDetails: PoolDetails
}

const Statistics = ({
  poolDetails
}: PageProps) => {

  console.log("statistics ", poolDetails)

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {poolDetails?.poolInfoArray.map((pool: Pool, index: number) => (
            <div className="col-12 col-sm-6 col-xl-3"
              key={index}>
              <div className="stats">
                <span className="stats__value">
                  {pool?.depositedAmount} &nbsp; {pool?.depositToken?.symbol}
                </span>
                <p className="stats_name">
                  Current APY: {pool?.apy} %
                </p>
              </div>
            </div>
          )).slice(0, 3)}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stats">
              <span className="stats__value">
                {poolDetails?.totalDepositedAmount} &nbsp; {poolDetails?.depositToken?.symbol}
              </span>
              <p className="stats_name">
                Total Stake
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
              <div className="section__title">
                <h2>Token</h2>
                <p>More features with own token</p>
              </div>
            </div>
          </div>
          <div className="row row--relative">
            <div className="col-12">
              <div className="invest invest--big">
                <h2 className="invest__title">
                  Token
                </h2>
              </div>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="invest__rate-wrap">
                    <div className="invest__rate">
                      <span>
                        Stake Supply
                      </span>
                      <p>{poolDetails?.depositToken.totalSupply}</p>
                    </div>
                    <div className="invest__green">
                      <img src="img/graph/graph2.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="invest__rate-wrap">
                    <div className="invest__rate">
                      <span>Total Stake</span>
                      <p className="green">
                        {poolDetails?.depositToken?.contractTokenBalance?.slice(0, 10)} {poolDetails?.depositToken.symbol}
                      </p>
                    </div>
                    <div className="invest__graph">
                      <img src="img/graph/graph1.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="invest__rate-wrap">
                    <div
                      className="invest__rate">
                      <span>Reward Token</span>
                      <p className="green">
                        {poolDetails?.rewardToken?.totalSupply.slice(0, 10)} {poolDetails?.rewardToken.symbol}
                      </p>
                    </div>
                    <div className="invest__graph">
                      <img src="img/graph/graph3.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="invest__rate-wrap">
                    <div
                      className="invest__rate">
                      <span>Total Stake</span>
                      <p className="green">
                        I STN = 0.00001 ETH
                      </p>
                    </div>
                    <div className="invest__graph">
                      <img src="img/graph/graph4.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="invest__info">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur veniam labore dignissimos rem est temporibus voluptas? Ad dolor possimus, atque blanditiis rerum consectetur perferendis deleniti
              </p>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
};

export default Statistics;
