import { prisma } from '../../prisma';

interface CategoryRequest {
  name: string;
}

export class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === '') {
      throw new Error('name invalid');
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }
}
