import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
export default function Hero() {
    const { address, isConnecting, isConnected} = useAccount();
    return(
        <main className="flex flex-col justify-center items-center min-w-full">
        <section className="flex items-center justify-center flex flex-col">
            <div className="mt-7 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 justify-center flex flex-col">
                <h1 className="mb-4 text-4xl font-extrabold tracking-normal leading-none text-red-900 dark:text-red-100 md:text-5xl lg:text-6xl dark:text-white">Elementary, my dear investor: Fractional ownership, with ShareBlock</h1>
                <p className="mb-8 text-lg font-normal text-gray-900 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here at ShareBlock, we leverage innovative blockchain technology to unlock the long-term value proposition of real estate.  By facilitating fractional ownership, we democratize access to this asset className, driving economic growth and portfolio diversification for a wider investor base.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <ConnectKitButton/>
                   

                    <a href="/tokenize-estate" className="py-2 mt-2 px-5 sm:ms-4 text-md font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        {isConnecting?"Connecting...":isConnected?"Let's Get Started!":"Learn More"}
                    </a>
                </div>
            </div>
        </section>
    </main>

       
        )
    
}