import { Controller } from '../../application/contracts/IController';
import { getSchema } from '../../kernel/decorators/Schema';
import { Registry } from '../../kernel/di/Registry';
import { RouteAdapter } from '../@types/RouteAdapter';

export const routeAdapter: RouteAdapter = async (
  fastify,
  {
    url,
    method,
    impl,
  }
) => {
  const controller = Registry.getInstance().resolve(impl);
  const schema = getSchema(controller);

  fastify.route({
    url,
    method,
    schema: schema
      ? { body: schema, }
      : undefined,
    handler: async (request, reply) => {
      const { statusCode, body } =
        await controller.execute(request as Controller.Request<any, any>);

      return reply.code(statusCode).send(body);
    },
  });
}
