import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

export const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const createProductController = new CreateProductController();

// --ROTAS USER--
router.post('/users', createUserController.handle.bind(createUserController));
router.post('/session', authUserController.handle.bind(authUserController));

//ROTAs AUTENTICADAS
router.get('/me', isAuthenticated, detailUserController.handle.bind(detailUserController));

//--ROTAS CATEGORY--
router.post(
  '/category',
  isAuthenticated,
  createCategoryController.handle.bind(createCategoryController)
);

router.get(
  '/category',
  isAuthenticated,
  listCategoryController.handle.bind(listCategoryController)
);

//--ROTAS PRODUCT--
router.post(
  '/product',
  isAuthenticated,
  createProductController.handle.bind(createProductController)
);
//ROTAs AUTENTICADAS
