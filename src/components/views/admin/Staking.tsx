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
    <div className="tab-pane" id="tab-3" role="tabpanel">
      <div className="row">
        <div className="col-12">
          <div className="profile">
            <ul className="nav nav-tabs section__tabs section__tabs--left" id="section__profile_tabs2" role="tablist">
              <ButtonCmp name="Sweep" tab="f4" styleClass="active" />
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-f4">
                <div className="row">
                  <Title title="Withdraw staking token crypto currency" />
                  <InputField
                    size="6"
                    type="text"
                    title="Token Address"
                    name="amount2"
                    placeholder="address"
                    handleChange={(e) => setToken({ ...token, token: e.target.value })} />
                  <InputField
                    size="6"
                    type="text"
                    title="Enter Amount"
                    name="amount3"
                    placeholder={`${poolDetails?.contractTokenBalance}${poolDetails?.depositedToken.symbol}`}
                    handleChange={(e) => setToken({ ...token, amount: e.target.value })} />Ì
                    <ClickButton
                    name={'Withdraw'}
                    handleClick={() => handleSweep(token)}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
