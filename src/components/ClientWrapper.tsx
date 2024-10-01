'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import SettingsContextProvider from '@/contexts/SettingsContextProvider'

const queryClient = new QueryClient()

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsContextProvider>{children}</SettingsContextProvider>
    </QueryClientProvider>
  )
}
