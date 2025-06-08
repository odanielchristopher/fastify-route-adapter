import { FastifyPluginAsync } from 'fastify';

import { SignInController } from '../../../application/controllers/auth/SignInController';
import { SignUpController } from '../../../application/controllers/auth/SignUpController';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.routeAdapter(
    fastify,
    {
      url: '/sign-up',
      method: 'POST',
      impl: SignUpController,
    }
  );

  fastify.routeAdapter(
    fastify,
    {
      url: '/sign-in',
      method: 'POST',
      impl: SignInController,
    }
  );
};
