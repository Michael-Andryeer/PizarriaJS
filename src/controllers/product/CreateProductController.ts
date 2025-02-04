import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    try {
      const { name, price, description, category_id } = request.body;

      // Validações
      if (!name) throw new Error('Name is required');
      if (!price) throw new Error('Price is required');
      if (!description) throw new Error('Description is required');
      if (!category_id) throw new Error('Category is required');
      if (!request.file) throw new Error('Image is required');

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name,
        price: parseFloat(price), // Convertendo para float aqui
        description,
        banner: request.file.filename,
        category_id,
      });

      return response.json(product);
    } catch (error) {
      return response.status(400).json({
        error: 'Error creating product',
        details: error.message,
      });
    }
  }
}
