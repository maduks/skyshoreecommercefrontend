'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export const useNavigationTransition = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const navigateWithTransition = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };

  return {
    isPending,
    navigateWithTransition
  };
};
