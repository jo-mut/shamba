"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { Dispatch, SetStateAction, useState } from "react";
import ICOSale from "./ICOSale";

interface HeaderProps {
  setLoader: Dispatch<SetStateAction<boolean>>,

}

const Header: React.FC<HeaderProps> = ({ setLoader }) => {

  return (
    <header className='flex py-4 px-4 sm:px-6 font-[sans-serif] min-h-[75px] tracking-wide relative z-50'>
      <div className='flex flex-wrap items-center justify-end gap-5 w-full max-w-screen-xl mx-auto'>
        <div className='flex items-center space-x-4'>
          <ConnectButton showBalance={false}></ConnectButton>
          <button
            data-bs-target="#modal-deposit1"
            type="button"
            data-bs-toggle="modal"
            className='px-3.5 py-[7px] text-[15px] rounded font-semibold text-black border border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent hover:text-white'>Token ICO
          </button>
        </div>
      </div>
    </header >
  );
};

export default Header;
