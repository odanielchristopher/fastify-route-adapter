import { FastifyPluginAsync } from 'fastify';

import { authRoutes } from './authRoutes';

export const publicRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoutes, { prefix: '/auth' });
};
