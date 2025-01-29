/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserController } from './controllers/user/CreateUserController';
import { Router } from 'express';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// --ROTAS USER--

router.post('/users', (request, response): Promise<any> => {
  return new CreateUserController().handle(request, response);
});

router.post('/session', (request, response): Promise<any> => {
  return new AuthUserController().handle(request, response);
});

// Rota autenticada com middleware
router.get('/me', isAuthenticated, (request, response): Promise<any> => {
  return new DetailUserController().handle(request, response);
});

export { router };
