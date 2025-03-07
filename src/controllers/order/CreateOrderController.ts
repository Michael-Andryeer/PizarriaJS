import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';
import { OrderValidator } from '../../validators/OrderValidator';
import { OrderRequest } from '../../@types/order';

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    try {
      const { table, items } = request.body as OrderRequest;

      const errors = [];

      // Validações
      const tableError = OrderValidator.validateTable(table);
      const itemsError = OrderValidator.validateItems(items);

      if (tableError) errors.push(tableError);
      if (itemsError) errors.push(itemsError);

      if (errors.length > 0) {
        return response.status(400).json({ errors });
      }

      const createOrderService = new CreateOrderService();
      const order = await createOrderService.execute({
        table,
        items
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