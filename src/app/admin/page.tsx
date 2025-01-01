"use client"

import Admin from '@/components/views/admin/Admin'
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { contractData, sweep, modifyPool, createPool, transferToken } from "../../context"
import Auth from '@/components/views/admin/Auth';
import { ICOSale, Loader } from '@/components/views/main';
import AdminHead from '@/components/views/admin/AdminHead';
import UpdateAPYModel from '@/components/views/admin/UpdateAPYModel';

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS!

export default function Page() {
  const { address } = useAccount();
  const [loader, setLoader] = useState<boolean>(false);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [poolDetails, setPoolDetails] = useState();
  const [modifyPoolID, setModifyPoolId] = useState<string>('');

  const loadData = async () => {
    if (address) {
      setLoader(true)
      if (address?.toLowerCase() == ADMIN_ADDRESS?.toLowerCase()) {
        setCheckAdmin(true);
        const data = await contractData(address);
        setPoolDetails(data);
      }

      setLoader(false);
    }
  }

  useEffect(() => {
    loadData();

  }, [])


  return (
    <div>
      <AdminHead></AdminHead>
      <Admin
        transferToken={transferToken}
        address={address}
        setLoader={setLoader}
        createPool={createPool}
        sweep={sweep}
        poolDetails={poolDetails}
        setModifyPoolID={setModifyPoolId} />
      <ICOSale setLoader={setLoader} />
      <UpdateAPYModel
        setLoader={setLoader}
        modifyPool={modifyPool}
        modifyPoolId={modifyPoolID}
        poolDetails={poolDetails} />
      {!checkAdmin && <Auth />}
      {loader && <Loader />}
    </div>

  )
}
