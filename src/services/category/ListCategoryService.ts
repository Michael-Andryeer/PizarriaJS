import { prisma } from '../../prisma';

export class ListCategoryService {
  async execute() {
    const category = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}
