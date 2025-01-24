"use client"

import React from "react";
import ButtonCmp from "../ui/ButtonCmp";
import Notification from "./Notification";

interface InvestingProps {
  poolDetails: any;
}

const Investing: React.FC<InvestingProps> = ({
  poolDetails
}) => {
  return (
    <div className="tab-pane fade" id="tab-2" role="tabpanel">
      <div className="row">
        <div className="col-12">
          <div className="profile">
            <ul className="nav nav-tabs section_tabs section__tabs--left"
              id="section__profile-tabs1" role="tablist">
            </ul>
            <ButtonCmp name={"Active"} tab={'f1'} styleClass={'active'} />
            <div className="tab-content" id="tab-f1" role="tabpanel">
              <div className="col-12">
                {poolDetails?.notifications.map((notify: any, index: number) => {
                  <Notification
                    index={index}
                    notify={notify}
                    poolDetails={poolDetails} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Investing;
