import React, { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { useWriteContract, useReadContract } from 'wagmi';
import { factoryContractABI } from '@/abi/factoryContractABI';
import { Address } from 'viem';

export function AuctionListings() {
  const [estateId, setEstateId] = useState<number>(-1);
  const [bid, setBid] = useState<number>(0); // Assuming bid should start from 0
  const { writeContract } = useWriteContract();

  const {data: auctionListingData, fetchStatus:stat
} = useReadContract({
    abi:factoryContractABI,
    address: '0xB7FEf1058C49FFAd843b0F24E0c59999F7ecf0CB',
    functionName: 'getEstateAuctionListing',
    args: [estateId], // Pass the dynamic estateId here
    query: {
        networkMode: 'online',
        enabled: true,
      },
  });

  const handleSubmit = async () => {
    console.log(auctionListingData,stat);
    
    try {
        await writeContract({
          abi: factoryContractABI,
          address: auctionListingData,
          functionName: 'placeBid',
          args: [bid],
        });
     
    } catch (error) {
      console.error('Error handling bid placement:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-screen items-center">
      <h1 className="mb-4 mt-4 text-4xl font-extrabold leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Estate Auctions
      </h1>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label
            className="text-md text-center"
            htmlFor="tokenid"
            value="Enter Token ID to Place Bid"
          />
        </div>
        <TextInput
          onChange={(e) => {
            setEstateId(Number(e.target.value));
          }}
          id="tokenid"
          type="number"
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label
            className="text-md text-center"
            htmlFor="bid"
            value="Enter Bid Price (in tCORE)"
          />
        </div>
        <TextInput
          onChange={(e) => {
            setBid(Number(e.target.value));
          }}
          id="bid"
          type="number"
          className="w-full"
        />
      </div>

      <button className="mt-10 py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70" onClick={handleSubmit}>
        Place Bid
      </button>
    </div>
  );
}
