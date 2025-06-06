import { Injectable } from '../../../kernel/decorators/Injectable';
import { Schema } from '../../../kernel/decorators/Schema';
import { Controller } from '../../contracts/Controller';
import { SignUpUseCase } from '../../usecases/auth/SignUpUseCase';

import { SignUpSchema, signUpSchema } from './schemas/signUpSchema';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<unknown> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  async handle(
    params: Controller.Request<SignUpSchema>
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
