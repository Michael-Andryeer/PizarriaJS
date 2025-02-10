import { Request, Response } from 'express';
import { listByCategoryService } from '../../services/product/ListByCategoryService';

export class ListByCategoryController {
  async handle(request: Request, response: Response) {
    const category_id = request.query.category_id as string; // string

    if (!category_id) {
      return response.status(400).json({ error: 'Category ID is required' });
    }

    const listByCategory = new listByCategoryService();

    const products = await listByCategory.execute({
      category_id,
    });

    return response.json(products);
  }
}
