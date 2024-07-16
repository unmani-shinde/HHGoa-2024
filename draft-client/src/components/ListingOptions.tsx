
"use client";

import { Label, Radio,TextInput } from "flowbite-react";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { factoryContractABI } from "@/abi/factoryContractABI";

export function ListingOptions() {
  const [selectedOption, setSelectedOption] = useState("none");
  const [estateId,setEstateId] = useState<Number>(-1);

  const { writeContract } = useWriteContract();

  const handleOptionChange = (option:string) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    try {
        if(selectedOption=='auction'){
            await writeContract({
                abi: factoryContractABI,
                address: '0xB7FEf1058C49FFAd843b0F24E0c59999F7ecf0CB',
                functionName: 'listEstateForAuction',
                args: [estateId],
              });
              alert("Estate Token has been listed for auction successfully!")
        }
        else if(selectedOption=='investment'){
            await writeContract({
                abi: factoryContractABI,
                address: '0xB7FEf1058C49FFAd843b0F24E0c59999F7ecf0CB',
                functionName: 'listEstateForInvestment',
                args: [estateId],
              });
              alert("Estate Token has been listed for investment successfully!")
        }
      
    } catch (error) {
      console.error("Error listing estate token", error);
    }
  };


  return (
    <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold  leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">List My Estate Token</h1>


        <div className="mb-4">
        <div className="mb-2 block">
          <Label className="text-md text-center" htmlFor="tokenid" value="Enter your Token ID" />
        </div>
        <TextInput onChange={(e)=>{setEstateId(Number(e.target.value))}} id="tokenid" type="number" className="w-full" />
      </div>
      <fieldset className="flex max-w-md flex-col gap-4">
        <legend className="mb-4 text-md ">What do you wish to list this estate for?</legend>
        <div className=" flex items-center gap-2">
          <Radio 
            id="auction" 
            name="listing-options" 
            
            value="auction" 
            checked={selectedOption === "auction"} 
            onChange={() => handleOptionChange("auction")} 
          />
          <Label className="text-md"htmlFor="auction">Auction (Direct Purchase)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio 
            id="investment" 
            name="listing-options" 
            value="investment" 
            checked={selectedOption === "investment"} 
            onChange={() => handleOptionChange("investment")} 
          />
          <Label className="text-md" htmlFor="investment">Investment (Fractional Ownership)</Label>
        </div>
      </fieldset>
      <button className="mt-10 py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70" onClick={handleSubmit}>List My Estate</button>
    </div>
  );
}


