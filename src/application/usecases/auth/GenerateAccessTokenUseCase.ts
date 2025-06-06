import { sign } from 'jsonwebtoken';

import { Injectable } from '../../../kernel/decorators/Injectable';
import { env } from '../../../shared/config/env';

@Injectable()
export class GenerateAccessTokenUseCase {
  execute(
    { userId }: GenerateAccessTokenUseCase.Input
  ): GenerateAccessTokenUseCase.Output {
    const accessToken = sign({ sub: userId }, env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { accessToken };
  }
}

export namespace GenerateAccessTokenUseCase {
  export type Input = {
    userId: string;
  };

  export type Output = {
    accessToken: string;
  };
}
