import { BigNumber, ethers } from "ethers";
import toast from "react-hot-toast";
import { tokenContract, ERC20, toEth, tokenIcoContract, stakingContract } from "./constants";


const STAKING_DAPP_ADDRESS = process.env.NEXT_PUBLIC_STAKING_DAPP;
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
    const address = `${address?.slice(0, 8)}...${address?.slice(address.length - 4)}`;
    return address
}

export const copyAddress = (test) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Copied successfully");
}

export async function contractData(address) {
    try {
        const contractObj = await stakingContract();
        const stakingTokenObject = await tokenContract();

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

                const pool = {
                    depositTokenAddress: poolInfo.depositedToken,
                    rewardTokenAddress: poolInfo.rewardTokenAddress,
                    depositedToken: tokenPoolInfoA,
                    rewardTokenAddress: tokenPoolInfoB,
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
            })

            const rewardToken = await ERC20(rewardToken, address);
            const depositedToken = await ERC20(DEPOSIT_TOKEN, address);

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

    }
}