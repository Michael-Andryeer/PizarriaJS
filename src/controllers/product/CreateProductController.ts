import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, description, category_id } = request.body;

    const banner = '';

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      price,
      description,
      banner,
      category_id,
    });

    return response.json(product);
  }
}
