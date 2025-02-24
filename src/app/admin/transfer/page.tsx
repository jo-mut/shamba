"use client"
import PoolContext from "@/app/providers/PoolContext";
import ClickButton from "@/components/views/ui/ClickButton";
import InputField from "@/components/views/ui/InputField";
import Title from "@/components/views/ui/Title";
import React, { useContext, useState } from "react";

const Transfer = () => {
  const { poolDetails, transferToken, address,  setLoader } = useContext(PoolContext);
  const [amount, setAmount] = useState();
  const [transferAddress, setTransferAddress] = useState();

  const handleTransfer = async (amount: any, transferAddress: any) => {
    setLoader(true);
    const receipt: any = await transferToken(amount, transferAddress);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }

  console.log("pool details, ", typeof(poolDetails?.contractTokenBalance))

  return (
    <div className="w-1/2 h-auto mx-auto shadow-md bg-gray-100 p-5 mt-20 rounded-3xl">
      <Title title="Transfer" />
      <InputField
        size="12"
        type="text"
        title="Available Supply"
        name="method1"
        value={`${ poolDetails?.contractTokenBalance? poolDetails?.contractTokenBalance.toString().slice(0, 8) : "0.0"} 
            ${poolDetails?.depositToken.symbol}`}
        disabled={true} />
      <InputField
        size="12"
        type="text"
        title="Quantity"
        name="amount4"
        placeholder="amount"
        handleChange={(e) => setAmount(e.target.value)} />
      <InputField
        size="12"
        type="text"
        title="Contract / Wallet Address"
        name="amount4"
        placeholder="address"
        handleChange={(e) => setTransferAddress(e.target.value)} />
      <ClickButton
        name={`Transfer ${poolDetails?.depositToken?.symbol}`}
        handleClick={() => handleTransfer(amount, transferAddress)} />
    </div>
  )
};

export default Transfer;
