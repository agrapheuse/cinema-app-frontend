'use client'

import { useRouter } from 'next/navigation'

const BackButton = (): JSX.Element => {
  const router = useRouter()

  return <button onClick={() => router.back()}>Back</button>
}

export default BackButton
