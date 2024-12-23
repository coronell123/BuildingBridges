import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  POSTGRES_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  BASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  STRIPE_PRICE_BASE: z.string().startsWith('price_'),
  STRIPE_PRICE_PLUS: z.string().startsWith('price_'),
  STRIPE_PRODUCT_BASE: z.string().startsWith('prod_'),
  STRIPE_PRODUCT_PLUS: z.string().startsWith('prod_'),
});

export const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
} 