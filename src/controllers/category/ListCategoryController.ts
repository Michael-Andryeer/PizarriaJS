import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';


export class ListCategoryController {
  async handle(request: Request, response: Response) {
    try {
      const listCategoryService = new ListCategoryService();
      
      const categories = await listCategoryService.execute();

      return response.json(categories);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
      });
    }
  }
}