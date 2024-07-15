import React, { ReactNode } from "react";

import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config, queryClient } from '@/chainConfig/createConfig';
import { ConnectKitProvider } from 'connectkit';

interface Props {
    children?: ReactNode
}

export const Web3Provider = ({ children, ...props }: Props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};