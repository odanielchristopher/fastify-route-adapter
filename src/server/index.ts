import FastifyCors from '@fastify/cors';
import Fastify from 'fastify';

import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { routes } from './routes';

const fastify = Fastify().withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(FastifyCors);
fastify.register(routes);
fastify.setErrorHandler((error, _request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.code(400).send({
        error: error.validation.map((issue) => ({
          field: issue.instancePath,
          message: issue.message,
        })),
      });
    }

    console.log(error);
    return reply.code(500).send({ error: 'Internal server error.' });
  });


async function main() {
  try {
    const host = await fastify.listen({ port: 3001 });

    console.log(`> Server started at ${host}`);
  } catch (error) {
    console.log(error);
  }
}

export default main;
