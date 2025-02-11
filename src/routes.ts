import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import uploadConfig from './config/multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

export const router = Router();

//Configuração do multer
const upload = multer(uploadConfig.upload('./tmp'));

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const createProductController = new CreateProductController();
const listByCategoryController = new ListByCategoryController();
const createOrderController = new CreateOrderController();
const removeOrderController = new RemoveOrderController();

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
  upload.single('file'),
  createProductController.handle.bind(createProductController)
);

router.get(
  '/category/product',
  isAuthenticated,
  listByCategoryController.handle.bind(listByCategoryController)
);

//--ROTAS ORDER--
router.post('/order', isAuthenticated, createOrderController.handle.bind(createOrderController));
router.delete('/order', isAuthenticated, removeOrderController.handle.bind(removeOrderController));
//--ROTAS ORDER--

//ROTAs AUTENTICADAS
