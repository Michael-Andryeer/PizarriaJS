import { prisma } from "../../prisma";

interface FinishOrderRequest {
  order_id: string;
}

export class FinishOrderService {
  async execute({ order_id }: FinishOrderRequest) {
    // Verifica se o pedido existe
    const order = await prisma.order.findFirst({
      where: {
        id: order_id
      }
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    // Verifica se o pedido já está finalizado
    if (!order.status) {
      throw new Error('Este pedido já está finalizado');
    }

    // Finaliza o pedido
    const orderFinished = await prisma.order.update({
      where: {
        id: order_id
      },
      data: {
        status: false
      }
    });

    return orderFinished;
  }
}