'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import SettingsContextProvider from '@/contexts/SettingsContextProvider'

const queryClient = new QueryClient()

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsContextProvider>{children}</SettingsContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
