import { prisma } from '../../prisma';

interface DetailRequest{
    order_id: string;
}

export class DetailOrderService{
    async execute({order_id}: DetailRequest) {
        const order = await prisma.order.findFirst({
            where: {
                id: order_id
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if(!order) {
            throw new Error('Pedido não encontrado!')
        }

        return order;
    }
}
