"use client"
import { buyToken, modifyPool } from "@/context";
import { loadTokenICO } from "@/context/constants";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { IoMdClose } from 'react-icons/io';
import InputField from "../ui/InputField";
import PoolContext from "@/app/providers/PoolContext";


const UpdateAPYModal = () => {
  const { setLoader, poolDetails, modifyPoolID } = useContext(PoolContext);
  const [amount, setAmount] = useState("");

  const handleModifyPool = async (modifyPoolID: any, amount: any) => {
    console.log
    setLoader(true);
    const receipt = await modifyPool(modifyPoolID, amount);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }


  return (
    <div
      className="modal modal__auto fade"
      id="modal-apool"
      aria-labelledby="modal-apool"
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
              <h4 className="modal__title">
                Update staking pool #00-{modifyPoolID} APY%
              </h4>
              <div className="modal__form">
                <label htmlFor="amount2" className="form__label">
                  Enter Amount
                </label>
                <input
                  id="amount2"
                  name="amount2"
                  className="apool__input"
                  style={{
                    backgroundColor: "transparent",
                  }}
                  placeholder="amount in %"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)} />
                <button
                  type="button"
                  className="form__btn"
                  onClick={() => {
                    handleModifyPool(poolDetails, amount)
                  }}>
                  Update APY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateAPYModal;
