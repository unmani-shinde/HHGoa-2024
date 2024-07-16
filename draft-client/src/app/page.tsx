"use client"

import Hero from "@/components/HomePage/Hero";
import { Web3Provider } from "@/providers/Web3Provider";

export function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center justify-between p-24">
      <Hero/>
    </main>
  );
}

export default function App(){
  return(
    <Web3Provider>
      <Home/>
    </Web3Provider>
    
  )

}
