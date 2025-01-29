import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

export const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();

// --ROTAS USER--
router.post('/users', createUserController.handle.bind(createUserController));
router.post('/session', authUserController.handle.bind(authUserController));
//ROTA AUTENTICADA
router.get('/me', isAuthenticated, detailUserController.handle.bind(detailUserController));
