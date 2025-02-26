import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';
import { ProductValidator } from '../../validators/ProductValidator';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    try {
    const { name, price, description, category_id } = request.body;
    const file = request.file;

    const errors = [];
    
    // validações
    const nameError = ProductValidator.validateName(name);
    const priceError = ProductValidator.validatePrice(price);
    const descriptionError = ProductValidator.validateDescription(description);
    const categoryError = ProductValidator.validateCategory(category_id);
    const imageError = ProductValidator.validateImage(file);

    if(nameError) errors.push(nameError);
    if(priceError) errors.push(priceError);
    if(descriptionError) errors.push(descriptionError);
    if(categoryError) errors.push(categoryError);
    if(imageError) errors.push(imageError);

    if (errors.length > 0) {
      return response.status(400).json({errors});
    }

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      price: parseFloat(price),
      description,
      banner: file.filename,
      category_id
    })

    return response.json(product);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({
          error : error.message
        });
      }
      
      return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
      })
    }
  }
}
