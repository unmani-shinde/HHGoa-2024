
"use client";

import { Card } from "flowbite-react";
import { EstateProps } from "@/utils/types/Estate";
import { ListForAuctionButton,PlaceBidButton,AuctionDetailsDisplayButton } from "@/app/my-tokens";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";



export default function CardComponent({ estate,isauctionMarketplace,ismyAuctionTokens }: EstateProps) {

  const truncateAddress = (address: string, length: number = 6): string => {
    if (!address) return '';
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  };
  

  const [bid,setBid] = useState<string>("");
  
  return (
    <Card
      className={`max-w-sm`}
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={estate?.estateMetadata}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Estate Token #{Number(estate?.estateID)}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
       Current Owner: {truncateAddress(estate?.estateOwner || '')}
      </p>
      <p style={{marginTop:'-1vh'}} className="font-normal text-gray-700 dark:text-gray-400">
       Estate Evaluation: {Number(estate?.estateEvaluation)} tCORE
      </p>
      <div className={`flex lg:${isauctionMarketplace ? "flex-col" : "flex-row"} md:flex-col sm:flex-col items-center justify-between`}>

        {isauctionMarketplace && (
          <div className="mb-4 ">
          <div className="mb-2 block">
            <Label htmlFor="small" value="Enter Bid Value" />
          </div>
          <TextInput onChange={(e)=>{setBid(e.target.value)}} id="small" type="text" sizing="sm" />
        </div>
        )}
        {
          isauctionMarketplace && (
            <PlaceBidButton estateID={Number(estate?.estateID)} bid={bid}/>
          )
        }
        {
          isauctionMarketplace || ismyAuctionTokens && (<AuctionDetailsDisplayButton estateID={Number(estate?.estateID)}/>)
        }
        {!isauctionMarketplace && !(ismyAuctionTokens) && (<ListForAuctionButton estateID={Number(estate?.estateID)}/>)}


        
        {!isauctionMarketplace && !(ismyAuctionTokens) && <button
          className="rounded-lg bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
        >
          List to Invest
        </button> }
        
      </div>
    </Card>
  );
}
