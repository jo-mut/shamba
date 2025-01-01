"use client"
import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components/views/main";
import { useAccount } from "wagmi";
import { add } from "lodash";
import { contractData } from "@/context";

const Home = () => {
  const { address } = useAccount();
  const [loader, setLoader] = useState<boolean>(false);
  const [contactUS, setContactUs] = useState(false);
  const [poolID, setPoolID] = useState();
  const [withdrawPoolID, setWithdrawPoolID] = useState<string>('');
  const [poolDetails, setPoolDetails] = useState();
  const [selectedPool, setSelectedPool] = useState();
  const [selectedToken, setSelectedToken] = useState();


  const loadData = async () => {
    if (address) {
      setLoader(true);
      const data = await contractData(address);
      setPoolDetails(data);
      setLoader(false);
    }
  }

  useEffect(() => {
    loadData
  }, [address])

  return (
    <div>
      "Home works fine"
    </div>
  )
};

export default Home;
