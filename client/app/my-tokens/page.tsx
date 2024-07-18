'use client'

import CardComponent from "@/components/MyTokens/TokenCard";
import Fancy from "@/components/Fancy";
import { Web3Provider } from "@/utils/providers/Web3Provider";
import { useAccount } from "wagmi";
import { useState,useEffect } from "react";
import { FactoryContract } from "@/contracts/FactoryContract";
import { InPageNavbar } from "@/components/MyTokens/InPageNavBar";
import { useReadContract } from "wagmi";

interface Estate{
  estateID: Number;
  estateOwner: String;
  estateEvaluation: Number;
  estateMetadata: String;
}



export function MyTokens() {
    const {isConnected,isConnecting} = useAccount();
    const [isClient, setIsClient] = useState(false)
    const [estatesArray, setEstatesArray] = useState<Estate[]>([]);

    useEffect(() => {
      setIsClient(true)
    }, [])

    const { data: estates } = useReadContract({
      abi:FactoryContract.abi,
      address:process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
      functionName:"getNumEstates",
    })

    const numEstates = Number(estates)-1;

    const handleFunction = (estateID:Number) =>{
      const { data: estate } = useReadContract({
        abi:FactoryContract.abi,
        address:process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
        functionName:"getEstateListing",
        args:[Number(estateID)]
      })

      return estate;
    }

    for (let index = 1; index < numEstates; index++) {
      const element = handleFunction(index);
      console.log(element);
    }
    
    
    
  return(
    <>
         <Fancy/>
            <div className="grid min-h-full grid-cols-4 gap-1  py-20 ">
      <div className="col-span-1 px-6 lg:px-8">
        <InPageNavbar />
      </div>

      <div className="col-span-3 px-6 lg:px-8 pt-8">

            {isConnected && isClient && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: numEstates }).map((_, index) => (
            <CardComponent estateID={index+1} key={index} />
          ))}
        </div>)}

        {isClient && !(isConnected) && !(isConnecting) && (
        <div className="flex justify-center items-center min-h-screen">
        <div style={{marginTop:"-10vh"}} className="text-center flex flex-col justify-center items-center">
          <h1 className="text-center text-xl">Nothing to see, yet.<br></br> Please connect your wallet to continue!</h1>
        </div>
      </div>
      
       


) }


        
      </div>
      </div>
    
           
        
    
    
    </>
  )


}
export default function Layout() {
    return(
        <Web3Provider>
            <MyTokens/>
        </Web3Provider>
    )
    
}