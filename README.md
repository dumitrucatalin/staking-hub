# Staking Hub

Staking Hub is a proof-of-concept web application for ERC20 token staking and locking on Ethereum-compatible blockchains. Designed as an experimental project, this app allows users to stake tokens for predefined time periods. Staking Hub includes two Solidity contracts:

1. **TestToken**: An ERC20 token contract for minting test tokens.

`https://sepolia.etherscan.io/address/0x70B55b605A22C7EEEd9665F5b6a71070Ec490D1d`

2. **StakingContract**: A staking contract that enables users to lock tokens for different durations and retrieve them after the lock period ends.

`https://sepolia.etherscan.io/address/0x2EEe18a40aB6DA8F523515D7eaa884AF5A7aB051`

3. Smart contracts can be found at [Staking and Token Contract Git](https://github.com/dumitrucatalin/staking-token-contract)

## Features

- **Multiple Stakes**: Users can create multiple stakes with varying lock periods.
- **Token Minting**: Users can mint up to 100 test tokens for self-use; the owner can mint unlimited tokens.
- **Decentralized**: Contracts are deployed on an Ethereum-compatible network.

## Tech Stack

- **Frontend**: React + Next.js
- **Backend**: Solidity (Smart Contracts)
- **Tools**: Ethers.js for blockchain interaction, Hardhat for contract deployment and testing.

## Setup

### Prerequisites

- Node.js
- Yarn or NPM

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/dumitrucatalin/staking-hub.git
