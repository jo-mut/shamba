"use client"

import React, { useState } from "react";
import ButtonCmp from "../ui/ButtonCmp";
import Title from "../ui/Title";
import InputField from "../ui/InputField";
import ClickButton from "../ui/ClickButton";

interface StakingProps {
  sweep: any,
  setLoader: any,
  poolDetails: any,
}

const Staking: React.FC<StakingProps> = ({
  sweep,
  setLoader,
  poolDetails
}) => {
  const [token, setToken] = useState({
    token: "",
    amount: ""
  })

  const handleSweep = async (token: any) => {
    setLoader(true);
    const receipt = await sweep(token);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }

  return (
    <div className="w-1/2 bg-gray-100 p-5 h-auto mx-auto rounded-3xl">
      <Title title="Withdraw staking token" />
      <InputField
        size="12"
        type="text"
        title="Token Address"
        name="amount2"
        placeholder="address"
        handleChange={(e) => setToken({ ...token, token: e.target.value })} />
      <InputField
        size="12"
        type="text"
        title="Enter Amount"
        name="amount3"
        placeholder={`${poolDetails?.contractTokenBalance}${poolDetails?.depositedToken.symbol}`}
        handleChange={(e) => setToken({ ...token, amount: e.target.value })} />
      <ClickButton
        name={'Withdraw'}
        handleClick={() => handleSweep(token)}
      />
    </div>
  );
};

export default Staking;
