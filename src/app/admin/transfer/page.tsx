"use client"
import ClickButton from "@/components/views/ui/ClickButton";
import InputField from "@/components/views/ui/InputField";
import Title from "@/components/views/ui/Title";
import React, { useState } from "react";

const Transfer = ({
  transferToken,
  address,
  setLoader,
  poolDetails
}: any) => {

  const [amount, setAmount] = useState();
  const [transferAddress, setTransferAddress] = useState();

  const handleTransfer = async (amount: any, transferAddress: any) => {
    setLoader(true);
    const receipt = await transferToken(amount, transferAddress);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }

  console.log("pool details, ", typeof(poolDetails?.contractTokenBalance))

  return (
    <div className="w-1/2 h-auto mx-auto shadow-md bg-gray-100 p-5 rounded-3xl">
      <Title title="Transfer" />
      <InputField
        size="12"
        type="text"
        title="Available Supply"
        name="method1"
        value={`${ poolDetails?.contractTokenBalance? poolDetails?.contractTokenBalance.toString().slice(0, 8) : "0.0"} 
            ${poolDetails?.depositedToken.symbol}`}
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
        name={`Transfer ${poolDetails?.depositedToken.symbol}`}
        handleClick={() => handleTransfer(amount, transferAddress)} />
    </div>
  )
};

export default Transfer;
