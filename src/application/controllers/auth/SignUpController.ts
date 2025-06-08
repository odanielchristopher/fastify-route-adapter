import { Injectable } from '../../../kernel/decorators/Injectable';
import { Schema } from '../../../kernel/decorators/Schema';
import { Controller, IController } from '../../contracts/IController';
import { SignUpUseCase } from '../../usecases/auth/SignUpUseCase';

import { SignUpSchema, signUpSchema } from './schemas/signUpSchema';

@Injectable()
@Schema(signUpSchema)
export class SignUpController implements IController<'public', SignUpController.Response> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async execute(
    params: Controller.Request<'public', SignUpSchema>
  ): Promise<Controller.Response<SignUpController.Response>> {
    const { email, name, password } = params.body;

    const { accessToken } = await this.signUpUseCase.execute({
      name,
      email,
      password,
    });

    return {
      statusCode: 200,
      body: {
        accessToken,
      }
    }
  }
}

export namespace SignUpController {
  export type Response = {
    accessToken: string;
  }
}
