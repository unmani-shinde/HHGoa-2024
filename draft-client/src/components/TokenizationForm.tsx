"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useWriteContract } from "wagmi";
import { factoryContractABI } from "@/abi/factoryContractABI";
import { useState } from "react";

export function TokenForm() {
  const { writeContract } = useWriteContract();
  const [metadata, setMetadata] = useState("");
  const [evaluation, setEvaluation] = useState("");

  const handleSubmit = async () => {
    try {
      writeContract({
        abi: factoryContractABI,
        address: '0x462706e40BC7aCD2bF1a59D71C624DcD49b6D951',
        functionName: 'tokenizeEstate',
        args: [metadata, evaluation],
      });
      alert("Estate Token has been created successfully!")
      
    } catch (error) {
      console.error("Error creating token:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="flex max-w-md flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <div className="mb-2 block">
            <Label className="text-md" htmlFor="metadata" value="Image Metadata" />
          </div>
          <TextInput
            id="metadata"
            type="text"
            placeholder="metadata"
            required
            shadow
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label className="text-md" htmlFor="evaluation" value="Estate Evaluation (in ETH)" />
          </div>
          <TextInput
            id="evaluation"
            type="number"
            required
            shadow
            value={evaluation}
            onChange={(e) => setEvaluation(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="agree" required />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit">
          Create My Token!
        </Button>
      </form>
    </div>
  );
}
