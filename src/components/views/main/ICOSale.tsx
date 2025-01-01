import { buyToken } from "@/context";
import { loadTokenICO } from "@/context/constants";
import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { IoMdClose } from 'react-icons/io';
import InputField from "../ui/InputField";

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

const ICOSale = ({
  setLoader
}:
  any) => {
  const { address } = useAccount();
  const [tokenDetails, setTokenDetails] = useState<any>();
  const [quantity, setQuantity] = useState<number>(0);
  const modalRef = useRef(null);

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

    if (modalRef.current) {
      (modalRef.current as HTMLElement).focus();
    }

  }, [address])


  return (
    <div
      className="modal modal__auto fade"
      id="modal-deposit1"
      aria-labelledby="modal-deposit1"
      tabIndex={-1}
      data-backdrop="static" 
      data-keyboard="false"
      ref={modalRef}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
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
          <h4 className="modal__title">
            {tokenDetails?.token.symbol} ICO Token
          </h4>
          <p className="modal__text">
            Participate in the <span>Ongoing ICO Token</span> sale
          </p>
          <div className="modal__form">
            <div className="form__group">
              <label
                className="form__label"
                htmlFor="">
                ICO Supply: {""} {`${tokenDetails?.tokenBalance}${tokenDetails?.token.symbol}`}
              </label>
              <input
                type="text"
                className="form__input"
                placeholder={`${tokenDetails?.token.symbol}: ${tokenDetails?.token.balance.toString().slice(0, 12)}`}
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
                  placeholder={`${Number(tokenDetails?.tokenPrice) * quantity} ${CURRENCY}`}
                  disabled={false}
                  onChange={(e) => setQuantity(Number(e.target.value))} />
              </div>
            </div>
            <button
              className="form__btn"
              type="button"
              onClick={() => handleBuyToken(quantity)}>
              Buy {tokenDetails?.token.symbol}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ICOSale;
