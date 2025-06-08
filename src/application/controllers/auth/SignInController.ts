import { Injectable } from '../../../kernel/decorators/Injectable';
import { Schema } from '../../../kernel/decorators/Schema';
import { Controller, IController } from '../../contracts/IController';
import { SignInUseCase } from '../../usecases/auth/SignInUseCase';
import { SignInSchema, signInSchema } from './schemas/signInSchema';


@Injectable()
@Schema(signInSchema)
export class SignInController implements IController<'public', SignInController.Response> {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async execute(
    params: Controller.Request<'public', SignInSchema>
  ): Promise<Controller.Response<SignInController.Response>> {
    const { email, password } = params.body;

    const { accessToken } = await this.signInUseCase.execute({ email, password });

    return {
      statusCode: 200,
      body: {
        accessToken,
      }
    }
  }
}

export namespace SignInController {
  export type Response = {
    accessToken: string;
  }
}
