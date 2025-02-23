"use client"

import { loadTokenICO } from "@/context/constants";
import React, { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { updateTokenPrice, withdraw, updateToken } from "@/context";
import ButtonCmp from "@/components/views/ui/ButtonCmp";
import Title from "@/components/views/ui/Title";
import InputField from "@/components/views/ui/InputField";
import ClickButton from "@/components/views/ui/ClickButton";
import PoolContext from "@/app/providers/PoolContext";


const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY!

interface ICOTokenProps {
  setLoader: any
}

const ICOToken: React.FC<ICOTokenProps> = () => {
  const { setLoader } = useContext(PoolContext);
  const { address } = useAccount();
  const [tokenDetails, setTokenDetails] = useState<any>();
  const [tokenUpdate, setTokenUpdate] = useState();
  const [priceUpdate, setPriceUpdate] = useState();


  const handleUpdateToken = async (token: any) => {
    setLoader(true);
    const receipt = await updateToken(token);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }

  const handleUpdatePrice = async (price: any) => {
    setLoader(true);
    const receipt = await updateTokenPrice(price);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }

  const handleWithdrawToken = async (token: any) => {
    setLoader(true);
    const receipt = await withdraw(token);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }



  useEffect(() => {
    try {
      const loadToken = async () => {
        const token = await loadTokenICO();
        setTokenDetails(token);
      }
      loadToken();
    } catch (e) {
      console.log("failed to fetch token details", e)
    }
  }, [address])

  return (
    <div className="h-auto mx-auto rounded-3xl">
      <div className="row">
        <div className="col-12 col-md-4  col-sm-12">
          <div className="profile update-token shadow-sm">
            <Title
              title={"Update address"} />
            <InputField
              size={"12"}
              title={"Address"}
              type="text"
              name={"crypto"}
              placeholder={`${tokenDetails?.token?.symbol} ${tokenDetails?.token?.name}`}
              handleChange={(e: any) => setTokenUpdate(e.target.value)} />
            <ClickButton
              handleClick={() => handleUpdateToken(tokenUpdate)}
              name={"Update Token Address"} />
          </div>
        </div>

        <div className="col-12 col-md-4 col-sm-12">
          <div className="profile update-token-price shadow-sm">
            <Title
              title={"Update token price"} />
            <InputField
              size={"12"}
              title={"Address"}
              type="text"
              name={"crypto"}
              placeholder={`${tokenDetails?.token?.symbol} ${tokenDetails?.token?.name}`}
              handleChange={(e: any) => setTokenUpdate(e.target.value)} />
            <ClickButton
              handleClick={() => handleUpdatePrice(tokenUpdate)}
              name={"Update Token Price"} />
          </div>
        </div>
        <div className="col-12 col-md-4 col-sm-12">
          <div className="profile withdraw-all-tokens shadow-sm">
            <Title
              title={"Withdraw all tokens"} />
            <InputField
              size={"12"}
              title={"Address"}
              type="text"
              name={"crypto"}
              placeholder={`${tokenDetails?.token?.symbol} ${tokenDetails?.token?.name}`}
              handleChange={(e: any) => setTokenUpdate(e.target.value)} />
            <ClickButton
              handleClick={() => handleWithdrawToken(tokenUpdate)}
              name={"Withdraw All Token"} />
          </div>
        </div>

      </div>
    </div>
  )
};

export default ICOToken;
