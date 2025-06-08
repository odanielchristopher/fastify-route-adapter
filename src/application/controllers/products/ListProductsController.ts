import { prismaClient } from '../../../infra/clients/prismaClient';
import { Injectable } from '../../../kernel/decorators/Injectable';
import { Controller, IController } from '../../contracts/IController';

@Injectable()
export class ListProductsController implements
  IController<'private',ListProductsController.Response> {
    async execute(
      params: Controller.Request<'private'>,
    ): Promise<Controller.Response<ListProductsController.Response>> {
      const products = await prismaClient.product.findMany({
        where: {
          userId: params.userId,
        },
      });

      return {
        statusCode: 200,
        body: {
          products,
        }
      }
    }
}

export namespace ListProductsController {
  export type Response = {
    products: any[];
  }
}
