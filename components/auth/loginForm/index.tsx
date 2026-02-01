'use client';

import { loginSchema } from "@/lib/auth/schema";
import { useSnackbar } from "@/lib/hooks/snackbar";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
    const router = useRouter();
  const snackbar = useSnackbar();
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
  const [passVisible, setPassVisible] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    const res = await signIn('credentials', {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });

    if (res?.ok) {
      snackbar.success('ログインしました');
      router.push('/');
    } else {
      snackbar.error(res?.error ?? 'ログインに失敗しました');
    }
  };
    
  return (
    <div className="w-full">
      <form onSubmit={onSubmit}>
        <div className='w-full rounded-lg border border-zinc-300 p-6'>
          <div>
            <label htmlFor='email' className='block font-bold mb-2 text-black'>
              Email
            </label>
            <input
              className='block w-full rounded-md border border-zinc-300 p-2 text-sm'
              id='email'
              type='email'
              name='email'
              placeholder='example@gmail.com'
            />
            {errors?.email &&
              errors.email.map((error: string) => (
                <div key={error} className='mt-1'>
                  <p className='text-red-500 text-sm'>{error}</p>
                </div>
              ))}
          </div>

          <div className='mt-4'>
            <label htmlFor='password' className='block font-bold mb-2 text-black'>
              Password
            </label>
            <div className="relative">
              {passVisible ? (
                <>
                  <input
                    className='block w-full rounded-md border border-zinc-300 p-2 pr-10 text-sm'
                    id='password'
                    type='text'
                    name='password'
                    placeholder='8文字以上10文字以下で入力してください'
                  />
                  <svg className="w-5 h-5 fill-zinc-400 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setPassVisible(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>
                </>
              ) : (
                <>
                  <input
                    className='block w-full rounded-md border border-zinc-300 p-2 pr-10 text-sm'
                    id='password'
                    type='password'
                    name='password'
                    placeholder='8文字以上10文字以下で入力してください'
                  />
                  <svg className="w-5 h-5 fill-zinc-400 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setPassVisible(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>
                </>
              )}
            </div>
            {errors?.password &&
              errors.password.map((error: string) => (
                <div key={error} className='mt-1'>
                  <p className='text-red-500 text-sm'>{error}</p>
                </div>
              ))}
          </div>

          <button type="submit" className='mt-8 w-full font-bold cursor-pointer rounded-lg bg-blue-500 text-white p-3 hover:opacity-80'>
            ログイン
          </button>
        </div>
      </form>
    </div>
  )
};