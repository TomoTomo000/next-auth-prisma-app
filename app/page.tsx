import { auth } from '@/auth';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth/logoutButton';

export default async function Home() {
  const session = await auth();
  const user = {
    id: session?.user?.id,
    email: session?.user?.email
  }

  console.log("Home Page: Session data", session, "User data", user, "Is logged in?", !!session && !!session.user);
  return (
    <main>
      <h1 className='my-6 w-full font-bold text-center text-2xl text-black'>NextAuth × Prisma App🚀</h1>
      <div className='md:max-w-xl max-w-11/12 mx-auto w-full'>
        <div className='bg-zinc-100 rounded-lg p-4 max-w-2xl mx-auto text-sm text-zinc-700'>
          <p>このアプリケーションは、Next.js 14 と NextAuth.js 5 を使用して作成しています。</p>
          <p>認証には Prisma ORM を使用し、Supabase データベースにユーザー情報を保存しています。</p>
          <p>新規会員登録・ログイン・ログアウト機能を提供しています。</p>
        </div>
        <div className='mt-8'>
          <h2 className='mb-6 w-full font-bold text-center text-xl text-black'>機能を試してみる🔥</h2>
          <div className='max-w-2xl mx-auto'>
              {session?.user ? (
                <>
                  <div className='w-full bg-green-100 rounded-lg p-4 text-sm leading-6 text-center'>
                    <p className='text-green-600 font-bold text-base'>ログイン中💭</p>
                    <div className='mt-2'>
                      <p>ユーザーID: {user?.id}</p>
                      <p>メールアドレス: {user?.email}</p>
                    </div>
                  </div>
                  <div className='w-full flex items-center justify-center gap-3 mt-7'>
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <div className='w-full bg-red-100 rounded-lg p-4 text-sm leading-6 text-center'>
                    <p className='text-red-500 font-bold text-base'>未ログイン状態です⚡</p>
                    <div className='mt-2'>
                      <p>ログインしてアプリケーションの機能を試してみましょう。</p>
                    </div>
                  </div>
                  <div className='w-full flex items-center justify-center gap-3 mt-7'>
                    <Link
                      href='/login'
                      className='w-full font-bold cursor-pointer rounded-lg bg-blue-500 text-white text-sm text-center p-3 hover:opacity-80'
                    >
                      ログイン
                    </Link>
                    <Link
                      href='/signup'
                      className='w-full font-bold cursor-pointer rounded-lg bg-blue-500 text-white text-sm text-center p-3 hover:opacity-80'
                    >
                      新規会員登録
                    </Link>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
