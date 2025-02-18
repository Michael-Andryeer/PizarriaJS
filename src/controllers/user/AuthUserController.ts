import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';
import { UserValidator } from '../../validators/UserValidator';
import { AuthError } from '../../errors/AuthError';

export class AuthUserController {
  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      // Validação de formato
      const errors = UserValidator.validateCredentials(email, password);
      if (errors.length > 0) {
        return response.status(400).json({ errors });
      }

      const authUserService = new AuthUserService();
      const auth = await authUserService.execute({ email, password });

      return response.json(auth);
      
    } catch (error) {
      if (error instanceof AuthError) {
        return response.status(401).json({
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
