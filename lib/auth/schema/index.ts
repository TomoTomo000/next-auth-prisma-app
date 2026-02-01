import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.email({
    message: 'メールアドレスを入力してください。',
  }),
  password: z.string().min(8, {
    message: 'パスワードは8文字以上で入力してください。',
  }).max(10, {
    message: 'パスワードは8文字以上10文字以下で入力してください。',
  }).min(1, {
    message: 'パスワードを入力してください。',
  }),
});

export const loginSchema = z.object({
  email: z.email({
    message: 'メールアドレスを入力してください。',
  }),
  password: z.string().min(8, {
    message: 'パスワードは8文字以上で入力してください。',
  }).max(10, {
    message: 'パスワードは8文字以上10文字以下で入力してください。',
  }).min(1, {
    message: 'パスワードを入力してください。',
  }),
});
