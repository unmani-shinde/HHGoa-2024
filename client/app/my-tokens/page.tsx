'use client';

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Fancy from "@/components/Fancy";
import { Web3Provider } from "@/utils/providers/Web3Provider";
import { InPageNavbar } from "@/components/MyTokens/InPageNavBar";

export function MyTokens() {
  const { isConnected, isConnecting } = useAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Fancy />
      <div className="grid min-h-full grid-cols-4 py-20">
        <div className="col-span-1 px-6 lg:px-8">
          <InPageNavbar />
        </div>
        <div className="col-span-3 px-6 lg:px-8 pt-8">
          {isConnected && isClient ? (
            <></>
          ) : (
            isClient && !isConnected && !isConnecting && (
              <div className="flex justify-center items-center min-h-screen">
                <div
                  style={{ marginTop: "-10vh" }}
                  className="text-center flex flex-col justify-center items-center"
                >
                  <h1 className="text-center text-xl">
                    Nothing to see, yet.
                    <br />
                    Please connect your wallet to continue!
                  </h1>
                </div>
              </div>
            )
          )}
          {!isConnected && isConnecting && isClient && (<div className="flex justify-center items-center min-h-screen">

            <div
                  style={{ marginTop: "-10vh" }}
                  className="text-center flex flex-col justify-center items-center"
                >
                  <h1 className="text-center text-xl">
                   Loading...
                  </h1>
                </div>

          </div>)}
        </div>
      </div>
    </>
  );
}


export default function MyTokensPage() {

  return(<Web3Provider>
    <MyTokens />
  </Web3Provider>)
  
}


