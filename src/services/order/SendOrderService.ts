import { prisma } from '../../prisma';

interface OrderRequest {
    order_id: string;
}


export class SendOrderService{
    async execute({order_id}: OrderRequest){
        const order = await prisma.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false // Pedido removido do draft(rascunho)
            }
        })
        return order;
    }
}