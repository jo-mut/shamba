import { Header, ICOSale, Loader, Notification, Statistics } from '@/components/views/main';
import { contractData } from '@/context';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS!

export default function activities() {
  const { address } = useAccount();
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [poolDetails, setPoolDetails] = useState();
  const [loader, setLoader] = useState(false);

  const loadData = async () => {
    if (address) {
      setLoader(true)

      const data = await contractData(address);
      setPoolDetails(data);

      setLoader(false)
    }
  }

  useEffect(() => {
    loadData();
  }, [address])


  return (
    <>
      <div className='new-margin'></div>
      <Statistics poolDetails={poolDetails} />
      <Notification page={"activity"} poolDetails={poolDetails} />
      <ICOSale setLoader={setLoader} />
      {loader && <Loader />}
    </>
  )
}
