"use client"
import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi"


export default function Hero() {
    const { address, isConnected } = useAccount()
    return(
        

<section className="mt-12 bg-white dark:bg-gray-900 flex flex-col justify-center items-center justify-between">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Elementary, my dear investor: Fractional ownership with ShareBlock.</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">ShareBlock leverages innovative blockchain technology to unlock the long-term value proposition of real estate.  By facilitating fractional ownership, we democratize access to this asset class, driving economic growth and portfolio diversification for a wider investor base.</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <ConnectKitButton/>
            <a href="#" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70">
                {isConnected?"Let's Create Your Token!":"Learn More"}
            </a>  
        </div>
    </div>
</section>

    )
    
}