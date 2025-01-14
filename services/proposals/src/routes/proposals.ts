import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const createProposalSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().min(100),
  rate: z.number().positive(),
});

export const proposalRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', async (request) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw { statusCode: 401, message: 'Unauthorized' };
    }
  });

  fastify.post('/', async (request) => {
    const body = createProposalSchema.parse(request.body);
    const userId = request.user.userId;

    const existingProposal = await prisma.proposal.findFirst({
      where: {
        jobId: body.jobId,
        userId,
      },
    });

    if (existingProposal) {
      throw {
        statusCode: 400,
        message: 'You have already submitted a proposal for this job',
      };
    }

    const proposal = await prisma.proposal.create({
      data: {
        ...body,
        userId,
      },
    });

    return proposal;
  });

  fastify.get('/job/:jobId', async (request) => {
    const { jobId } = request.params as { jobId: string };

    const proposals = await prisma.proposal.findMany({
      where: { jobId },
      orderBy: { createdAt: 'desc' },
    });

    return proposals;
  });

  fastify.get('/user', async (request) => {
    const userId = request.user.userId;

    const proposals = await prisma.proposal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return proposals;
  });
};