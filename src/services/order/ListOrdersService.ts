import { prisma } from "../../prisma";

interface ListOrdersRequest {
  status?: boolean;
  page?: number;
  limit?: number;
}

export class ListOrdersService {
  async execute({ status = true, page = 1, limit = 10 }: ListOrdersRequest) {
    // Calcula o offset para paginação
    const skip = (page - 1) * limit;

    // Busca os pedidos com paginação
    const orders = await prisma.order.findMany({
      where: {
        draft: false,
        status: status
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });

    // Conta total de registros para paginação
    const total = await prisma.order.count({
      where: {
        draft: false,
        status: status
      }
    });

    return {
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }
}