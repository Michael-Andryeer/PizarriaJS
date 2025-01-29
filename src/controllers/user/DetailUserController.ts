import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

export class DetailUserController {
  async handle(request: Request, response: Response) {
    const detailUserService = new DetailUserService();

    const user_id = request.user_id;

    const user = await detailUserService.execute(user_id);

    return response.json(user);
  }
}
