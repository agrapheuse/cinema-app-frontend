'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Profile(): JSX.Element {
  const router = useRouter()
  const { data: session } = useSession()

  const logOut = (): void => {
    signOut()
    router.push('/')
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        onClick={logOut}
      >
        Sign Out
      </button>
    </div>
  )
}
