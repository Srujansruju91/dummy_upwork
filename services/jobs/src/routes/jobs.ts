import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const createJobSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(50),
  budget: z.number().positive(),
  skills: z.array(z.string()),
  experience: z.enum(['ENTRY', 'INTERMEDIATE', 'EXPERT']),
});

export const jobRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', async (request) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw { statusCode: 401, message: 'Unauthorized' };
    }
  });

  fastify.post('/', async (request) => {
    const body = createJobSchema.parse(request.body);
    const userId = request.user.userId;

    const job = await prisma.job.create({
      data: {
        ...body,
        userId,
      },
    });

    return job;
  });

  fastify.get('/', async () => {
    const jobs = await prisma.job.findMany({
      where: { status: 'OPEN' },
      orderBy: { createdAt: 'desc' },
    });

    return jobs;
  });

  fastify.get('/:id', async (request) => {
    const { id } = request.params as { id: string };

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw { statusCode: 404, message: 'Job not found' };
    }

    return job;
  });
};