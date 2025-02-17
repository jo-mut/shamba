import { copyAddress, shortenAddress } from "@/context";
import React from "react";
import { FaRegCopy } from "react-icons/fa";

const Notification = ({ poolDetails, page }) => {

  const notificationsArray = poolDetails?.notifications ?? [];

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {page != "activity" && (
            <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-lg-2 col-xl-6 offset-xl-3">
              <div className="section__title">
                <h2> Active live</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellat eius.?
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-12">
          <div className="deals scrollable-div" style={{
            overflowX: "scroll",
          }}>
            <table className="deals__table">
              <thead>
                <tr>
                  <th>TypeOf</th>
                  <th>Token</th>
                  <th>User</th>
                  <th>Pool ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {notificationsArray.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="deals__exchange">
                        <img src="img/exchange/ethereum.png" alt="" />
                        <span className="green">
                          {poolDetails?.rewardToken.symbol} {" "} {poolDetails?.rewardToken.name}
                        </span>
                        <span className="red">
                          &nbsp; &nbsp; {" "}
                          <FaRegCopy
                            onClick={() => copyAddress(poolDetails?.rewardToken.address)} />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="deals__text deals__text--green">
                        {shortenAddress(item.user)} &nbsp; &nbsp; {" "}
                        <span className="red">
                          &nbsp; &nbsp; {" "}
                          <FaRegCopy
                            onClick={() => copyAddress(poolDetails?.rewardToken.address)} />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="deals__text">
                        {`#00-${item?.poolID}`}
                      </div>
                    </td>
                    <td>
                      <div className="deals__text deals__text--sell">
                        {`${item?.amount}`} {poolDetails?.rewardToken.symbol}
                      </div>
                    </td>
                    <td>
                      <div className="deals__text deals__text--sell">
                        {`${item?.timestamp}`}
                      </div>
                    </td>
                  </tr>
                )).slice(0, 10)}
              </tbody>
            </table>
          </div>
          {page != "activity" && (
            <div className="col-12">
              <div className="section__btns">
                <a href="/activities" className="section__btn">
                  View all activities
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Notification;
