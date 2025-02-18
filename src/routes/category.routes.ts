import { Router } from 'express';
import { CreateCategoryController } from '../controllers/category/CreateCategoryController';
import { ListCategoryController } from '../controllers/category/ListCategoryController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();

categoryRouter.post(
  '/category',
  isAuthenticated,
  createCategoryController.handle.bind(createCategoryController)
);

categoryRouter.get(
  '/category',
  isAuthenticated,
  listCategoryController.handle.bind(listCategoryController)
);

export { categoryRouter };