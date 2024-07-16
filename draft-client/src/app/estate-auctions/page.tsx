"use client"
import { Web3Provider } from "@/providers/Web3Provider";
import { useAccount } from "wagmi"
import { ListingOptions } from "@/components/ListingOptions";
import { AuctionListings } from "@/components/AuctionListings";


export function Auctions() {
  const { isConnected, address, isConnecting } = useAccount();
  

  return (
    <>
      {isConnecting ? (
        <p>Connecting...</p>
      ) : isConnected ? (
        <AuctionListings/>
      ) : (
        <p>Not Connected</p>
      )}
    </>
  );
}

export default function Page() {
    return(
        <Web3Provider>
            <Auctions/>
        </Web3Provider>
    )
    
}