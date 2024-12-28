import React, { useState } from "react";
import InputField from "../ui/InputField";
import Title from "../ui/Title";
import ClickButton from "../ui/ClickButton";

const Transfer = ({
  transferToken,
  address,
  setLoader,
  poolDetails
}) => {

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

  return (
    <div className="tab-pane fade show" id="tab-4" role="tabpanel">
      <div className="row">
        <div className="col-12 col-lg-12 col-md-9">
          <div className="profile">
            <div className="row">
              <Title title="Transfer" />
              <InputField
                size="6"
                type="text"
                title="Available Supply"
                name="method1"
                value={`${poolDetails?.contractTokenBalance.toString().slice(0, 8) || "0.0"} 
                ${poolDetails?.depositedToken.symbol}`}
                disabled={true} />
              <InputField
                size="6"
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
          </div>
        </div>
      </div>
    </div>)
};

export default Transfer;
