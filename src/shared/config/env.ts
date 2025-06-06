import { z } from 'zod';

export const schema = z.object({
  DATABASE_URL: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
});

export type Env = z.infer<typeof schema>;

export const env = schema.parse(process.env);
