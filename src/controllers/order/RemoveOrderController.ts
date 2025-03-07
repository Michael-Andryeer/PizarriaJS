import { Request, Response } from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';
import { OrderValidator } from '../../validators/OrderValidator';

export class RemoveOrderController {
  async handle(request: Request, response: Response) {
    try {
      const order_id = request.query.order_id as string

      const orderError = OrderValidator.validateOrderId(order_id);

      if (orderError) {
        return response.status(400).json({error:orderError})
      }

      const removeOrderService = new RemoveOrderService();

      await removeOrderService.execute({order_id});

      return response.json({message: 'Pedido removido som sucesso!'})
    } catch (error) {
      if( error instanceof Error) {
        return response.status(400).json({
          error: error.message
        })
      }

      return response.status(500).json({
        status: 'erro',
        message: 'Erro interno do servidor'
      })
    }
}

}
