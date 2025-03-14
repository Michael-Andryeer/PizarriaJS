import { prisma } from "../../prisma";

interface SendOrderRequest {
  order_id: string;
}

export class SendOrderService {
  async execute({ order_id }: SendOrderRequest) {
    // Verifica se o pedido existe
    const order = await prisma.order.findFirst({
      where: {
        id: order_id
      },
      include: {
        items: true
      }
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    // Verifica se o pedido tem items
    if (order.items.length === 0) {
      throw new Error('Não é possível enviar um pedido sem items');
    }

    // Verifica se o pedido já foi enviado
    if (order.draft === false) {
      throw new Error('Pedido já foi enviado');
    }

    // Envia o pedido (muda o status de draft para false)
    const orderUpdated = await prisma.order.update({
      where: {
        id: order_id
      },
      data: {
        draft: false
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return orderUpdated;
  }
}