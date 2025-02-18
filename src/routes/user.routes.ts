import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { AuthUserController } from '../controllers/user/AuthUserController';
import { DetailUserController } from '../controllers/user/DetailUserController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

export const userRouter = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();

// Remove o /users pois já está definido no index.ts
userRouter.post('/', createUserController.handle.bind(createUserController));
userRouter.post('/session', authUserController.handle.bind(authUserController));
userRouter.get('/me', isAuthenticated, detailUserController.handle.bind(detailUserController));