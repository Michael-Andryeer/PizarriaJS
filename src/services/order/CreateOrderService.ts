import { prisma } from '../../prisma';
import { OrderRequest } from '../../@types/order';

export class CreateOrderService {
  async execute({ table, items }: OrderRequest) {
    const order = await prisma.order.create({
      data: {
        table: Number(table),
        status: true,  // true para pedido aberto
        draft: false,
        items: {
          create: items.map(item => ({
            amount: item.amount,
            product: {
              connect: {
                id: item.product_id
              }
            }
          }))
        }
      }
    });

    return order;
  }
}