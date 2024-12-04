import { Quicksand } from 'next/font/google'
import './globals.css'
import ClientWrapper from '@/components/ClientWrapper'

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${quicksand.className}`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  )
}
