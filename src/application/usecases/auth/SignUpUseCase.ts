import { hash } from 'bcryptjs';

import { UsersRepository } from '../../../infra/database/repositories/UserRepository';
import { Injectable } from '../../../kernel/decorators/Injectable';

import { GenerateAccessTokenUseCase } from './GenerateAccessTokenUseCase';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase
  ) {}

  async execute(
    { email, name, password }: SignUpUseCase.Input
  ): Promise<SignUpUseCase.Output> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new Error('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    const { id } = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.generateAccessTokenUseCase.execute({ userId: id });
  }
}

export namespace SignUpUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
  };
}
