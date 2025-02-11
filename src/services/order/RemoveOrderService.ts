import { prisma } from '../../prisma';

interface OrderRequest {
  id: string;
}

export class RemoveOrderService {
  async execute({ id }: OrderRequest) {
    const order = await prisma.order.delete({
      where: {
        id: id,
      },
    });
    return order;
  }
}
