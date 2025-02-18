"use client"
import Auth from "@/components/views/admin/Auth";
import Pool from "@/components/views/admin/Pool";
import {
  Header, HeroSection, ICOSale, Loader, Notification,
  Pools, PoolsModel, Statistics, Token, Withdraw, WithdrawModal
} from "@/components/views/main";
import Sidebar from "@/components/views/ui/Sidebar";
import { addTokenToMetamask, claimReward, contractData, createPool, deposit, sweep, transferToken } from "@/context";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import PoolContext from "./providers/PoolContext";

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS!

export default function Page() {
  const { poolDetails, address, loader, setLoader, setModifyPoolID } = useContext(PoolContext);
  const [checkAdmin, setCheckAdmin] = useState(false);


  const checkAccount = async () => {
    if (address) {
      if (address?.toLowerCase() == ADMIN_ADDRESS?.toLowerCase()) {
        setCheckAdmin(false);
      }
    }
  }

  useEffect(() => {
    checkAccount()
  }, [address])

  return (
    <>
      <Sidebar
        checkAdmin={checkAdmin}
        setModifyPoolID={setModifyPoolID}
        sweep={sweep}
        createPool={createPool}
        address={address}
        setLoader={setLoader}
        poolDetails={poolDetails}
        transferToken={transferToken} />
      {/* {!checkAdmin && <Auth />} */}
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
  );
}
