import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';
import { CategoryValidator } from '../../validators/CategoryValidator';

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.body;

      // Validação do nome
      const nameError = CategoryValidator.validateName(name);
      
      if (nameError) {
        return response.status(400).json({
          errors: [nameError]
        });
      }

      const createCategoryService = new CreateCategoryService();
      
      const category = await createCategoryService.execute({
        name
      });

      return response.json(category);

    } catch (error) {
      console.error(error); // Para debug
      
      if (error instanceof Error) {
        return response.status(400).json({
          status: 'error',
          message: error.message
        });
      }

      return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
      });
    }
  }
}