'use server';

import * as z from "zod";
import { getUserByEmail } from "../repo";
import { signUpSchema } from "../schema";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

export type NotificationType = 'success' | 'error';

export interface AuthState {
  errors?: {
    email?: string[];
    password?: string[];
  },
  message?: string | null;
  type?: NotificationType;
}

export async function signUpAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const result = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if(!result.success) {
    const flattened = z.flattenError(result.error); 
    return {
      errors: flattened.fieldErrors,
    };
  }

  const { email, password } = result.data;
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const isUser = await getUserByEmail(email);
    if(isUser) {
      return {
        message: '既に登録されているメールアドレスです。',
        type: 'error',
      };
    }

    await prisma.user.create({
      data: {
        email,
        password: hashPass,
      },
    });

    return {
      message: '登録に成功しました。',
      type: 'success',
    };
  } catch (error) {
    return {
      message: 'サーバーエラーが発生しました。時間をおいて再度お試しください。',
      type: 'error',
    };
  }
}