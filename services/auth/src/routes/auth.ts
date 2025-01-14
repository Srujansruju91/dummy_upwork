import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

const signupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string(),
  country: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/signup', async (request, reply) => {
    const body = signupSchema.parse(request.body);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return reply.status(400).send({
        error: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        phoneNumber: body.phoneNumber,
        country: body.country,
      },
    });

    const token = fastify.jwt.sign({ userId: user.id });

    return { token };
  });

  fastify.post('/login', async (request, reply) => {
    const body = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return reply.status(400).send({
        error: 'Invalid email or password',
      });
    }

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      return reply.status(400).send({
        error: 'Invalid email or password',
      });
    }

    const token = fastify.jwt.sign({ userId: user.id });

    return { token };
  });
};