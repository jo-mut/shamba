"use client"

import Image from "next/image";
import { Toaster, ToastType } from "react-hot-toast";
import merge from "lodash/merge";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, darkTheme, midnightTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Footer, Header, ICOSale, Loader } from "@/components/views/main";
import { useEffect, useState } from "react";
import Sidebar from "@/components/views/main/Sidebar";
import PoolProvider from "./providers/PoolProvider";
import UpdateAPYModal from "@/components/views/admin/UpdateAPYModal";
import { redirect } from "next/navigation";


export default function AppProviders(
    { children }: Readonly<{
        children: React.ReactNode;
    }>) {
    const [loader, setLoader] = useState<boolean>(false);
    const [adminPage, setAdminPage] = useState(false)
    const SEPOLIA = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
    const EXPLORER = process.env.NEXT_PUBLIC_ADDRESS_EXPLORER;
    const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
    const DECIMALS = process.env.NEXT_PUBLIC_NETWORK_DECIMALS;
    const CURRENCY = process.env.NEXT_PUBLIC_STAKING_DAPP;
    const NAME = process.env.NEXT_PUBLIC_CURRENCY;
    const NETWORK = process.env.NEXT_PUBLIC_NETWORK_NAME;

    const { chains, provider } = configureChains(
        [{
            id: Number(CHAIN_ID),
            name: NAME,
            network: NETWORK,
            nativeCurrency: {
                name: NAME,
                symbol: CURRENCY,
                decimals: Number(DECIMALS),
            },
            rpcUrls: {
                default: {
                    http: [`${SEPOLIA}`]
                },
                public: {
                    http: [`${SEPOLIA}`]
                },
            },
            blockExplorers: {
                default: {
                    name: "Sepolia",
                    url: EXPLORER
                },
            },
            testnet: true,
        } as any],
        [jsonRpcProvider({
            rpc: (chain) => {
                if (chain.id === Number(CHAIN_ID)) {
                    return { http: `${SEPOLIA}` };
                }
                return null;
            },
            priority: 1,
        })]);

    const { connectors } = getDefaultWallets({
        appName: "StakingDapp",
        chains,
    });

    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
    });

    const theme = merge(midnightTheme(), {
        colors: {
            accentColor: '#562c7B',
            accentColorForeground: "#fff",
        },
    });


    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={theme}>
                <PoolProvider>
                    <div className="row">
                        <div className="col-md-2 bg-gray-500">
                            <Sidebar />
                        </div>
                        <div className="col-md-10 px-20">
                            <Header setLoader={setLoader}></Header>
                            <div className="min-h-[100vh]">
                                {children}
                            </div>
                            <ICOSale setLoader={setLoader} />
                            <UpdateAPYModal />
                            {loader && <Loader />}
                            <Footer></Footer>
                            <Toaster />
                        </div>
                    </div>
                </PoolProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
