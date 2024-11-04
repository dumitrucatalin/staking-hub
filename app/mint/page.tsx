"use client";
import Banner from "@/components/Banner";
import { useState } from "react";
import Link from "next/link";
import { useTokenContract } from "@/hooks/useTokenContract";
import { toast } from "sonner";

const MintPage = () => {
  const { mintMutation, balanceOfRef, getBalanceOfQuery, isPending } =
    useTokenContract();
  const [mintAmount, setMintAmount] = useState<number>(1);

  const handleMint = () => {
    mintMutation(mintAmount);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br p-6">
      <Banner
        title="Mint Some Test Tokens"
        description="Need them for testing the staking contract"
      />
      <div className="mt-6 w-full max-w-md">
        <label className="mb-2 block text-sm">
          Current tokens: {balanceOfRef.current.toLocaleString()}
        </label>
        <label className="mb-2 block text-sm">Token Amount to Mint</label>
        <input
          type="number"
          value={mintAmount}
          onChange={(e) => setMintAmount(Number(e.target.value))}
          className="w-full rounded border border-gray-300 p-2 text-gray-800"
          placeholder="Enter amount"
        />
        <button
          onClick={handleMint}
          className={`mt-2 min-h-[20px] rounded px-4 py-2 text-white 
                        ${
                          !isPending && mintAmount > 0
                            ? "bg-gradient-to-r"
                            : "cursor-not-allowed bg-gradient-to-r-disabled"
                        }`}
          disabled={isPending || mintAmount <= 0}
        >
          {isPending ? (
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>Minting...</span>
            </div>
          ) : (
            "Mint Tokens"
          )}
        </button>
      </div>
      <div className="mt-6 text-center text-white">
        <p>
          Enough tokens?{" "}
          <Link href="/staking" className="text-blue-400 hover:underline">
            Go to the staking page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MintPage;
