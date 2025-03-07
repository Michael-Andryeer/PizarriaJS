import { prisma } from '../../prisma';

interface RemoveOrderRequest {
  order_id: string;
}

export class RemoveOrderService {
  async execute({ order_id }: RemoveOrderRequest) {
    // Primeiro remove todos os items do pedido
    await prisma.item.deleteMany({
      where: {
        order: {
          id: order_id
        }
      }
    });

    // Depois remove o pedido
    const order = await prisma.order.delete({
      where: {
        id: order_id
      }
    });

    return order;
  }
}