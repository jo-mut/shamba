import React, { useState } from 'react'
import Title from '../ui/Title'
import InputField from '../ui/InputField'
import ClickButton from '../ui/ClickButton'
import { createPool } from '@/context'
import { IoMdClose } from 'react-icons/io'

const CreatePool = () => {
    const [loader, setLoader] = useState<boolean>(false);

    const [pool, setPool] = useState({
        _depositToken: "",
        _rewardToken: "",
        _apy: "",
        _lockDays: ""
    })


    const handleCreatePool = async (pool: any) => {
        if (pool._depositToken === '' || pool._rewardToken === ''
            || pool._apy === '' || pool._lockDays === '') return;

        setLoader(true);
        const receipt = await createPool(pool);
        if (receipt) {
            setLoader(false);
            window.location.reload();
        }
        setLoader(false);
    }

    return (
        <div className="modal modal__auto fade"
            id="modal-create-pool"
            aria-labelledby="modal-create-pool"
            tabIndex={-1}
            data-bs-backdrop="false"
            data-bs-keyboard="false"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal--auto">
                    <div className='modal-content'>
                        <div className="modal__content">
                            <button
                                className="modal__close"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x">
                                    <IoMdClose />
                                </i>
                            </button>
                            <div className="rounded-3xl">
                                <Title
                                    title={"Provide pool details to create, new pool"} />
                                <InputField
                                    size={"12"}
                                    title={"Stake Token Address"}
                                    type="text"
                                    name={"depositToken1"}
                                    placeholder="address"
                                    handleChange={(e: any) => setPool({ ...pool, _depositToken: e.target.value })} />
                                <InputField
                                    size={"12"}
                                    title={"Reward Token Address"}
                                    type="text"
                                    name={"rewardToken1"}
                                    placeholder="address"
                                    handleChange={(e: any) => setPool({ ...pool, _rewardToken: e.target.value })} />
                                <InputField
                                    size={"12"}
                                    title={"APY %"}
                                    type="text"
                                    name="APY1"
                                    placeholder="APY"
                                    handleChange={(e: any) => setPool({ ...pool, _apy: e.target.value })} />
                                <InputField
                                    size={"12"}
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
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreatePool