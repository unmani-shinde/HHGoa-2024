"use client"
import React from 'react';
import { FactoryContract } from '@/contracts/FactoryContract';
import { useWriteContract } from "wagmi";
import { EstateActionProps  } from "@/utils/types/Estate"

export const ListForAuctionButton = ({ estateID }:EstateActionProps) => {
  
    const { writeContract} = useWriteContract();
  
    const handleButtonClick = async () => {
      try {
        writeContract({
          abi: FactoryContract.abi,
          address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
          functionName: 'listEstateForAuction',
          args: [estateID],
        });
      } catch (error) {
        console.error('Transaction failed', error);
      }
    };
  
    return (
      <button
        onClick={handleButtonClick}
        className="rounded-lg md:mb-2 sm:mb-2 mb-2 bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
      >
        List for Auction
      </button>
    );
  };

export const ListForInvestmentButton = ({ estateID }:EstateActionProps) => {


const { writeContract} = useWriteContract();

const handleButtonClick = async () => {
    try {
    writeContract({
        abi: FactoryContract.abi,
        address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'listEstateForInvestment',
        args: [estateID],
    });
    } catch (error) {
    console.error('Transaction failed', error);
    }
};

return (
    <button
    onClick={handleButtonClick}
    className="rounded-lg md:mb-2 sm:mb-2 mb-2 bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
    >
    List for Investment
    </button>
);
};

