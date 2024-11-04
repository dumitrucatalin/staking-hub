// import { http, createConfig } from 'wagmi';
// import { mainnet, sepolia } from 'wagmi/chains';
// import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

// const projectId = '3fbb6bba6f1de962d911bb5b5c9dba88';

// export const config = createConfig({
//     chains: [mainnet, sepolia],
//     transports: {
//         [mainnet.id]: http(),
//         [sepolia.id]: http(),
//     },
//     connectors: [
//         metaMask({
//             dappMetadata: {
//                 name: 'Staking Hub',
//                 url: 'https://staking-hub.com',
//             },
//         }),
//         walletConnect({ projectId }),
//     ],
// });