import { deposit } from "@/context";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import PopUpInputField from "../ui/PopUpInputField";
import PopUpButton from "../ui/PopUpButton";
import { EventEmitter } from "stream";

interface PageProps {
  withdraw: (withdrawPoolID: string, amount: string, address: string | undefined) => void;
  withdrawPoolID: string,
  address: string | undefined
  setLoader: (loader: boolean) => void,
  claimReward: (withdrawPoolID: string) => void,
}

const WithdrawModal = ({
  withdraw,
  withdrawPoolID,
  address,
  setLoader,
  claimReward,
}: PageProps) => {
  const [amount, setAmount] = useState<string>('');

  const loadData = async (withdrawPoolID: string, amount: string, address: string | undefined) => {
    setLoader(true)
    const receipt: any = await withdraw(withdrawPoolID, amount, address);
    if (receipt) {
      console.log(receipt);
      setLoader(false)
      window.location.reload();
    }
  }

  const claim = async (withdrawPoolID: string) => {
    setLoader(true)
    const receipt: any = await claimReward(withdrawPoolID);
    if (receipt) {
      setLoader(false)
      window.location.reload();
    }
  }

  return (
    <div className="modal modal--auto fade"
      id="modal-node"
      tabIndex={-1}
      aria-labelledby="modal-node"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
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
            <h4 className="modal__tile">Withdraw Token</h4>
            <p
              className="modal__text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cum!
            </p>
          </div>
          <div className="modal__form">
            <PopUpInputField
              title={`Amount`}
              placeholder="Amount"
              handleChange={(e: any) => setAmount(e.target.value)} />
            <PopUpButton
              title="Withdraw"
              handleClick={() => loadData(withdrawPoolID, amount, address)} />
            <PopUpButton
              title="Claim reward"
              handleClick={() => claim(withdrawPoolID)} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default WithdrawModal;
