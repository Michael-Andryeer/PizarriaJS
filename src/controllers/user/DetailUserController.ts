import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';
import { UserValidator } from '../../validators/UserValidator';

export class DetailUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const idError = UserValidator.validateUUID(user_id);

    if (idError) {
      return response.status(400).json({ 
        errors: [idError] 
      });
    }

    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute(user_id);

    return response.json(user);
  }
}
