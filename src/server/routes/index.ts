import { FastifyPluginAsync } from 'fastify';

import { routeAdapter } from '../adapters/routeAdapter';

import { publicRoutes } from './publicRoutes';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('routeAdapter', routeAdapter);

  fastify.register(publicRoutes);
}
