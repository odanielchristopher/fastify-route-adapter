type TRouteType = 'public' | 'private';
export interface IController<TType extends TRouteType, TBody = undefined> {
  execute(
    params: Controller.Request<TType>,
  ): Promise<Controller.Response<TBody>>;
}

export namespace Controller {
  type BaseRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQuery = Record<string, unknown>,
  > = {
    body: TBody;
    params: TParams;
    query: TQuery;
  };

  type PublicRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQuery = Record<string, unknown>,
  > = BaseRequest<TBody, TParams, TQuery> & {
    userId: null;
  };

  type PrivateRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQuery = Record<string, unknown>,
  > = BaseRequest<TBody, TParams, TQuery> & {
    userId: string;
  };

  export type Request<
    TType extends TRouteType,
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQuery = Record<string, unknown>,
  > = TType extends 'public'
    ? PublicRequest<TBody, TParams, TQuery>
    : PrivateRequest<TBody, TParams, TQuery>;

  export type Response<TBody = undefined> = {
    statusCode: number;
    body?: TBody;
  };
}
