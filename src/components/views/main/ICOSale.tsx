"use client"
import { buyToken } from "@/context";
import { loadTokenICO } from "@/context/constants";
import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { IoMdClose } from 'react-icons/io';

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

const ICOSale = ({
  setLoader
}:
  any) => {
  const { address } = useAccount();
  const [tokenDetails, setTokenDetails] = useState<any>();
  const [quantity, setQuantity] = useState<number>(0);

  const handleBuyToken = async (quantity: any) => {
    setLoader(true);
    const receipt = await buyToken(quantity);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }


  useEffect(() => {
    const loadToken = async () => {
      const token = await loadTokenICO();
      setTokenDetails(token);
      console.log(token);
    }
    loadToken();

  }, [address])


  return (
    <div
      className="modal modal__auto fade"
      id="modal-deposit1"
      aria-labelledby="modal-deposit1"
      tabIndex={-1}
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
       <div className="modal--auto">
       <div className="modal-content">
          <div className="modal__content">
            <button
              className="modal__close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close">
              <i className="ti ti-x">
                <IoMdClose />
              </i>
            </button>
            <div className="modal__form">
              <div className="form__group">
                <label
                  className="form__label"
                  htmlFor="">
                  ICO Supply: {""} {`${tokenDetails?.tokenBalance || 1000} ${tokenDetails?.token?.symbol || "STN"}`}
                </label>
                <input
                  type="text"
                  className="form__input"
                  placeholder={`${tokenDetails?.token?.symbol || "STN"}: ${tokenDetails?.token.balance?.toString().slice(0, 12) || 0.0}`}
                  onChange={(e) => setQuantity(Number(e.target.value))} />
              </div>
              <div className="modal__form">
                <div className="form__group">
                  <label
                    className="form__label"
                    htmlFor="">
                    Pay Amount
                  </label>
                  <input
                    type="text"
                    className="form__input"
                    placeholder={`${Number(tokenDetails?.tokenPrice) * quantity || 0.0} ${CURRENCY}`}
                    disabled={false}
                    onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>
              </div>
              <button
                className="form__btn"
                type="button"
                onClick={() => handleBuyToken(quantity)}>
                Buy {tokenDetails?.token.symbol || "STN"}
              </button>
            </div>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default ICOSale;
