import FastifyCors from '@fastify/cors';
import Fastify from 'fastify';

import { routes } from './routes';

const fastify = Fastify();

fastify.register(routes)

fastify.register(FastifyCors);

async function main() {
  try {
    const host = await fastify.listen({ port: 3001 });

    console.log(`> Server started at ${host}`);
  } catch (error) {
    console.log(error);
  }
}

export default main;
