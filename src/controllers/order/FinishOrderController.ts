import { Request, Response } from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';
import { OrderValidator } from '../../validators/OrderValidator';

export class FinishOrderController {
  async handle(request: Request, response: Response) {
    try {
      const { order_id } = request.body;

      // Validação
      const orderError = OrderValidator.validateOrderId(order_id);
      
      if (orderError) {
        return response.status(400).json({
          error: orderError
        });
      }

      const finishOrderService = new FinishOrderService();
      
      const order = await finishOrderService.execute({
        order_id
      });

      return response.json(order);

    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({
          error: error.message
        });
      }

      return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
      });
    }
  }
}