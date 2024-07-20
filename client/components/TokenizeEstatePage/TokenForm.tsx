"use client";

import { useAccount, useWriteContract } from "wagmi";
import { useState, useEffect } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { FactoryContract } from "@/contracts/FactoryContract";
import ShareBlockLogo from "@/assets/blockShare.png";
import { FileInput, Label } from "flowbite-react";
import Web3 from "web3";

export function TokenForm() {
  const [isClient, setIsClient] = useState(false);
  const { address } = useAccount();
  const { writeContractAsync, writeContract } = useWriteContract();
  const [metadata, setMetadata] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleTokenizeEstate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData();
      if (selectedFile) {
        data.append("file", selectedFile);
        const pinataMetadata = JSON.stringify({ name: selectedFile.name });
        data.append("pinataMetadata", pinataMetadata);
        const pinataOptions = JSON.stringify({ cidVersion: 0 });
        data.append("pinataOptions", pinataOptions);
        const res = await fetch("/api/files", { method: "POST", body: data });
        const resData = await res.json();
        console.log(resData.IpfsHash);
      
        await writeContractAsync({
          abi: FactoryContract.abi,
          address: process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
          functionName: 'tokenizeEstate',
          args: [resData.IpfsHash, Web3.utils.toWei(evaluation, "ether")],
        });

      } else {
        throw new Error("No file selected");
      }
    } catch (e) {
      console.log(e);
      alert("There was an error");
      return;
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="ShareBlock Logo"
            src={ShareBlockLogo.src}
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Your Real Estate Token!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleTokenizeEstate} className="space-y-6">
            <div id="fileUpload" className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                id="file"
                helperText="A profile picture is useful to confirm."
                onChange={(e) => setSelectedFile(e.target.files?.[0])}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="evaluation" className="block text-sm font-medium leading-6 text-gray-900">
                  Token Evaluation (in tCORE)
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Learn about tCORE
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="evaluation"
                  name="evaluation"
                  type="text"
                  required
                  onChange={(e) => setEvaluation(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Estate Token
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <span className="text-center flex flex-row items-center justify-center">
              Connected Wallet Address <HiArrowUpRight />{' '}
            </span>
            {isClient ? (
              <a href={`https://scan.test.btcs.network/address/${address}`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                {address}
              </a>
            ) : null}
          </p>
        </div>
      </div>
    </>
  );
}
