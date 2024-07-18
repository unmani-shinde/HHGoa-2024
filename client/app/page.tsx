"use client"

import { FactoryContract } from "@/contracts/FactoryContract";
import { Web3Provider } from "@/utils/providers/Web3Provider";
import { useReadContract } from "wagmi";
import Hero from "@/components/LandingPage/Hero";
export function Home() {

  const { data: estates } = useReadContract({
    abi:FactoryContract.abi,
    address:process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
    functionName:"getNumEstates",
  })

  const numEstates = Number(estates);

  return (
    
      <main className="flex max-h-screen flex-col items-center justify-between p-24">
          <Hero/>
      </main>
    
  );
}

export default function App(){
  return(<Web3Provider>
    <Home/>
  </Web3Provider>)
}


