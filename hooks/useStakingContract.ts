import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "ethers";
import { useEffect, useRef } from "react";
import StakingContractABI from "../contracts/StakingContractABI.json";
import { toast } from "sonner";

const STAKING_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as `0x${string}`;
const STAKING_TOKEN_CONTRACT_FUNCTIONS = {
    stake: "stake",
    getStakes: "getStakes",
    unstake: "unstake",
} as const;

const notificationIdStake = "stake-tokens-notification-id";
const notificationIdUnstake = "unstake-tokens-notification-id";

export function useStakingContract() {
    const { address } = useAccount();
    const { writeContract, isSuccess, isError, isPending, error } = useWriteContract();
    const stakedAmountRef = useRef<number>(0);
    const unstakeIndexRef = useRef<number | null>(null);

    const getStakesQuery = useReadContract({
        abi: StakingContractABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: STAKING_TOKEN_CONTRACT_FUNCTIONS.getStakes,
        args: [address],
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        query: { refetchInterval: 2000 },
    });

    const errorMessage = (error?.cause as any)?.details || "Staking contract operation failed";

    const stakeMutation = (amount: number, lockPeriodSeconds: number) => {
        stakedAmountRef.current = amount;
        writeContract({
            abi: StakingContractABI,
            address: STAKING_CONTRACT_ADDRESS,
            functionName: STAKING_TOKEN_CONTRACT_FUNCTIONS.stake,
            args: [parseEther(amount.toString()), lockPeriodSeconds],
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        });
    };

    const unstakeMutation = (index: number) => {
        unstakeIndexRef.current = index;
        writeContract({
            abi: StakingContractABI,
            address: STAKING_CONTRACT_ADDRESS,
            functionName: STAKING_TOKEN_CONTRACT_FUNCTIONS.unstake,
            args: [index],
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        });
    };

    // Toast for pending staking action
    useEffect(() => {
        if (isPending && stakedAmountRef.current) {
            toast.loading(`Staking ${stakedAmountRef.current} tokens...`, {
                id: notificationIdStake,
            });
        }
    }, [isPending]);

    // Toast for successful staking action
    useEffect(() => {
        if (isSuccess && stakedAmountRef.current) {
            toast.dismiss(notificationIdStake);
            toast.success(`Successfully staked ${stakedAmountRef.current} tokens`);
            stakedAmountRef.current = 0; // reset after success
        }
    }, [isSuccess]);

    // Toast for pending unstaking action
    useEffect(() => {
        if (isPending && unstakeIndexRef.current !== null) {
            toast.loading(`Unstaking...`, { id: notificationIdUnstake });
        }
    }, [isPending]);

    // Toast for successful unstaking action
    useEffect(() => {
        if (isSuccess && unstakeIndexRef.current !== null) {
            toast.dismiss(notificationIdUnstake);
            toast.success(`Successfully unstaked from position ${unstakeIndexRef.current}`);
            unstakeIndexRef.current = null; // reset after success
        }
    }, [isSuccess]);

    // Toast for errors
    useEffect(() => {
        if (isError) {
            const currentAction = stakedAmountRef.current ? "staking" : "unstaking";
            toast.error(`Error ${currentAction}: ${errorMessage}`, {
                id: currentAction === "staking" ? notificationIdStake : notificationIdUnstake,
            });
        }
    }, [isError]);

    return {
        getStakesQuery,
        stakeMutation,
        unstakeMutation,
        isPending,
    };
}