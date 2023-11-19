"use client"
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

import { publicProvider } from 'wagmi/providers/public'


import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { gnosis, gnosisChiado, goerli, sepolia } from 'viem/chains'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, gnosis, goerli, sepolia, gnosisChiado],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '0c4e3fcc4a5662ee89d53445b7bd7beb',
      },
    }),
  ],
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})

export default function WagmiProvider({children}:any) {
  return (
    <WagmiConfig config={config}>
        {children}
    </WagmiConfig>
  )
}


