"use client"
import { Web3Provider } from "@/providers/Web3Provider";
import { useAccount } from "wagmi"
import { ListingOptions } from "@/components/ListingOptions";

export function Listing() {
  const { isConnected, address, isConnecting } = useAccount();
  

  return (
    <>
      {isConnecting ? (
        <p>Connecting...</p>
      ) : isConnected ? (
        <ListingOptions/>
      ) : (
        <p>Not Connected</p>
      )}
    </>
  );
}

export default function Page() {
    return(
        <Web3Provider>
            <Listing/>
        </Web3Provider>
    )
    
}