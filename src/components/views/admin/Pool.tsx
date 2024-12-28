import React, { useState } from "react";
import { copyAddress, shortenAddress } from "@/context";
import { FaRegCopy, FaEdit } from 'react-icons/fa';
import ButtonCmp from "../ui/ButtonCmp";
import InputField from "../ui/InputField";
import Title from "../ui/Title";
import ClickButton from "../ui/ClickButton";


interface PoolProps {
  setModifyPoolID: any
  createPool: any
  setLoader: any
  poolDetails: any
}

const Pool: React.FC<PoolProps> = ({
  setModifyPoolID,
  createPool,
  setLoader,
  poolDetails
}) => {

  const [pool, setPool] = useState({
    _depositedToken: "",
    _rewardToken: "",
    _apy: "",
    _lockDays: ""
  })

  const poolArray = poolDetails?.poolInfoArray ?? [];
  console.log("created pool", poolArray);

  const handleCreatePool = async (pool: any) => {
    setLoader(true);
    const receipt = await createPool(pool);
    if (receipt) {
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }

  return (
    <div className="tab-pane" id="tab=5" role="tabpanel">
      <div className="row">
        <div className="col-12">
          <div className="profile">
            <ul
              className="nav nav-tabs section__tabs section__tabs--left"
              id="section__profile-tabs3"
              role="tablist">
              <ButtonCmp name={"Add Pool"} tab={"f6"} styleClass="active"></ButtonCmp>
              <ButtonCmp name={"Pool List"} tab={"f7"}></ButtonCmp>
            </ul>
            <div className="tab-content">
              <div className="tab-pane show active" id="tab-f6" role="tabpanel">
                <div className="row">
                  <Title
                    title={"Provide pool details to create, new pool"} />
                  <InputField
                    size={"12"}
                    title={"Stake Token Address"}
                    type="text"
                    name={"depositToken1"}
                    placeholder="address"
                    handleChange={(e: any) => setPool({ ...pool, _depositedToken: e.target.value })} />
                  <InputField
                    size={"12"}
                    title={"Reward Token Address"}
                    type="text"
                    name={"rewardToken1"}
                    placeholder="address"
                    handleChange={(e: any) => setPool({ ...pool, _rewardToken: e.target.value })} />
                  <InputField
                    size={"6"}
                    title={"APY %"}
                    type="text"
                    name="APY1"
                    placeholder="APY"
                    handleChange={(e: any) => setPool({ ...pool, _apy: e.target.value })} />
                  <InputField
                    size={"6"}
                    title={"Lock days"}
                    type="text"
                    name="days1"
                    placeholder="days"
                    handleChange={(e: any) => setPool({ ...pool, _lockDays: e.target.value })} />
                  <ClickButton
                    handleClick={() => handleCreatePool(pool)}
                    name={"Create Pool"} />
                </div>
              </div>
              <div className="tab-pane show" id="tab-f7" role="tabpanel">
                <div className="row">
                  <Title title={"All Pool"} />
                  <div className="col-12">
                    <div
                      className="scrollable-div"
                      style={{ overflowX: "scroll" }}>
                      <table className="deals__table">
                        <thead>
                          <tr>
                            <th>Stake Token</th>
                            <th>Reward Token</th>
                            <th>Deposit</th>
                            <th>Pool ID</th>
                            <th>APY</th>
                            <th>Lock Days</th>
                          </tr>
                        </thead>
                        <tbody>
                          {poolArray.map((pool: any, index: number) => (
                            <tr key={index}>
                              <td>
                                <div className="deals__exchange">
                                  <span className="red">
                                    {shortenAddress(pool.depositTokenAddress)}
                                    &nbsp; &nbsp;
                                    {pool.depositedToken.symbol}
                                    &nbsp; &nbsp;
                                    <FaRegCopy
                                      onClick={() => copyAddress(pool.depositTokenAddress)} />
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="deals__exchange">
                                  <span className="red">
                                    {shortenAddress(pool.rewardTokenAddress)}
                                    &nbsp; &nbsp;
                                    {pool.rewardToken.symbol}
                                    &nbsp; &nbsp;
                                    <FaRegCopy
                                      onClick={() => copyAddress(pool.rewardTokenAddress)} />
                                  </span>
                                </div>
                              </td>
                              <td className="deals__text deals__text--green">
                                {pool.depositedAmount}
                                &nbsp; <span className="red">
                                  {pool.depositedToken.symbol}
                                </span>
                              </td>
                              <td className="deals__text">
                                #POO-{index}
                              </td>
                              <td className="deals__text deals__text--green">
                                {pool.apy} %
                              </td>
                              <td className="deals__text deals__text--sell">
                                {pool.lockDays} days
                              </td>
                              <td className="deals__text deals__text--sell">
                                <a
                                  href=""
                                  className="header__profile"
                                  data-bs-target="modal-apool"
                                  type="button"
                                  data-bs-toggle="modal"
                                  onClick={() => setModifyPoolID(index)}>
                                  <i className="ti">
                                    <FaEdit />
                                  </i>
                                  <span>Update APY</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
