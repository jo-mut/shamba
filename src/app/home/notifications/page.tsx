"use client"
import PoolContext from "@/app/providers/PoolContext";
import { Notification, PoolDetails } from "@/app/types/types";
import { copyAddress, shortenAddress } from "@/context";
import React, { useContext } from "react";
import { FaRegCopy } from "react-icons/fa";

interface PageProps {
  page: string;
}

const Page = ({ page }: PageProps) => {
  const { poolDetails } = useContext(PoolContext);

  const notificationsArray = poolDetails?.notifications ?? [];

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {notificationsArray &&
            notificationsArray.length > 0 && (
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
                      {notificationsArray.map((notification: Notification, index: number) => (
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
                              {shortenAddress(notification.user)} &nbsp; &nbsp; {" "}
                              <span className="red">
                                &nbsp; &nbsp; {" "}
                                <FaRegCopy
                                  onClick={() => copyAddress(poolDetails?.rewardToken.address)} />
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="deals__text">
                              {`#00-${notification?.poolID}`}
                            </div>
                          </td>
                          <td>
                            <div className="deals__text deals__text--sell">
                              {`${notification?.amount}`} {poolDetails?.rewardToken.symbol}
                            </div>
                          </td>
                          <td>
                            <div className="deals__text deals__text--sell">
                              {`${notification?.timestamp}`}
                            </div>
                          </td>
                        </tr>
                      )).slice(0, 10)}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
};

export default Page;
