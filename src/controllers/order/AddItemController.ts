import { Request, Response } from 'express';
import { AddItemService } from '../../services/order/AddItemService';
import { OrderValidator } from '../../validators/OrderValidator';

export class AddItemController {
  async handle(request: Request, response: Response) {
    try {
      const { order_id, product_id, amount } = request.body;

      const errors = [];

      // Validações
      const orderError = OrderValidator.validateOrderId(order_id);
      const productError = OrderValidator.validateProductId(product_id);
      const amountError = OrderValidator.validateAmount(amount);

      if (orderError) errors.push(orderError);
      if (productError) errors.push(productError);
      if (amountError) errors.push(amountError);

      if (errors.length > 0) {
        return response.status(400).json({ errors });
      }

      const addItemService = new AddItemService();
      
      const order = await addItemService.execute({
        order_id,
        product_id,
        amount
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