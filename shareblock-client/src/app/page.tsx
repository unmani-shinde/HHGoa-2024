"use client"
import { Web3Provider } from "@/providers/Web3Provider";

export function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h1>HEllo</h1>
    </main>
  );
}

export default function App() {
  <Web3Provider>
    <Home/>
  </Web3Provider>
  
}
