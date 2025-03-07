import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';


export class ListOrdersController {
    async handle(request:Request,response:Response) {
        try {
            const listOrdersService = new ListOrdersService();


            const orders = await listOrdersService.execute();

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