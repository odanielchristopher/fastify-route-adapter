import { FastifyPluginAsync } from "fastify";
import { authenticationMiddleware } from "../../middlewares/authenticationHook";
import { productsRoutes } from "./productsRoutes";

export const privateRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', authenticationMiddleware);

  fastify.register(productsRoutes, { prefix: '/products' });
}
