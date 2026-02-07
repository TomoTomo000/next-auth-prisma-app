'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/lib/hooks/snackbar';

export function LogoutButton() {
  const router = useRouter();
  const snackbar = useSnackbar();

  const onLogout = async () => {
    await signOut({ redirect: false });
    snackbar.success('ログアウトしました');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      className="cursor-pointer w-full bg-white border border-zinc-300 font-bold text-zinc-600 text-sm rounded-lg p-3 hover:opacity-80"
    >
      ログアウト
    </button>
  );
}
