import { prisma } from '../../prisma';

interface ProductRequest {
  name: string;
  price: string | number; // Aceita tanto string quanto número
  description: string;
  banner: string;
  category_id: string;
}

export class CreateProductService {
  async execute({ name, price, description, banner, category_id }: ProductRequest) {
    try {
      // Forçando a conversão do preço para número
      const priceAsFloat = typeof price === 'string' ? parseFloat(price) : price;

      // Validação do preço
      if (isNaN(priceAsFloat)) {
        throw new Error('Invalid price value');
      }

      const product = await prisma.product.create({
        data: {
          name,
          price: priceAsFloat, // Usando o valor convertido
          description,
          banner,
          category_id,
        },
      });

      return product;
    } catch (error) {
      console.error('Error details:', error);
      throw error;
    }
  }
}
