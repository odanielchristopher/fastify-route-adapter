import { Injectable } from '../../../kernel/decorators/Injectable';
import { prismaClient } from '../../clients/prismaClient';

@Injectable()
export class UsersRepository {
  async findByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: { email }
    });
  }

  async create(createUserDto: UsersRepository.CreateUserDto) {
    const { email, name, password } = createUserDto;

    return prismaClient.user.create({
      data: {
        name,
        email,
        password,
      }
    })
  }
}

export namespace UsersRepository {
  export type CreateUserDto = {
    name: string;
    email: string;
    password: string;
  }
}
