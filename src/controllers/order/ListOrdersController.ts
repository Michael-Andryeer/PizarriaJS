import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';

export class ListOrdersController {
  async handle(request: Request, response: Response) {
    try {
      // Pegando os query params com valores default
      const status = request.query.status === 'false' ? false : true;
      const page = Number(request.query.page) || 1;
      const limit = Number(request.query.limit) || 10;

      // Validações básicas
      if (page < 1) {
        return response.status(400).json({
          error: 'Página deve ser maior que 0'
        });
      }

      if (limit < 1 || limit > 100) {
        return response.status(400).json({
          error: 'Limite deve estar entre 1 e 100'
        });
      }

      const listOrdersService = new ListOrdersService();
      
      const orders = await listOrdersService.execute({
        status,
        page,
        limit
      });

      return response.json(orders);

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