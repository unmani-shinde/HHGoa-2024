
"use client "
import { FactoryContract } from "@/contracts/FactoryContract";
import { useReadContracts } from "wagmi";
import { useReadContract } from "wagmi";

const WagmiReads = () => {
    
    const {data:numEstatesN} = useReadContract({
        abi: FactoryContract.abi,
        address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "getNumEstates",
    });

    const numEstates = Number(numEstatesN)-1;

    const contractCalls = Array.from({ length: numEstates }).map(
        (_, index) => ({
            abi: FactoryContract.abi,
            address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "getEstateListing",
            args: [index + 1],
        })
    );

    const { data: estates, isLoading: estatesLoading } = useReadContracts({
        contracts: contractCalls
    });

    return { numEstates, estates };
};

export default WagmiReads;



