import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Sidebar from "../main/Sidebar";

interface AdminProps {
  transferToken: () => void,
  poolDetails: any,
  address: any,
  setLoader: Dispatch<SetStateAction<boolean>>,
  createPool: () => void,
  sweep: () => void,
  setModifyPoolID: Dispatch<SetStateAction<string>>
}

const Admin: React.FC<AdminProps> = (
  { transferToken,
    poolDetails,
    address,
    setLoader,
    createPool,
    sweep,
    setModifyPoolID
  }) => {

  return (
    <div className="section">
      <Sidebar
        setModifyPoolID={setModifyPoolID}
        sweep={sweep}
        createPool={createPool}
        address={address}
        setLoader={setLoader}
        poolDetails={poolDetails}
        transferToken={transferToken} />
      
    </div>
  )
};

export default Admin;
