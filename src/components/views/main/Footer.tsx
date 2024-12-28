"use client"
import React from "react";

const Footer = () => {
  return (
    <footer className="font-sans tracking-wide pt-12 pb-4 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Features</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Invest</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Token</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Safety</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Contests</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Services</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Affiliate</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Automatization</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Analytics</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Reports</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Company</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">About</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">News</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Contact</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">License</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Support</h4>
          <ul className="space-y-5">
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">How it works</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Help center</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Privacy policy</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Terms and Conditions</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center border-[#6b5f5f] pt-4 mt-8">
        <p className="text-gray-300 text-[15px]">
          © Shamba 2024.
        </p>
      </div>
    </footer>
  )
};

export default Footer;
