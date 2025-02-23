import { modifyPool } from "@/context";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import PopUpInputField from "../ui/PopUpInputField";
import InputRatio from "../ui/InputRatio";
import PopUpButton from "../ui/PopUpButton";
import { Pool } from "@/app/types/types";

interface PageProps {
  deposit: (poolID: string, amount: string, address: string | undefined) => void;
  poolID: string;
  address: string | undefined;
  selectedPool: Pool | undefined;
  selectedToken: any;
  setLoader: (loader: boolean) => void;
}

const PoolsModal = ({
  deposit,
  poolID,
  address,
  selectedPool,
  selectedToken,
  setLoader
}: PageProps) => {
  const [amount, setAmount] = useState<string>('');

  const loadData = async (poolID: string, amount: string, address: string | undefined) => {
    setLoader(true)
    const receipt: any = await deposit(poolID, amount, address);
    if (receipt) {
      console.log(receipt);
      setLoader(false)
      window.location.reload();
    }
  }

  return (
    <div className="modal modal--auto fade"
      id="modal-apool"
      tabIndex={-1}
      aria-labelledby="#modal-apool"
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
            <h4 className="modal__tile">Invest</h4>
            <p className="modal__text">
              Welcome to Crypto King, stake your {selectedToken?.depositToken.name} token to earn reward
            </p>
            <div className="modal__form">
              <PopUpInputField 
              title={`Stake ${selectedPool?.depositToken.name} token`}
                placeholder="Amount"
                handleChange={(e: any) => setAmount(e.target.value)} />
              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Pool Details:
                </label>
                <ul className="form__radio">
                  <InputRatio
                    index={1}
                    value={`Your deposited: ${selectedPool?.amount} ${selectedPool?.depositToken.symbol}`} />
                  <InputRatio
                    index={1}
                    value={`Total deposit: ${selectedPool?.depositedAmount} ${selectedPool?.depositToken.symbol}`} />
                  <InputRatio
                    index={1}
                    value={`My balance: ${selectedPool?.depositToken.balance.slice(0, 8)} ${selectedPool?.depositToken.symbol}`} />
                </ul>
              </div>
              <PopUpButton
                title={"Proceed"}
                handleClick={() => loadData(poolID, amount, address)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PoolsModal;
