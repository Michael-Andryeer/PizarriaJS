import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { AddItemController } from './controllers/order/AddItemController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';

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
const addItemController = new AddItemController();
const removeItemController = new RemoveItemController();
const sendOrderController = new SendOrderController();
const listOrdersController = new ListOrdersController();
const detailOrderController = new DetailOrderController();

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
router.post('/order/add', isAuthenticated, addItemController.handle.bind(addItemController));
router.delete('/order/remove', isAuthenticated, removeItemController.handle.bind(removeItemController));
router.put('/order/send', isAuthenticated, sendOrderController.handle.bind(sendOrderController));
router.get('/orders', isAuthenticated, listOrdersController.handle.bind(listOrdersController));
router.get('/order/detail', isAuthenticated, detailOrderController.handle.bind(listOrdersController))
//--ROTAS ORDER--

//ROTAs AUTENTICADAS
