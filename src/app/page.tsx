"use client"
import Auth from "@/components/views/admin/Auth";
import Pool from "@/components/views/admin/Pool";
import {
  Header, HeroSection, ICOSale, Loader, Notification,
  Pools, PoolsModel, Statistics, Token, Withdraw, WithdrawModal
} from "@/components/views/main";
import { addTokenToMetamask, claimReward, contractData, deposit } from "@/context";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS!

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
  const [checkAdmin, setCheckAdmin] = useState(false);


  const loadData = async () => {
    if (address) {
      setLoader(true)
      if (address?.toLowerCase() == ADMIN_ADDRESS?.toLowerCase()) {
        setCheckAdmin(true);
        const data = await contractData(address);
        setPoolDetails(data);
      }

      setLoader(false);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      {!checkAdmin && <Auth />}
      {loader && <Loader />}
    </>
  );
}
