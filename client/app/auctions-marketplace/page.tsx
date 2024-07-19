"use client"

import Fancy from "@/components/Fancy";
import { Web3Provider } from "@/utils/providers/Web3Provider";
import WagmiReads from "@/wagmi/wagmiReads";
import { useAccount } from "wagmi";
import { Estate } from "@/utils/types/Estate";
import CardComponent from "@/components/MyTokens/TokenCard";

export function AuctionsMarketplace() {
    const { numEstates, estates } = WagmiReads();
    const { address } = useAccount();

    return(<>
    <Fancy/>
    <div className="flex-1 pt-24 p-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {estates?.map((estate, index) => {
            const estateResult = estate.result as Estate;
            if (estateResult.estateOwner === address && estateResult.isListedForAuction) {
              return (
                <CardComponent key={index} estate={estateResult} />
              );
            }
            return null; // Return null if the condition is not met
          })}
        </div>
      </div>
    </>)
    
}

export default function Page() {
    return(
        <Web3Provider>
            <AuctionsMarketplace/>
        </Web3Provider>
    )
    
}