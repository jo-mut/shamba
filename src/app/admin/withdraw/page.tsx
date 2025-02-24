"use client"
import PoolContext from '@/app/providers/PoolContext';
import Notification from '@/components/views/admin/Notification';
import ButtonCmp from '@/components/views/ui/ButtonCmp';
import ClickButton from '@/components/views/ui/ClickButton';
import InputField from '@/components/views/ui/InputField';
import Title from '@/components/views/ui/Title';
import React, { useContext, useState } from 'react'

function Page() {
    const { setLoader, poolDetails, sweep } = useContext(PoolContext);

    const [token, setToken] = useState({
        token: "",
        amount: ""
    })

    const handleSweep = async (token: any) => {
        setLoader(true);
        const receipt: any = await sweep(token);
        if (receipt) {
            setLoader(false);
            window.location.reload();
        }
        setLoader(false);
    }


    return (
        <>
            {/* <div className="col-12">
                <div className="profile">
                    <div className="col-12">
                        {poolDetails?.notifications.map((notify: any, index: number) => {
                            <Notification
                                index={index}
                                notify={notify}
                                poolDetails={poolDetails} />
                        })}
                    </div>
                </div>
            </div> */}

            <div className="w-1/2 bg-gray-100 p-5 h-auto mx-auto rounded-3xl">
                <Title title="Withdraw staking token" />
                <InputField
                    size="12"
                    type="text"
                    title="Token Address"
                    name="amount2"
                    placeholder="address"
                    handleChange={(e) => setToken({ ...token, token: e.target.value })} />
                <InputField
                    size="12"
                    type="text"
                    title="Enter Amount"
                    name="amount3"
                    placeholder={`${poolDetails?.contractTokenBalance}${poolDetails?.depositToken.symbol}`}
                    handleChange={(e) => setToken({ ...token, amount: e.target.value })} />
                <ClickButton
                    name={'Withdraw'}
                    handleClick={() => handleSweep(token)} />
            </div>
        </>
    )
}

export default Page