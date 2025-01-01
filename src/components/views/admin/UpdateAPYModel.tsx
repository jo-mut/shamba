import React, { useState } from "react";
import { IoMdClose } from 'react-icons/io';
import InputField from "../ui/InputField";

const UpdateAPYModel = ({
  setLoader,
  modifyPool,
  modifyPoolId,
  poolDetails,
}: any) => {
  const [amount, setAmount] = useState("");

  const handleModifyPool = async (modifyPoolID: any, amount) => {
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
      tabIndex={-1}
      aria-labelledby="modal-apool"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal--auto">
          <div className="modal-content">
            <div className="modal__content">
              <button className="modal__close" aria-label="close" type="button" data-bs-dismiss="modal">
                <i className="ti ti-x">
                  <IoMdClose />
                </i>
              </button>
              <h4 className="modal__title">Invest</h4>
              <p className="modal__text">
                Update staking pool #00-{modifyPoolId} APY%
              </p>
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
                    handleModifyPool(modifyPoolId, amount)
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
};

export default UpdateAPYModel;
