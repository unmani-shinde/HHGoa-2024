"use client";

import { Card } from "flowbite-react";
import { EstateProps } from "@/utils/types/Estate";
import { ListForAuctionButton, PlaceBidButton, AuctionDetailsDisplayButton, ListForInvestmentButton, PurchaseSharesButton } from "@/app/my-tokens";
import { useState, useEffect } from "react";
import { Label, TextInput } from "flowbite-react";
import Web3 from "web3";
import { useAccount } from "wagmi";


export default function CardComponent({ estate, isauctionMarketplace, ismyAuctionTokens, isInvestmentMarketplace, ismyInvestmentTokens }:EstateProps) {
  const truncateAddress = (address: string, length: number = 6): string => {
    if (!address) return '';
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  };

  const [bid, setBid] = useState<string>("");
  const [sharesCount, setSharesCount] = useState<Number>(0);
  const account = useAccount();

  const pinataGatewayToken = 'TkCr506T18TFvwHuc3SPOXpqvNCN0bSJU14CzRDlIrWpk16RrZFhDkrOaTDf6NF0';
  const tokenURI = `https://apricot-additional-camel-666.mypinata.cloud/ipfs/${estate?.estateMetadata}?pinataGatewayToken=${pinataGatewayToken}`;


  
  return (
    <Card
      className="max-w-sm"
      imgAlt="Estate image"
      imgSrc={tokenURI}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Estate Token #{Number(estate?.estateID)}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Current Owner: {truncateAddress(estate?.estateOwner || '')}
      </p>
      <p style={{ marginTop: '-1vh' }} className="font-normal text-gray-700 dark:text-gray-400">
        Estate Evaluation: {Web3.utils.fromWei(estate?.estateEvaluation.toString(), "ether")} tCORE
      </p>
      <div className={`flex lg:${isauctionMarketplace ? "flex-col" : "flex-row"} md:flex-col sm:flex-col items-center justify-between`}>
        {isauctionMarketplace && account.address !== estate?.estateOwner && (
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="small" value="Enter Bid Value" />
            </div>
            <TextInput onChange={(e) => setBid(e.target.value)} id="small" type="text" sizing="sm" />
          </div>
        )}

        {isInvestmentMarketplace && account.address !== estate?.estateOwner && (
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="small" value="Enter No. of Shares to Purchase" />
                    </div>
                    <TextInput onChange={(e) => setSharesCount(Number(e.target.value))} id="small" type="number" sizing="sm" />
                  </div>
                )}



        {isauctionMarketplace && account.address !== estate?.estateOwner && (
          <PlaceBidButton estateID={Number(estate?.estateID)} bid={bid} />
        )}
        {(isauctionMarketplace || ismyAuctionTokens) && (
          <AuctionDetailsDisplayButton estateID={Number(estate?.estateID)} />
        )}
        {!isauctionMarketplace && !ismyAuctionTokens && (
          <ListForAuctionButton estateID={Number(estate?.estateID)} />
        )}
        {!isInvestmentMarketplace && !ismyInvestmentTokens && (
          <ListForInvestmentButton estateID={Number(estate?.estateID)} />
        )}

        {isInvestmentMarketplace && account.address !== estate?.estateOwner && (
          <PurchaseSharesButton estateID={Number(estate?.estateID)} sharesCount={sharesCount} />
        )}
      
      </div>
    </Card>
  );
}

