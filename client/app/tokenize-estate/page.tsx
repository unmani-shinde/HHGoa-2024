"use client"
import Fancy from "@/components/Fancy"
import { TokenForm } from "@/components/TokenizeEstatePage/TokenForm"
import { Web3Provider } from "@/utils/providers/Web3Provider"

export default function App() {
    return(
        <Web3Provider>
            <Fancy/>
            <TokenForm/>
        </Web3Provider>
        
    )   
}