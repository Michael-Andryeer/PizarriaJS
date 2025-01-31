import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, description, category_id } = request.body;

    const createProductService = new CreateProductService();

    // Não pode cadastrar produto sem foto
    if (!request.file) {
      throw new Error('Error upload file');
    } else {
      const { originalname, filename } = request.file;
      const product = await createProductService.execute({
        name,
        price,
        description,
        banner: 'oi',
        category_id,
      });

      return response.json(product);
    }
  }
}
