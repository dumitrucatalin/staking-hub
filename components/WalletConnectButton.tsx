import { useWeb3Modal } from "@web3modal/wagmi/react";

export const WalletConnectButton = () => {
    const { open } = useWeb3Modal();

    return (
        <button
            className="w-full bg-[#282828] text-white py-2 rounded-lg mb-4 flex items-center justify-center space-x-2"
            onClick={() => open()}
        >
            Connect Wallet
        </button>
    );
};
