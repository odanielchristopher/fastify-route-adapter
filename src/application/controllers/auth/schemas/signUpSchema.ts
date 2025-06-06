import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
