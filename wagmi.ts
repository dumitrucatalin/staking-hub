import { defineChain } from "viem";
import { http, createStorage, cookieStorage } from "wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

export const chain = defineChain({
    id: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    name: process.env.NEXT_PUBLIC_CHAIN_NAME || 'unknown',
    nativeCurrency: {
        decimals: Number(process.env.NEXT_PUBLIC_CHAIN_NATIVE_CURRENCY_DECIMALS) || 18,
        name: process.env.NEXT_PUBLIC_CHAIN_NATIVE_CURRENCY_NAME || 'Ethereum',
        symbol: process.env.NEXT_PUBLIC_CHAIN_NATIVE_CURRENCY_SYMBOL || 'ETH',
    },
    rpcUrls: {
        default: {
            http: [process.env.NEXT_PUBLIC_RPC_URL!],
        },
    },
    serializers: undefined,
});

const metadata = {
    name: "Staking Hub",
    description: "Staking Hub. A platform for staking tokens.",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = defaultWagmiConfig({
    chains: [chain],
    ssr: true,
    transports: {
        [chain.id]: http(chain.rpcUrls.default.http[0]),
    },
    metadata,
    storage: createStorage({
        storage: cookieStorage,
    }),
    enableWalletConnect: true,
    enableInjected: true,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3fbb6bba6f1de962d911bb5b5c9dba88",
});

declare module "wagmi" {
    interface Register {
        config: typeof wagmiConfig;
    }
}
