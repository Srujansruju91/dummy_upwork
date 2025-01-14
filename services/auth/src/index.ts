import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth.js';
import { env } from './config/env.js';

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: env.CORS_ORIGIN,
  credentials: true,
});

await fastify.register(jwt, {
  secret: env.JWT_SECRET,
});

fastify.register(authRoutes, { prefix: '/api/auth' });

try {
  await fastify.listen({ port: env.PORT, host: '0.0.0.0' });
  console.log(`Auth service listening on port ${env.PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}