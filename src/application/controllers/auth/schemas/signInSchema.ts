import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8),
});

export type SignInSchema = z.infer<typeof signInSchema>;
