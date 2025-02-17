"use client"
import React, { useContext, useEffect, useState } from "react";
import { Footer, Header, HeroSection, ICOSale, Notification, Pools, PoolsModel, Statistics, Token, Withdraw, WithdrawModal } from "../../components/views/main";
import { useAccount } from "wagmi";
import { add } from "lodash";
import { addTokenToMetamask, claimReward, contractData, deposit } from "@/context";
import Pool from "@/components/views/admin/Pool";
import PoolContext from "../providers/PoolContext";

const Home = () => {
  const { poolDetails } = useContext(PoolContext);
  const { address } = useAccount();
  const [loader, setLoader] = useState(false);
  const [contactUS, setContactUs] = useState(false);
  const [poolID, setPoolID] = useState();
  const [withdrawPoolID, setWithdrawPoolID] = useState();
  const [withdraw, setWithdraw] = useState();
  const [selectedPool, setSelectedPool] = useState();
  const [selectedToken, setSelectedToken] = useState();

  console.log("pools details from context ", poolDetails)

  return (
    <>
      <HeroSection
        poolDetails={poolDetails}
        addTokenToMetamask={addTokenToMetamask} />
      <Statistics
        poolDetails={poolDetails} />
      <Pools
        poolDetails={poolDetails}
        setSelectedPool={setSelectedPool}
        setSelectedToken={setSelectedToken}
        setPoolID={setPoolID} />
      {/* <Token
        poolDetails={poolDetails} /> */}
      <Withdraw
        setWithdrawPoolID={setWithdrawPoolID}
        poolDetails={poolDetails} />
      <Notification
        poolDetails={poolDetails}
        page={'activity'} />
      <PoolsModel
        deposit={deposit}
        poolID={poolID}
        address={address}
        selectedPool={selectedPool}
        selectedToken={selectedToken}
        setLoader={setLoader} />
      <WithdrawModal
        withdraw={withdraw}
        withdrawPoolID={withdrawPoolID}
        address={address}
        setLoader={setLoader}
        claimReward={claimReward} />
      <ICOSale loader={loader} />
    </>
  )
};

export default Home;
