'use client'

import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { useState,useEffect } from 'react';
import Fancy from '../Fancy';

export default function Hero() {

    const { isConnected } = useAccount();
    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

    return(<div className="relative isolate px-6 pt-14 lg:px-8">
        <Fancy/>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-24">
          
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Elementary, my dear investor: Fractional ownership.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            ShareBlock leverages innovative blockchain technology to unlock the long-term value proposition of real estate.  By facilitating fractional ownership, we democratize access to this asset class, driving economic growth and portfolio diversification for a wider investor base.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ConnectKitButton/>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                {isConnected && isClient?"Create My First Token!":"Learn more"} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>)
}