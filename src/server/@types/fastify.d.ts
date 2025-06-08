/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import 'fastify';

import { RouteAdapter } from './RouteAdapter';
declare module 'fastify' {
  interface FastifyInstance {
    routeAdapter: RouteAdapter;
  }

  interface FastifyRequest {
    userId?: string;
  }
}
