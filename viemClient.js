import { createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';

const client = createWalletClient({
  account: await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => accounts[0]),
  chain: sepolia,
  transport: custom(window.ethereum),
});

export default client;
