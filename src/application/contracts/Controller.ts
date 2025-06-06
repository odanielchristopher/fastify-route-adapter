import { getSchema } from '../../kernel/decorators/Schema';

export abstract class Controller<TResponse = undefined> {
  protected abstract handle(
    params: Controller.Request,
  ): Promise<Controller.Response<TResponse>>;

  public execute(
    request: Controller.Request,
  ): Promise<Controller.Response<TResponse>> {
    const body = this.validateBody(request.body);

    return this.handle({
      ...request,
      body,
    });
  }

  private validateBody(body: Controller.Request['body']) {
    const schema = getSchema(this);

    if (!schema) {
      return body;
    }

    return schema.parse(body);
  }
}

export namespace Controller {
  export type Request<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = {
    body: TBody;
    params: TParams;
    query: TQueryParams;
  };

  export type Response<TBody = undefined> = {
    statusCode: number;
    body?: TBody;
  };
}
