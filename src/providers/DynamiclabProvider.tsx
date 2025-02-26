import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { celoAlfajores } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ReactNode } from "react";

const config = createConfig({
  chains: [celoAlfajores],
  multiInjectedProviderDiscovery: false,
  transports: {
    [celoAlfajores.id]: http(),
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
              name: "Celo Alfajores",
              chainId: celoAlfajores.id,
              networkId: celoAlfajores.id,
              nativeCurrency: {
                name: "Celo Gold",
                symbol: "CELO",
                decimals: 18,
              },
              rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
              iconUrls: [
                "https://styles.redditmedia.com/t5_i05sx/styles/communityIcon_fd5nh4eyi5ya1.png",
              ],
              blockExplorerUrls: ["https://alfajores.celoscan.io/"],
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
