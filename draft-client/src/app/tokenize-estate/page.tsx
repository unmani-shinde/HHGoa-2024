"use client"
import { Web3Provider } from "@/providers/Web3Provider";
import { useAccount } from "wagmi"
import { TokenForm } from '@/components/TokenizationForm';

export function Tokenization() {
  const { isConnected, address, isConnecting } = useAccount();
  

  return (
    <>
      {isConnecting ? (
        <p>Connecting...</p>
      ) : isConnected ? (
        <TokenForm />
      ) : (
        <p>Not Connected</p>
      )}
    </>
  );
}

export default function Page() {
    return(
        <Web3Provider>
            <Tokenization />
        </Web3Provider>
    )
    
}