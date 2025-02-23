"use client"
import Auth from "@/components/views/admin/Auth";
import Sidebar from "@/components/views/ui/Sidebar";
import { addTokenToMetamask, claimReward, contractData, createPool, deposit, sweep, transferToken, withdraw } from "@/context";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import PoolContext from "./providers/PoolContext";
import PoolsModal from "@/components/views/main/PoolsModal";
import WithdrawModal from "@/components/views/main/WithdrawModal";
import { ICOSale } from "@/components/views/main";
import { DepositToken, Pool } from "./types/types";

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS!

export default function Page() {
  const { poolDetails, address, loader, setLoader, setModifyPoolID } = useContext(PoolContext);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [selectedPool, setSelectedPool] = useState<Pool>();
  const [selectedToken, setSelectedToken] = useState<DepositToken>();

  const checkAccount = async () => {
    if (address) {
      if (address?.toLowerCase() == ADMIN_ADDRESS?.toLowerCase()) {
        setCheckAdmin(true);
      }
    }
  }

  useEffect(() => {
    checkAccount()
  }, [address])

  return (
    <>
      {checkAdmin && <Auth />}
      {/* <PoolsModal
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
        claimReward={claimReward} /> */}
      <ICOSale loader={loader} />
    </>
  );
}
