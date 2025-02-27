import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ReactNode } from "react";

const config = createConfig({
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function DynamicLabProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: import.meta.env.VITE_DYNAMIC_LAB_ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: [
            {
              name: sepolia.name,
              chainId: sepolia.id,
              networkId: sepolia.id,
              nativeCurrency: {
                name: sepolia.nativeCurrency.name,
                symbol: sepolia.nativeCurrency.symbol,
                decimals: 18,
              },
              rpcUrls: [sepolia.rpcUrls.default.http[0]],
              iconUrls: [
                "https://imgs.search.brave.com/ASU5HkLJLDzTMaUKqP1JeYiql6OwV7KPAu7my7sO8Kc/rs:fit:40:40:1:0/g:ce/aHR0cHM6Ly9jb2lu/LWltYWdlcy5jb2lu/Z2Vja28uY29tL2Nv/aW5zL2ltYWdlcy8y/NzkvbGFyZ2UvZXRo/ZXJldW0ucG5nPzE2/OTY1MDE2Mjg",
              ],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
