import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { UserValidator } from '../../validators/UserValidator';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const errors = [];

    const nameError = UserValidator.validateName(name);
    const emailError = UserValidator.validateEmail(email);
    const passwordError = UserValidator.validatePassword(password);

    if (nameError) errors.push(nameError);
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
