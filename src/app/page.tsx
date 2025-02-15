"use client"
import Pool from "@/components/views/admin/Pool";
import { Header, HeroSection, ICOSale, Notification, 
  Pools, PoolsModel, Statistics, Token, Withdraw, WithdrawModal } from "@/components/views/main";
import { addTokenToMetamask, claimReward, contractData, deposit } from "@/context";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Page() {
  const { address } = useAccount();
  const [loader, setLoader] = useState(false);
  const [contactUS, setContactUs] = useState(false);
  const [poolID, setPoolID] = useState();
  const [withdrawPoolID, setWithdrawPoolID] = useState();
  const [withdraw, setWithdraw] = useState();
  const [poolDetails, setPoolDetails] = useState();
  const [selectedPool, setSelectedPool] = useState();
  const [selectedToken, setSelectedToken] = useState();

  const loadData = async () => {
    setLoader(true);
    const data = await contractData(address);
    setPoolDetails(data);
    setLoader(false);
  }


  useEffect(() => {
    loadData()
  }, [])

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
      <Token
        poolDetails={poolDetails} />
      <Withdraw
        setWithdrawPoolID={setWithdrawPoolID}
        poolDetails={poolDetails} />
      <Notification poolDetails={poolDetails} />
       <PoolsModel
        deposit={deposit}
        poolID={poolID}
        address={address}
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
  );
}
