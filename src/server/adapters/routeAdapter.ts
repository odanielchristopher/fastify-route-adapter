import { RouteHandlerMethod } from 'fastify';

import { Controller } from '../../application/contracts/Controller';
import { Registry } from '../../kernel/di/Registry';
import { Constructor } from '../../shared/types/Constructor';

export function routeAdapter(impl: Constructor<any>): RouteHandlerMethod {
  const controller = Registry.getInstance().resolve(impl) as Controller<any>;

  return async (request, reply) => {
    const { statusCode, body } = await controller.execute(request as Controller.Request);

    return reply.code(statusCode).send(body);
  };
}
