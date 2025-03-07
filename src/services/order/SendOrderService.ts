import {prisma} from '../../prisma';

interface SendOrderRequest {
  order_id: string;
}

export class SendOrderService {
  async execute({ order_id }: SendOrderRequest) {
    const order = await prisma.order.update({
      where: {
        id: order_id
      },
      data: {
        status: false  // Finalizando o pedido
      }
    });

    return order;
  }
}