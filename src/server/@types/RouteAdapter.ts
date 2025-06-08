import { FastifyInstance, HTTPMethods } from 'fastify';
import { IController } from '../../application/contracts/IController';
import { Constructor } from '../../shared/types/Constructor';

export type RouteAdapter = (
  fastify: FastifyInstance,
  opt: {
    url: string,
    method: HTTPMethods,
    impl: Constructor<IController<any, any>>,
  },
) => Promise<void>;
