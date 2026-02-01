import { SignUpForm } from '@/components/auth/signUpForm';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <main>
      <h1 className='my-6 w-full font-bold text-center text-2xl text-black'>新規登録</h1>
      <div className="md:max-w-[400px] max-w-11/12 mx-auto w-full">
        <SignUpForm />
        <div className='mt-8'>
          <Link
            href='/login'
            className='bg-white border border-zinc-300 block font-bold text-zinc-600 text-center rounded-lg p-3 hover:opacity-80'
          >
            すでに登録されている方はこちら
          </Link>
          <Link
            href='/'
            className='mt-3 bg-white border border-zinc-300 block font-bold text-zinc-600 text-center rounded-lg p-3 hover:opacity-80'
          >
            TOPページ
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
