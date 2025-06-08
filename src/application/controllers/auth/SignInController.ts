import { Injectable } from '../../../kernel/decorators/Injectable';
import { Schema } from '../../../kernel/decorators/Schema';
import { Controller, IController } from '../../contracts/IController';
import { SignInSchema, signInSchema } from './schemas/signInSchema';


@Injectable()
@Schema(signInSchema)
export class SignInController implements IController<unknown> {
  async execute(
    params: Controller.Request<SignInSchema>
  ): Promise<Controller.Response<SignInController.Response>> {
    return {
      statusCode: 200,
      body: {
        ok: 'Deu certo!',
      }
    }
  }
}

export namespace SignInController {
  export type Response = {
    ok: string;
  }
}
