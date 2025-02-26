import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WEB3AUTH_NETWORK, CHAIN_NAMESPACES } from "@web3auth/base";
import { WEB3AUTH_PROVIDER_CLIENT_ID } from "./constants";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaef3", // hex of 44787, celo testnet
  rpcTarget: `https://celo-alfajores.infura.io/v3/${
    import.meta.env.VITE_INFURA_PROKJECT_ID
  }`,
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Celo Testnet",
  blockExplorerUrl: "https://alfajores-blockscout.celo-testnet.org",
  ticker: "CELO",
  tickerName: "CELO",
  logo: "https://cryptologos.cc/logos/celo-celo-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig },
});

export const web3auth = new Web3Auth({
  // Get it from Web3Auth Dashboard
  clientId: WEB3AUTH_PROVIDER_CLIENT_ID || "",
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});
