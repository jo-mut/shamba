import { BigNumber, ethers } from "ethers";
import toast from "react-hot-toast";
import { tokenContract, ERC20, toEth, tokenIcoContract, stakingContract } from "./constants";


const STAKING_DAPP_ADDRESS = process.env.NEXT_PUBLIC_STAKING_DAPP;
const INITIAL_OWNER  = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;
// TOKEN
const DEPOSIT_TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;
const REWARD_TOKEN = process.env.NEXT_PUBLIC_REWARD_TOKEN;

const TOKEN_LOGO = process.env.NEXT_PUBLIC_TOKEN_LOGO;

const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
const notifyError = (msg) => toast.error(msg, { duration: 2000 });

function ConvertTimeStampToReadable(timestamp) {
    const date = new Date(timestamp * 1000);

    const readableTime = date.toLocaleDateString("en-US", {
        yeah: "numeric",
        months: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })

    return readableTime;
}

function toWei(amount) {
    const toWei = ethers.utils.parseUnits(amount.toString());
    return toWei.toString();
}

function parseErrorMsg(e) {
    const json = JSON.parse(JSON.stringify(e));
    return json?.reason || json?.error?.message
}


export const shortenAddress = (address) => {
     return `${address?.slice(0, 8)}...${address?.slice(address.length - 4)}`;
}

export const copyAddress = (test) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Copied successfully");
}

const contractObject = async () => {
    const object = await stakingContract(DEPOSIT_TOKEN, INITIAL_OWNER);
    return object;
}

export async function contractData(address) {
    try {
        const contractObj = await contractObject()

        if (address) {
            const contractOwner = await contractObj.owner();
            const contractAddress = await contractObj.address;

            const notifications = await contractObj.getNotification();

            const _notifactionsArray = await Promise.all(
                notifications.map(async ({ poolID, amount, user, typeOf, timestamp }) => {
                    return {
                        poolID: poolID.toNumber(),
                        amount: toEth(amount),
                        user: user,
                        typeOf: typeOf,
                        timestamp: ConvertTimeStampToReadable(timestamp),
                    }
                }))

            let poolInfoArray = [];
            const poolLength = await contractObj.poolCount();
            const length = poolLength.toNumber();

            for (let i = 0; i < length; i++) {
                const poolInfo = await contractObj.poolInfo(i);
                const userInfo = await contractObj.userInfo(i, address);
                const userReward = await contractObj.pendingReward(i, address);
                const tokenPoolInfoA = await ERC20(poolInfo.depositedToken, address);
                const tokenPoolInfoB = await ERC20(poolInfo.rewardToken, address);

                console.log("pool info", poolInfo)
                console.log("pool info", poolInfo)


                const pool = {
                    depositTokenAddress: poolInfo.depositedToken,
                    rewardTokenAddress: poolInfo.rewardToken,
                    depositedToken: tokenPoolInfoA,
                    rewardToken: tokenPoolInfoB,
                    depositedAmount: toEth(poolInfo.depositedAmount.toString()),
                    apy: poolInfo.apy.toString(),
                    lockDays: toEth(userInfo.amount.toString()),
                    userReward: toEth(userReward),
                    lockUntil: ConvertTimeStampToReadable(userInfo.lockUntil.toNumber()),
                    lastRewardAt: toEth(userInfo.lastRewardAt.toString()),
                }

                poolInfoArray.push(pool);

            }


            const totalDepositAmout = poolInfoArray.reduce((total, pool) => {
                return total + parseFloat(pool.depositedAmount);
            }, 0)

            console.log("total deposited amount", totalDepositAmout)



            const rewardToken = await ERC20(DEPOSIT_TOKEN, address);
            const depositedToken = await ERC20(DEPOSIT_TOKEN, address);

            console.log("total deposited amount", depositedToken.contractTokenBalance)

            const data = {
                contractOwner: contractOwner,
                contractAddress: contractAddress,
                notifications: _notifactionsArray.reverse(),
                rewardToken: rewardToken,
                depositedToken: depositedToken,
                poolInfoArray: poolInfoArray,
                totalDepositAmout: totalDepositAmout,
                contractTokenBalance: depositedToken.contractTokenBalance - totalDepositAmout,
            }

            return data;
        }

    } catch (error) {
        console.log(error);
        console.log(parseErrorMsg(error));
        return parseErrorMsg(error);
    }
}


export async function deposit(poolID, amount, address) {
    try {
        notifySuccess("Calling contract...");
        const contractObj = await contractObject();
        const stakingTokenObject = await tokenContract();

        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

        const currentAllowance = await stakingTokenObject.allowance(
            address,
            contractObj.address
        );

        if (currentAllowance.lt(amountInWei)) {
            notifySuccess("Approving token...");
            const approveTx = await stakingTokenObject.approve(
                contractObj.address,
                amountInWei
            );

            await approveTx.wait();
            console.log(`Approved ${amountInWei.toString()} tokens for staking`);
        }

        const gasEstimation = await contractObj.estimateGas.deposit(
            Number(poolID),
            amountInWei
        );

        notifySuccess("Staking token call ...");
        const stakeTx = await contractObj.deposit(poolID, amountInWei, {
            gasLimit: gasEstimation,
        })

        const receipt = await stakeTx.wait();
        notifySuccess("Token deposit successuful");
        return receipt;

    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }

}

export async function transferToken(amount, transferAddress) {
    try {
        notifySuccess("Calling contract token...")
        const stakingTokenObject = await tokenContract();

        const transferAmount = ethers.utils.parseEther(amount);

        const approveTx = await stakingTokenObject.transfer(
            transferAddress,
            transferAmount
        );

        const receipt = await approveTx.wait();
        notifySuccess("Token transfer successful");
        return receipt;
    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}


export async function withdraw(poolID, amount) {
    try {
        notifySuccess("Calling contract...")
        const contractObject = await contractObject();


        const amountInWei = ethers.utils.parseEther(amount.toString());

        const gasEstimation = await contractObject.estimateGas.withdraw(
            Number(poolID),
            amountInWei
        );

        const data = await contractObject.withdraw(Number(poolID, amountInWei, {
            gasLimit: gasEstimation,
        }));

        const receipt = await data.wait();
        notifySuccess("Token withdrawal successful");
        return receipt;
    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}

export async function claimReward(poolID) {
    try {
        notifySuccess("Calling contract...")
        const contractObject = await contractObject();


        const gasEstimation = await contractObject.estimateGas.claimReward(
            Number(poolID),
        );

        const data = await contractObject.claimReward(Number(poolID, {
            gasLimit: gasEstimation,
        }));

        const receipt = await data.wait();
        notifySuccess("Reward claim successful");
        return receipt;
    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}

export async function createPool(pool) {

    try {

        const { _depositedToken, _rewardToken, _apy, _lockDays } = pool;
        if (!_depositedToken || !_rewardToken || !_apy || !_lockDays) return notifyError(
        )
        notifySuccess("Calling contract...");

        const contractObject = await contractObject();

        console.log("create pool receipt 1", contractObject);


        const gasEstimation = await contractObject.estimateGas.addPool(
            _depositedToken,
            _rewardToken,
            Number(_apy),
            Number(_lockDays)
        );

        const stakeTx = await contractObject.addPool(
            _depositedToken,
            _rewardToken,
            Number(_apy),
            Number(_lockDays), {
            gasLimit: gasEstimation,
        })

        const receipt = await stakeTx.wait();

        notifySuccess("Pool created successful");
        return receipt;

    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}

export async function modifyPool(pool, amount) {
    console.log("pool details when modifying ",pool)
    try {
        const { _depositedToken, _rewardToken, _apy, _lockDays } = pool;
        if (!_depositedToken || !_rewardToken || !_apy || _lockDays) return notifyError(
            "Provide all the details",
        )
        notifySuccess("Calling contract...");

        const contractObject = await contractObject();

        const gasEstimation = await contractObject.estimateGas.modifyPool(
            Number(amount),
            Number(poolID)
        );

        const stakeTx = await contractObject.addPool(
            Number(amount),
            Number(poolID), {
            gasLimit: gasEstimation,
        })

        const receipt = await stakeTx.wait();
        notifySuccess("Pool modification successful");
        return receipt;

    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}

export async function sweep(tokenData) {
    try {

        const { token, amount } = tokenData;
        if (!token || !amount) return notifyError("Data is missing");

        notifySuccess("Calling contract...")
        const contractObject = await contractObject();

        const transferAmount = ethers.utils.parseEther(amount.toString());

        const gasEstimation = await contractObject.estimateGas.sweep(
            token,
            transferAmount
        );

        const data = await stakingContractObject.sweep(token, transferAmount, {
            gasLimit: gasEstimation,
        });

        const receipt = await data.wait();
        notifySuccess("Transaction successful");
        return receipt;
    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}

// ADD TOKEN TO METAMASK
export const addTokenToMetamask = async () => {
    if (window.ethereum) {
        const contractObject = await tokenContract();

        const tokenDecimals = await contractObject.decimals();
        const tokenAddress = await contractObject.address;
        const tokenSymbol = await contractObject.symbol();
        const tokenImage = await TOKEN_LOGO;

        try {
            const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20", options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        image: tokenImage,
                    },
                },
            });

            if (wasAdded) {
                notifySuccess("Token added successfully");
            } else {
                notifyError("Failed to add token");
            }
        } catch (error) {
            console.log(error)
            notifyError("Failed to add token");
            const errorMsg = parseErrorMsg(error);
            notifyError(errorMsg);
        }

    } else {
        notifyError("Metamask is not installed");
    }
}

// ICO CONTRACT
export const buyToken = async (amount) => {
    try {
        notifySuccess("Calling ico contract ");
        const contractObject = await tokenIcoContract(amount);
        const tokenDetails = await contractObject.getTokenDetails();

        const availableToken = ethers.utils.formatEther(tokenDetails.balance.toString());

        if (availableToken > 1) {
            const price = ethers.utils.formatEther(tokenDetails.tokenPrice.toString() * Number(amount));
            const payAmount = ethers.utils.parseUnits(price.toString(), "ether");
            const transaction = await contractObject.buyToken(Number(amount), {
                value: payAmount.toString(),
                gasLimit: ethers.utils.hexlify(8000000),
            });

            const receipt = await transaction.wait();
            notifySuccess("Transaction successful");
            return receipt
        } else {
            notifyError("Token balance is lower than expected");
            return "receipt";
        }
    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}


export const tokenWithdraw = async () => {
    try {
        notifySuccess("Calling ico contract ");
        const contractObject = await tokenIcoContract();
        const tokenDetails = await contractObject.getTokenDetails();
        const availableToken = ethers.utils.formatEther(tokenDetails.balance.toString());

        if (availableToken > 1) {
            const transaction = await contractObject.withdrawAllTokens();

            const receipt = await transaction.wait();
            notifySuccess("Transaction successful");
            return receipt
        } else {
            notifyError("Token balance is lower than expected");
            return "receipt";
        }
    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}

export const updateToken = async (_address) => {
    try {
        if (!_address) return notifyError("Data is missing");
        notifySuccess("Calling contract ");
        const contractObject = await tokenIcoContract();

        console.log("update token address to: ",_address)

        const gasEstimation = await contractObject.estimateGas.updateToken(_address);

        const transaction = await contractObject.updateToken(_address, {
            gasLimit: gasEstimation,
        });

        const receipt = await transaction.wait();
        notifySuccess("Token update successful");
        return receipt

    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}

export const updateTokenPrice = async (price) => {
    try {
        if (!price) return notifyError("Data is missing");
        notifySuccess("Calling contract ");
        const contractObject = await tokenIcoContract();

        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const gasEstimation = await contractObject.estimateGas.updateTokenSalePrice(payAmount);

        const transaction = await contractObject.updateTokenSalePrice(payAmount, {
            gasLimit: gasEstimation,
        });

        const receipt = await transaction.wait();
        notifySuccess("Token update successful");
        return receipt
    } catch (error) {
        console.log(error)
        const errorMsg = parseErrorMsg(error);
        notifyError(errorMsg);
    }
}