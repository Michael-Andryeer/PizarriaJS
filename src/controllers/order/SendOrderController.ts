import { Request, Response } from 'express';
import { SendOrderService } from '../../services/order/SendOrderService';
import { OrderValidator } from '../../validators/OrderValidator';

export class SendOrderController {
    async handle(request: Request, response: Response){
        try {
            const {order_id} = request.body;

            const orderError = OrderValidator.validateOrderId(order_id);

            if (orderError) {
                return response.status(400).json({
                    error: orderError
                });
            }

            const sendOrderService = new SendOrderService();

            const order = await sendOrderService.execute({order_id});

            return response.json(order);
        } catch(error) {
            if (error instanceof Error) {
                return response.status(400).json({
                    error: error.message
                })
            }
            return response.status(500).json({
                status: 'error',
                message: 'Erro interno do servidor'
            })
        }
    }
}