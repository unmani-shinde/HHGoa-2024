'use client'

import CardComponent from "@/components/MyTokens/TokenCard";
import Fancy from "@/components/Fancy";
import { Web3Provider } from "@/utils/providers/Web3Provider";
import { InPageNavbar } from "@/components/MyTokens/InPageNavBar";
export default function App() {
    return(
        <Web3Provider>
            <Fancy/>
            <InPageNavbar/>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
            <CardComponent/>
            </div>
           
        </Web3Provider>
        
    )   
}