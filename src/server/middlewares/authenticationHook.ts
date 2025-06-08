import { FastifyRequest } from 'fastify';
import { JwtPayload, verify } from 'jsonwebtoken';

import { Unauthorized } from '../../application/errors/http/Unauthorized';
import { env } from '../../shared/config/env';

export async function authenticationMiddleware(request: FastifyRequest) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Unauthorized('Missing access token.');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    throw new Unauthorized('Acesss token type is not accepted.');
  }

  try {
    const payload = verify(token, env.JWT_SECRET) as JwtPayload;

    request.userId = payload.sub ?? null;
  } catch {
    throw new Unauthorized('Invalid token');
  }
}
