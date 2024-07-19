"use client";

import WagmiReads from "@/wagmi/wagmiReads";
import { useAccount } from "wagmi";
import CardComponent from "@/components/MyTokens/TokenCard";
import { Web3Provider } from "@/utils/providers/Web3Provider";


export function EstateTokensIOwn() {
    const { numEstates, estates } = WagmiReads();
    const { address } = useAccount();

    return (
      <div className="flex-1 p-6 overflow-auto ml-16 lg:ml-72 md:ml-72 sm:ml-72">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {estates?.map((estate, index) => {
            if (estate.result.estateOwner === address) {
              return (
              <CardComponent estate={estate.result} />
              );
            }
            return null; // Return null if the condition is not met
          })}
        </div>
      </div>
    );
}
export default function Page() {
    return (
        <Web3Provider>
            <EstateTokensIOwn />
        </Web3Provider>
    );
}
