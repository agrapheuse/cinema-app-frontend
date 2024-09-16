"use client";

import { QueryClient, QueryClientProvider } from 'react-query';
import CountryContextProvider from "@/contexts/CountryContextProvider";

const queryClient = new QueryClient();

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CountryContextProvider>
        {children}
      </CountryContextProvider>
    </QueryClientProvider>
  );
}
