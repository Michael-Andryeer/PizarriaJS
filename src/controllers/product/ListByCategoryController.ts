import { Request, Response } from 'express';
import { listByCategoryService } from '../../services/product/ListByCategoryService';

export class ListByCategoryController {
  async handle(request: Request, response: Response) {
    const category_id = request.query.category_id as string; // string

    const listByCategory = new listByCategoryService();

    try {
      const products = await listByCategory.execute({
        category_id,
      });

      return response.json(products);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}
