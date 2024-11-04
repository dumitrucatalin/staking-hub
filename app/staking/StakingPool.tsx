"use client";
import { useStakingContract } from "@/hooks/useStakingContract";
import { useTokenContract } from "@/hooks/useTokenContract";
import React, { useState } from "react";
import { formatUnits } from "viem";

const StakingPool = () => {
  const [amount, setAmount] = useState(1);
  const [selectedLockPeriod, setSelectedLockPeriod] = useState(60); // Default to 1 minute in seconds
  const { getAllowanceQuery, approveMutation, getBalanceOfQuery, isPending } =
    useTokenContract();
  const {
    stakeMutation,
    isPending: stakingPending,
    getStakesQuery,
    unstakeMutation,
  } = useStakingContract();

  const balance =
    getBalanceOfQuery.data && typeof getBalanceOfQuery.data === "bigint"
      ? Number(formatUnits(getBalanceOfQuery.data, 18))
      : 0;

  const allowance =
    getAllowanceQuery.data && typeof getAllowanceQuery.data === "bigint"
      ? Number(formatUnits(getAllowanceQuery.data, 18))
      : 0;

  const handleStake = async () => {
    stakeMutation(amount, selectedLockPeriod); // Lock period in seconds
  };

  const handleApprove = async () => {
    approveMutation(amount);
  };

  const handleUnstake = async (index: number) => {
    unstakeMutation(index);
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

  const now = Date.now() / 1000; // Convert to seconds for comparison

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center rounded-lg border border-white border-opacity-20 bg-white bg-opacity-5 p-6 text-white shadow-md">
      <h2 className="mb-2 text-2xl font-bold">Token Staking Pool</h2>

      <div className="mt-6 w-full">
        <h3 className="mb-4 text-xl">Your Stakes</h3>
        {getStakesQuery.data && (getStakesQuery.data as []).length > 0 ? (
          (getStakesQuery.data as []).map(
            (stake: { amount: bigint; unlockTime: number }, index: number) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-500 p-2"
              >
                <div>
                  <p>Amount: {formatUnits(stake.amount, 18)} Tokens</p>
                  <p>
                    Unlock Time:{" "}
                    {new Date(Number(stake.unlockTime) * 1000).toLocaleString()}
                  </p>
                </div>
                <button
                  key={index}
                  className={`m-2 min-h-[20px] rounded px-4 py-2 text-white 
                                    ${
                                      stake.unlockTime <= now &&
                                      Number(stake.amount) > 0
                                        ? "bg-gradient-to-r "
                                        : "cursor-not-allowed bg-gradient-to-r-disabled"
                                    }`}
                  onClick={() => handleUnstake(index)}
                  disabled={
                    stake.unlockTime > now || Number(stake.amount) === 0
                  }
                >
                  {stake.unlockTime <= now && stake.amount > 0
                    ? "Unstake"
                    : "Locked"}
                </button>
              </div>
            )
          )
        ) : (
          <p>No stakes available.</p>
        )}
      </div>

      <div className="mt-6 w-full">
        <label className="text-gray-400">Amount to stake</label>
        <div className="mt-1 flex items-center rounded border border-gray-300">
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            className="flex-grow px-3 py-2 text-black outline-none"
            placeholder="0"
          />
          <span className="px-3">Token</span>
        </div>

        <div className="mt-2 flex justify-between text-yellow-400">
          <button onClick={() => handleAmountChange(balance * 0.25)}>
            25%
          </button>
          <button onClick={() => handleAmountChange(balance * 0.5)}>50%</button>
          <button onClick={() => handleAmountChange(balance * 0.75)}>
            75%
          </button>
          <button onClick={() => handleAmountChange(balance)}>Max</button>
        </div>

        <label className="mt-4 text-gray-400">Select Lock Period</label>
        <select
          value={selectedLockPeriod}
          onChange={(e) => setSelectedLockPeriod(Number(e.target.value))}
          className="mt-2 w-full rounded border border-gray-300 p-2 text-gray-800"
        >
          <option value={60}>1 Minute</option>
          <option value={1800}>30 Minutes</option>
          <option value={86400}>24 Hours</option>
        </select>

        <p className="mt-2 text-gray-400">
          Balance: {balance.toLocaleString()} Token
        </p>
        <p className="mt-2 text-gray-400">
          Current allowance: {allowance.toLocaleString()} Token
        </p>

        <button
          className={`min-h-[20px] rounded px-4 py-2 text-white 
                    ${
                      allowance > 0
                        ? "bg-gradient-to-r"
                        : "cursor-not-allowed bg-gradient-to-r-disabled"
                    }`}
          disabled={amount <= 0 || isPending || stakingPending}
          onClick={allowance > 0 ? handleStake : handleApprove}
        >
          {allowance > 0 ? "Stake Token" : "Approve Token"}
        </button>
      </div>
    </div>
  );
};

export default StakingPool;
