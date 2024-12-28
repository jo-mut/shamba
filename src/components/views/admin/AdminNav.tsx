import React from "react";
import ButtonCmp from "../ui/ButtonCmp"

const AdminNav = () => {
  return (
    <div className="col-12 col-lg-12 col-md-6 ">
      <div className="section__tabs-profile">
        <ul className="nav nav-tabs section__tabs sections__tabs--big 
        section_tabs--profile" id="section__tabs" role="tablist">
          <ButtonCmp name="Dashboard" tab={`1`} styleClass={"active"} />
          <ButtonCmp name="Investing" tab={`2`} />
          <ButtonCmp name="Staking" tab={`3`} />
          <ButtonCmp name="Transfer" tab={`4`} />
          <ButtonCmp name="Pool" tab={`5`} />
          <ButtonCmp name="ICO Token" tab={`6`} />
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
