import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';


export class ListOrdersController {
    async handle(request:Request, response: Response) {
        const listOrdersService = new ListOrdersService();
        const orders = await listOrdersService.execute();

        return response.json(orders);
    }
}