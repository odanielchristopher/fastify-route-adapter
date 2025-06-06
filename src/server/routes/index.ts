import { FastifyPluginAsync } from 'fastify';
import { ZodError } from 'zod';

import { publicRoutes } from './publicRoutes';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(publicRoutes);

  fastify.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.code(400).send(error.issues.map((issue) => ({
        message: issue.message,
      })))
    }

    console.log(error);
    return reply.code(500).send({ message: 'Internal server error.' });
  });
}
