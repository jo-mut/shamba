import { ethers } from "ethers";
import StakingDappABI from "./StakingDapp.json";
import TokenICO from "./TokenICO.json";
import CustomTokenABI from "./ERC20.json";


// CONTRACT
const STAKING_DAPP_ADDRESS = process.env.NEXT_PUBLIC_STAKING_DAPP;
const TOKEN_ICO_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ICO;

// TOKEN
const DEPOSIT_TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;
const REWARD_TOKEN = process.env.NEXT_PUBLIC_REWARD_TOKEN;

export function toEth(amount, decimals = 18) {
    const toEth = ethers.utils.formatUnits(amount, decimals);
}

export const tokenContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { ethereum } = window;

    if (ethereum) {
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract(
            DEPOSIT_TOKEN,
            CustomTokenABI.abi,
            signer
        )

        return contractReader;
    }
}

export const stakingContract = async (stakingToken, initialOwner) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { ethereum } = window;

    if (ethereum) {
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract(
            STAKING_DAPP_ADDRESS,
            StakingDappABI.abi,
            signer
        )

        return contractReader;
    }
}

export const ERC20 = async (isAddress, userAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { ethereum } = window;

    if (ethereum) {
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract(
            STAKING_DAPP_ADDRESS,
            CustomTokenABI.abi,
            signer
        )

        const token = {
            name: await contractReader.name(),
            symbol: await contractReader.symbol(),
            address: await contractReader.address(),
            totalSupply: toEth(await contractReader.totalSupply()),
            balance: toEth(await contractReader.balanceOf(userAddress)),
            contractTokenBalance: toEth(await contractReader.balanceOf(STAKING_DAPP_ADDRESS))
        }

        return token;
    }
}

// TOKEN_ICO_ADDRESS
export const loadTokenICO = async () => {
    try {
        const contract = await tokenIcoContract();
        const tokenAddress = await contract.tokenAddress();

        const tokenDetails = await contract.getTokenDetails();
        const contractOwner = await contract.owner();
        const soldTokens = await contract.soldTokens();
        const icoToken = await tokenIcoER20();

        const token = {
            tokenBalance: ethers.utils.formatEther(tokenDetails.balance.toString()),
            name: tokenDetails.name,
            symbol: tokenDetails.symbol,
            supply: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
            tokenPrice: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
            tokenAddress: tokenDetails, tokenAddress,
            owner: contractOwner.toLowerCase(),
            soldTokens: soldTokens.toNumber(),
            token: icoToken
        }

        return token
    } catch (error) {
        console.log(error)

    }
}

export const tokenIcoContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { ethereum } = window;

    if (ethereum) {
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract(
            TOKEN_ICO_ADDRESS,
            TokenICO.abi,
            signer
        )

        return contractReader;
    }
}

export const tokenIcoER20 = async (isAddress, userAddress) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const { ethereum } = window;

        if (ethereum) {
            const signer = provider.getSigner();
            const contractReader = new ethers.Contract(
                DEPOSIT_TOKEN,
                CustomTokenABI.abi,
                signer
            )

            const userAddress = await signer.getAddress();
            const nativeBalance = await signer.getBalance();
            const balance = await contractReader.balanceOf(userAddress)

            const token = {
                address: await contractReader.address(),
                name: await contractReader.name(),
                symbol: await contractReader.symbol(),
                decimals: await contractReader.decimals(),
                supply: toEth(await contractReader.totalSupply()),
                balance: toEth(await contractReader.balanceOf(balance)),
                nativeBalance: toEth(nativeBalance.toString())
            }

            return token;
        }
    } catch (error) {
        console.log(error)
    }
}