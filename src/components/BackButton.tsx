"use client";

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      Back
    </button>
  );
};

export default BackButton;
