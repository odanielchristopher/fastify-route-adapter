import { FastifyPluginAsync } from 'fastify';

import { SignUpController } from '../../../application/controllers/auth/SignUpController';
import { routeAdapter } from '../../adapters/routeAdapter';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/signup', routeAdapter(SignUpController))
};
