import { prisma } from '../../prisma';

interface DetailRequest{
    order_id: string;
}


export class DetailOrderService{
   async execute({order_id}: DetailRequest) {
    const orders = await prisma.item.findMany({
        where: {
            orderId: order_id
        },
        include: {
            product: true,
            order: true
        }
    })
    return orders;
   }
}