"use client"

import { loadTokenICO } from "@/context/constants";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Token } from "../main";
import { updateTokenPrice, withdraw, updateToken } from "@/context";
import ButtonCmp from "../ui/ButtonCmp";
import Title from "../ui/Title";
import InputField from "../ui/InputField";
import ClickButton from "../ui/ClickButton";


const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY!

interface ICOTokenProps {
  setLoader: any
}

const ICOToken: React.FC<ICOTokenProps> = ({
  setLoader
}) => {
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
    <div className="tab-pane fade show" id="tab-6">
      <div className="tabpanel">
        <div className="w-1/2 h-auto mx-auto shadow-md rounded-3xl">
          <div className="profile">
            <ul
              className="nav nav-tabs section__tabs section__tabs--left"
              id="section__profile-tabs2"
              role="tablist">
              <ButtonCmp name={"Update Token"} tab={"f9"} styleClass="active" />
              <ButtonCmp name={"Update Token Price"} tab={"f10"} />
              <ButtonCmp name={"Withdraw Token Price"} tab={"f11"} />
            </ul>
            <div className="tab-content">
              <div className="tab-pane show active" id="tab-f9" role="tabpanel">
                <div className="row">
                  <Title
                    title={"Update token address in ICO contract"} />
                  <InputField
                    size={"12"}
                    title={"Address"}
                    type="text"
                    name={"crypto"}
                    placeholder={`${tokenDetails?.token?.symbol} ${tokenDetails?.token?.name}`}
                    handleChange={(e: any) => setTokenUpdate(e.target.value)} />
                  <ClickButton
                    handleClick={() => handleUpdateToken(tokenUpdate)}
                    name={"Update Token"} />
                </div>
              </div>
              <div className="tab-pane show" id="tab-f10" role="tabpanel">
                <div className="row">
                  <Title
                    title={"Update token price in ICO contract"} />
                  <InputField
                    size={"12"}
                    title={"Address"}
                    type="text"
                    name={"crypto"}
                    placeholder={`${tokenDetails?.token?.tokenPrice} ${tokenDetails?.token?.name}`}
                    handleChange={(e: any) => setTokenUpdate(e.target.value)} />
                  <ClickButton
                    handleClick={() => handleUpdatePrice(tokenUpdate)}
                    name={"Update Token Price"} />
                </div>
              </div>
              <div className="tab-pane show" id="tab-f11" role="tabpanel">
                <div className="row">
                  <Title
                    title={"Withdraw token from ICO contract"} />
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
        </div>
      </div>
    </div>
  )
};

export default ICOToken;
