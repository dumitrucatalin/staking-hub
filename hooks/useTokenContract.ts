import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "ethers";
import { useEffect, useRef } from "react";
import TokenContractABI from "../contracts/TokenContractABI.json";
import { toast } from "sonner";
import { formatUnits } from "viem";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;
const STAKING_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as `0x${string}`;

const TOKEN_CONTRACT_FUNCTIONS = {
    mint: "mint",
    allowance: "allowance",
    balanceOf: "balanceOf",
    approve: "approve",
} as const;

const notificationId = "mint-tokens-notification-id";

export function useTokenContract() {
    const { address } = useAccount();
    const { writeContract, isSuccess, isError, isPending, error } = useWriteContract();
    const mintedAmountRef = useRef<number>(0);
    const balanceOfRef = useRef<number>(0);
    const allowanceRef = useRef<number>(0);

    const getAllowanceQuery = useReadContract({
        abi: TokenContractABI,
        address: CONTRACT_ADDRESS,
        functionName: TOKEN_CONTRACT_FUNCTIONS.allowance,
        args: [address, STAKING_CONTRACT_ADDRESS],
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        query: {
            refetchInterval: 2000,
        },
    });

    const getBalanceOfQuery = useReadContract({
        abi: TokenContractABI,
        address: CONTRACT_ADDRESS,
        functionName: TOKEN_CONTRACT_FUNCTIONS.balanceOf,
        args: [address],
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        query: {
            refetchInterval: 2000,
        },
    });

    const errorMessage =
        (error?.cause as any)?.details || "Token contract operation failed";

    const mintMutation = (amount: number) => {
        mintedAmountRef.current = amount;
        writeContract({
            abi: TokenContractABI,
            address: CONTRACT_ADDRESS,
            functionName: TOKEN_CONTRACT_FUNCTIONS.mint,
            args: [parseEther(amount.toString())],
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        });
    };

    const approveMutation = (amount: number) => {
        writeContract({
            abi: TokenContractABI,
            address: CONTRACT_ADDRESS,
            functionName: TOKEN_CONTRACT_FUNCTIONS.approve,
            args: [STAKING_CONTRACT_ADDRESS, parseEther(amount.toString())],
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        });
    };

    useEffect(() => {
        if (isPending) {
            toast.loading(`Minting ${mintedAmountRef.current} tokens`, {
                id: notificationId,
            });
        }
    }, [isPending]);

    useEffect(() => {
        if (isSuccess) {
            toast.dismiss(notificationId);
            toast.success(`Minted ${mintedAmountRef.current} tokens successfully`);
            mintedAmountRef.current = 0;
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.dismiss(notificationId);
            toast.error(`Minting error: ${errorMessage}`, {
                id: notificationId,
            });
        }
    }, [isError]);

    useEffect(() => {
        const balance = getBalanceOfQuery.data && typeof getBalanceOfQuery.data === "bigint"
            ? Number(formatUnits(getBalanceOfQuery.data, 18))
            : 0;
        balanceOfRef.current = balance;

        const allowance = getAllowanceQuery.data && typeof getAllowanceQuery.data === "bigint"
            ? Number(formatUnits(getAllowanceQuery.data, 18))
            : 0;
        allowanceRef.current = allowance;
    }, [getBalanceOfQuery.data, getAllowanceQuery.data]);

    return {
        getAllowanceQuery,
        balanceOfRef,
        mintMutation,
        isPending,
        getBalanceOfQuery,
        approveMutation,
    };
}