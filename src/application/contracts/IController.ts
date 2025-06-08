export interface IController<TResponse = undefined> {
  execute(
    params: Controller.Request,
  ): Promise<Controller.Response<TResponse>>;
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
