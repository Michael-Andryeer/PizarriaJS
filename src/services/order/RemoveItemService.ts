import { prisma } from '../../prisma';

interface RemoveItemRequest {
  item_id: string;
}

export class RemoveItemService {
  async execute({ item_id }: RemoveItemRequest) {
    // Verifica se o item existe
    const itemExists = await prisma.item.findFirst({
      where: {
        id: item_id
      }
    });

    if (!itemExists) {
      throw new Error('Item não encontrado');
    }

    // Remove o item
    const item = await prisma.item.delete({
      where: {
        id: item_id
      }
    });

    return item;
  }
}