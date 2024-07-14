import { WagmiProvider, createConfig, http } from "wagmi";
import { core } from "../chains/customChains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [core],
    transports: {
      // RPC URL for each chain
      [core.id]: http(
        core.rpcUrls.default,
      ),
    },

    walletConnectProjectId: 'a9fdc841635ffa2c5fe7d18174a050b7',
    // Required App Info
    appName: "ShareBlock",
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};