'use client';
import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from '@privy-io/wagmi';
import React from 'react';
import { wagmiConfig } from '../config/wagmi';
import { LocalWalletProvider } from './LocalWalletProvider';


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LocalWalletProvider>
            <PrivyProvider
                appId={import.meta.env.VITE_PUBLIC_PRIVY_APP_ID ?? ""}
                config={{
                    loginMethods: ['wallet'],
                    appearance: {
                        theme: 'dark',
                        accentColor: '#fe0000',
                    },
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <WagmiProvider config={wagmiConfig}>
                        {children}
                    </WagmiProvider>
                </QueryClientProvider>
            </PrivyProvider>
        </LocalWalletProvider>
    );
}