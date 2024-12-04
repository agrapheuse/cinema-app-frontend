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

  // If session data is not available, show loading or redirect to login
  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{session.user?.name}</h1>
          <p className="text-gray-600">{session.user?.email}</p>
        </div>
      </div>
      <button
        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        onClick={logOut}
      >
        Sign Out
      </button>
    </div>
  )
}
