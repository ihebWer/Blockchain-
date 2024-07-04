// src/web3.js
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const providerOptions = {
  // Vous pouvez ajouter ici des options de fournisseurs supplémentaires
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // facultatif
  providerOptions, // requis
});

export const connectWallet = async () => {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  return { provider, signer };
};
