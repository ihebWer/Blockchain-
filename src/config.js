import { createConfig } from 'wagmi';
import { mainnet, sepolia } from 'viem/chains';
import { publicProvider } from 'viem';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const { chains, provider } = createConfig({
  autoConnect: true,
  appName: 'Hello Web3 dApp',
  projectId: 'your_project_id',
  chains: [mainnet, sepolia],
  providers: [publicProvider()],
});

const { connectors } = getDefaultWallets({
  appName: 'Hello Web3 dApp',
  chains,
});

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  provider,
});
