import { FastifyRequest } from 'fastify';
import { JwtPayload, verify } from 'jsonwebtoken';

import { env } from '../../shared/config/env';

export async function authenticationHook(request: FastifyRequest) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('Missing access token.');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    throw new Error('Acess token type is not accepted.');
  }

  try {
    const payload = verify(token, env.JWT_SECRET) as JwtPayload;

    request.userId = payload.sub;
  } catch {
    throw new Error('Invalid token');
  }
}
