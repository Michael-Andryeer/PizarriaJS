import { Request, Response } from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';

export class RemoveOrderController {
  async handle(request: Request, response: Response) {
    const order_id = request.query.order_id as string;

    const removeOrderService = new RemoveOrderService();

    const order = await removeOrderService.execute({
      id: order_id,
    });

    return response.json(order);
  }
}
