import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);