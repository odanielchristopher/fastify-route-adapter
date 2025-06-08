import { FastifyPluginAsync } from 'fastify';
import { ListProductsController } from '../../../application/controllers/products/ListProductsController';

export const productsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.routeAdapter(
    fastify,
    {
      url: '/',
      method: 'GET',
      impl: ListProductsController,
    }
  );
};
