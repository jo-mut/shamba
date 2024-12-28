import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { contractData, sweep, modifyPool, createPool, transferToken } from "../../../context"
import { Loader } from "../main";
import Auth from "./Auth";
import Token from "./Token";
import AdminNav from "./AdminNav";
import AdminCard from "./AdminCard";
import Investing from "./Investing";
import Staking from "./Staking";
import Transfer from "./Transfer";
import Pool from "./Pool";
import ICOToken from "./ICOToken";


interface AdminProps {
  transferToken: () => void,
  poolDetails: any,
  address: any,
  setLoader: Dispatch<SetStateAction<boolean>>,
  createPool: () => void,
  sweep: () => void,
  setModifyPoolID: Dispatch<SetStateAction<string>>
}

const Admin: React.FC<AdminProps> = (
  { transferToken,
    poolDetails,
    address,
    setLoader,
    createPool,
    sweep,
    setModifyPoolID
  }) => {

  console.log("POOL DETAILS ", poolDetails)

  return (
    <div className="section">
      <div className="container">
        <div>
          <AdminNav />
          <div className="col-12">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
                <div className="row">
                  {poolDetails?.poolInfoArray.map((pool: any, index: number) => (
                    <AdminCard
                      key={index}
                      value={`${pool.depositedAmount || "0.0"} ${pool.depositedToken.symbol}`}
                      name={`Current APY: ${pool.apy}`} />
                  ))}
                  <AdminCard
                    value={`${poolDetails?.depositedAmount || "0.0"} ${poolDetails?.depositedToken.symbol}`}
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
                <Investing
                  poolDetails={poolDetails} />
                <Staking
                  poolDetails={poolDetails}
                  sweep={sweep}
                  setLoader={setLoader} />
                <Transfer
                  poolDetails={poolDetails}
                  transferToken={transferToken}
                  setLoader={setLoader}
                  address={address} />
                <Pool
                  setModifyPoolID={setModifyPoolID}
                  setLoader={setLoader}
                  createPool={createPool}
                  poolDetails={poolDetails} />
                <ICOToken
                  setLoader={setLoader} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Admin;
