import {Request,Response} from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';

export class FinishOrderController{
    async handle(request: Request, response: Response){
        const {order_id} = request.body;
        const finishOrderService = new FinishOrderService();
        const order = await finishOrderService.execute({
            order_id
        })
        return response.json(order);
    }
}
