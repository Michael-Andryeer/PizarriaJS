import { prisma } from '../../prisma';
import { AddItemRequest } from '../../@types/order';

export class AddItemService {
  async execute({ order_id, product_id, amount }: AddItemRequest) {
    const order = await prisma.item.create({
      data: {
        amount,
        order: {
          connect: {
            id: order_id
          }
        },
        product: {
          connect: {
            id: product_id
          }
        }
      }
    });
    return order;
  }
}