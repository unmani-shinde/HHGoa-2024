import {createConfig, http } from "wagmi";
import { core } from "../chains/customChains";
import { QueryClient} from "@tanstack/react-query";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [core],
    transports: {
      [core.id]: http(),
    },
    walletConnectProjectId: 'a9fdc841635ffa2c5fe7d18174a050b7',
    // Required App Info
    appName: "ShareBlock",
  }),
);

export const queryClient = new QueryClient();