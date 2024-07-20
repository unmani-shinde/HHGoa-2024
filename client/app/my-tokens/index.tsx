"use client"

import { Button, Modal,Table } from "flowbite-react";
import React,{ useState } from "react";
import { FactoryContract } from '@/contracts/FactoryContract';
import { AuctionContract } from '@/contracts/AuctionContract';
import { useReadContract, useWriteContract,useReadContracts,useAccount,useDeployContract } from "wagmi";
import { EstateBidActionProps,EstateActionProps, EstateInvestActionProps  } from "@/utils/types/Estate"
import Web3 from "web3"
import { InvestmentContract } from "@/contracts/InvestmentContract";





export const ListForAuctionButton = ({ estateID }:EstateActionProps) => {
  
    const { writeContract} = useWriteContract();
  
    const handleButtonClick = async () => {
      try {
        writeContract({
          abi: FactoryContract.abi,
          address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
          functionName: 'listEstateForAuction',
          args: [estateID],
        });
      } catch (error) {
        console.error('Transaction failed', error);
      }
    };
  
    return (
      <button
        onClick={handleButtonClick}
        className="rounded-lg md:mb-2 sm:mb-2 mb-2 bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
      >
        List for Auction
      </button>
    );
  };

export const ListForInvestmentButton = ({ estateID }:EstateActionProps) => {

const { writeContract,writeContractAsync } = useWriteContract();

const handleButtonClick = async () => {
  console.log(estateID);
  
    try {
    writeContractAsync({
        abi: FactoryContract.abi,
        address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'listEstateForInvestment',
        args: [estateID],
    });    
    } catch (error) {
    console.error('Transaction failed', error);
    }
};

return (
    <button
    onClick={handleButtonClick}
    className="rounded-lg md:mb-2 sm:mb-2 mb-2 bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
    >
    List for Investment
    </button>
);
};

export const PlaceBidButton = ({ estateID,bid }:EstateBidActionProps) =>{

    const { writeContract} = useWriteContract();

    const { data:listingAddress } = useReadContract({
        abi:FactoryContract.abi,
        address:process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
        functionName:'getEstateAuctionListing',
        args:[estateID]
    })

    const handleButtonClick = async () => {
        try {
        writeContract({
            abi: AuctionContract.abi,
            address: listingAddress as `0x${string}`,
            functionName: 'placeBid',
            args: [Number(Web3.utils.toWei(bid,'ether'))],
            value:BigInt(Web3.utils.toWei(bid,'ether'))
        });
        } catch (error) {
        console.error('Transaction failed', error);
        }
    };

    return (
      <button
      onClick={handleButtonClick}
      className="rounded-lg md:mb-2 sm:mb-2 mb-2 bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
      >
      Place Bid
      </button>
  );

}

export const PurchaseSharesButton = ({ estateID,sharesCount}:EstateInvestActionProps) =>{

  const { writeContract,writeContractAsync} = useWriteContract();

  
  const { data:listingAddress } = useReadContract({
      abi:FactoryContract.abi,
      address:process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
      functionName:'getEstateInvestmentListing',
      args:[estateID]
  })

  const { data:investmentData } = useReadContract({
    abi:InvestmentContract.abi,
    address:listingAddress as `0x${string}`,
    functionName:'getInvestmentDetails',
    args:[]
})

  const estateEvaluation = Number(investmentData?.[1]);
  const valuePerToken = estateEvaluation/100;
  const shareInvestment = valuePerToken*sharesCount;
  console.log(Web3.utils.fromWei(shareInvestment.toString(),"ether"));
  

  const handleButtonClick = async () => {
      try {
      await writeContractAsync({
          abi: InvestmentContract.abi,
          address: listingAddress as `0x${string}`,
          functionName: 'purchaseShares',
          args: [BigInt(sharesCount)],
          value:BigInt(Number(shareInvestment))
      });
      } catch (error) {
      console.error('Transaction failed', error);
      }
  };

  return (
    <button
    onClick={handleButtonClick}
    className="rounded-lg md:mb-2 sm:mb-2 mb-2 bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
    >
    Purchase Shares
    </button>
);

}

export const AuctionDetailsDisplayButton = ({ estateID }:EstateActionProps) =>{
    
  const [openModal, setOpenModal] = useState(false);
  const account = useAccount();
  const {writeContract,writeContractAsync} = useWriteContract();
  const [colourReveal, setColourReveal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')

  const { data:listingAddress } = useReadContract({
      abi:FactoryContract.abi,
      address:process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
      functionName:'getEstateAuctionListing',
      args:[estateID]
  })

  const {data:auctionData} = useReadContract({
    abi: AuctionContract.abi,
    address: listingAddress as `0x${string}`,
    functionName: 'getAuctionDetails'
  })
  const address = auctionData?.[3];

  const {data:allBiddersAddresses} = useReadContract({
    abi: AuctionContract.abi,
    address: listingAddress as `0x${string}`,
    functionName: 'getAllBidders'
  })

  const contractCalls = Array.from({ length: allBiddersAddresses?.length }).map(
    (_, index) => ({
        abi: AuctionContract.abi,
        address: listingAddress as `0x${string}`,
        functionName: "getBidDetails",
        args: [allBiddersAddresses[index]],
    })
);

const { data: bids, isLoading: bidsLoading } = useReadContracts({
    contracts: contractCalls
});

  const { data:winnerAddress } = useReadContract({
  abi: AuctionContract.abi,
    address: listingAddress as `0x${string}`,
    functionName: 'declareWinner'

})

  const handleButtonClick = async () => {
    if(winnerAddress== account.address){
      console.log("Hi this ");
      
      try {

        await writeContractAsync({
          abi: AuctionContract.abi,
          address: listingAddress as `0x${string}`,
          functionName: 'claimPrize',
          args:[]
        })  
        
        // writeContract({
        //   abi: FactoryContract.abi,
        //   address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x{string}`,
        //   functionName: 'updateOwner',
        //   args:[estateID,account.address]
        // })
        
      } catch (error) {
        console.error("There was an error",error)
      }
    }
    else{
      try {
        writeContract({
          abi: AuctionContract.abi,
          address: listingAddress as `0x${string}`,
          functionName: 'withdrawMyFunds'
        })
        
      } catch (error) {
        console.error('Transaction failed', error)
        
      }
    }
      
  };

  

  return (
    <>
      <button
    onClick={()=>{setOpenModal(true)}}
    className="rounded-lg md:mb-2 sm:mb-2 mb-2 bg-fuchsia-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
    >
    View Details
    </button>
    <Modal
    show={openModal}
    position={modalPlacement}
    onClose={() => setOpenModal(false)}
  >
    <Modal.Header><p className="font-semibold">Auction Details</p></Modal.Header>
    <Modal.Body>
      <div className="flex flex-col">
        <p><b><a href={`https://scan.test.btcs.network/address/${listingAddress}`}>Auction Contract</a>: </b>{listingAddress}</p>
        <p className="mb-2"><b><a href={`https://scan.test.btcs.network/address/${address}`}>Current Owner</a>: </b>{auctionData?.[3]}</p>
        <hr></hr>
        <p className="mt-4"><b>Estate Token ID: </b>#{Number(auctionData?.[0])}</p>
        <p className="mb-2"><b>Estate Token Evaluation: </b>{Web3.utils.fromWei((auctionData?.[1] || "0").toString(), "ether")} tCORE</p>

        <hr></hr>
        <p className="mt-4 mb-2"><b>Bidders List: </b></p>

      </div>
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Bidder Address</Table.HeadCell>
          <Table.HeadCell>Bid Price (tCORE)</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          
        {bids?.map((bid, index) => {
          const bidAmount = Web3.utils.fromWei(bid.result.toString(), "ether");
          if (bidAmount !== "0.") {
            return (
              <Table.Row key={index} className={`${allBiddersAddresses[index] === winnerAddress && colourReveal ? "bg-green-300" : "bg-white"} dark:border-gray-700 dark:bg-gray-800`}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {allBiddersAddresses[index]}
                </Table.Cell>
                <Table.Cell>
                  {bidAmount}
                </Table.Cell>
              </Table.Row>
            );
          }
          return null; // Return null if the condition is not met
        })}
         
         
        </Table.Body>
      </Table>
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button color="purple" onClick={() => setColourReveal(true)}>Get Auction Winner</Button>
      {colourReveal && (
        <>
          <Button onClick={handleButtonClick} color="gray">{
          winnerAddress==account.address?"Claim My Prize":"Withdraw my Funds"}</Button>
        </>
      )}
    </Modal.Footer>
  </Modal>
    
    </>
);

}

