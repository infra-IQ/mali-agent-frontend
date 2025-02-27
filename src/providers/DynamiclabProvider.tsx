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
