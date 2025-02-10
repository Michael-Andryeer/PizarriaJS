import { prisma } from '../../prisma';

interface ProductRequest {
  category_id: string;
}

export class listByCategoryService {
  async execute({ category_id }: ProductRequest) {
    const findByCategory = await prisma.product.findMany({
      where: {
        category_id: category_id,
      },
    });
    return findByCategory;
  }
}
