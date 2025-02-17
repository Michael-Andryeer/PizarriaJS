import { prisma } from '../../prisma';


interface FinishOrderRequest{
    order_id: string;
}

export class FinishOrderService{
    async execute({order_id}: FinishOrderRequest){
        const order = await prisma.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true
            }
        })
        return order;
    }
}