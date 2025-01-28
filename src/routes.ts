import { CreateUserController } from './controllers/user/CreateUserController';
import { Router } from 'express';
import { AuthUserController } from './controllers/user/AuthUserController';

const router = Router();

// --ROTAS USER--
// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/users', (request, response): Promise<any> => {
  return new CreateUserController().handle(request, response);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/session', (request, response): Promise<any> => {
  return new AuthUserController().handle(request, response);
});

export { router };
