/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}
