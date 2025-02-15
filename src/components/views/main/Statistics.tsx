import React from "react";

const Statistics = ({
  poolDetails
}) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {poolDetails?.poolInfoArray.map((pool, index) => (
            <div className="col-12 col-sm-6 col-xl-3"
              key={index}>
              <div className="stats">
                <span className="stats__value">
                  {pool?.depositedAmount} &nbsp: {pool?.depositedToken?.symbol}
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
                {poolDetails?.totalDepositedAmount} &nbsp: {poolDetails?.depositedToken?.symbol}
              </span>
              <p className="stats_name">
                Total Stake
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Statistics;
