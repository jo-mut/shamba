import React from "react";
import { FaRegCopy } from "react-icons/fa";

const Withdraw = ({
  setWithdrawPoolID,
  poolDetails
}) => {

  const poolArray = poolDetails?.poolInforArray ?? [];

  return (
    <div id="crypto" className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-lg-2 col-xl-6 offset-lg-3">
            <div className="section__title">
              <h2>Staking Pools</h2>
              <p>Lorem ipsum dolor sit amet const qui labore excepturi rem? Voluptates, sapi</p>
            </div>
          </div>
        </div>
        <div className="row">
          {poolArray?.map((pool, index) => (
            <div key={index} className={`col-12 col-md-6 col-lg-4`}>
              <div
                key={index}
                className="node">
                <h3 className={`node__tile node__title--${index == 0 ? "orange" : index == 1 ? "green"
                  : index == 2
                    ? "blue"
                    : "orange"}`}>
                  <b>{pool?.amount}</b> {pool?.rewardToken.symbol}
                </h3>

                <span className="node__date">
                  {pool?.lockDays} days
                </span>
                <span className="node__price">
                  {" "}
                  <b>Reward:</b> {pool?.userReward} {pool?.rewardToken.symbol}
                </span>

                <span className="node__line">
                  <img src="img/dodgers/dots--line-orange.svg" alt="" />
                </span>

                <ul className="node__list">
                  <li>
                    <b>{pool?.depositToken.symbol} &nbsp; &nbsp; </b>
                    {pool?.depositedToken.address.slice(0, 15)}...<FaRegCopy />
                  </li>
                  <li>
                    <b>{pool?.rewardToken.symbol} &nbsp; &nbsp; </b>
                    {pool?.rewardToken.address.slice(0, 15)}...<FaRegCopy />
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
                  className="node__btn"
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

export default Withdraw;
