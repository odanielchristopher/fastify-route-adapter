import { compare } from 'bcryptjs';

import { UsersRepository } from '../../../infra/database/repositories/UserRepository';
import { Injectable } from '../../../kernel/decorators/Injectable';

import { InvalidCredentials } from '../../errors/application/InvalidCredentials';
import { GenerateAccessTokenUseCase } from './GenerateAccessTokenUseCase';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase
  ) {}

  async execute(
    { email, password }: SignInUseCase.Input
  ): Promise<SignInUseCase.Output> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new InvalidCredentials();
    }

    return this.generateAccessTokenUseCase.execute({ userId: user.id });
  }
}

export namespace SignInUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
  };
}
