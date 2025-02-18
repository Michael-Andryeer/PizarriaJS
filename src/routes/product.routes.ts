import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/multer';
import { CreateProductController } from '../controllers/product/CreateProductController';
import { ListByCategoryController } from '../controllers/product/ListByCategoryController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

export const productRouter = Router();
const upload = multer(uploadConfig.upload('./tmp'));

const createProductController = new CreateProductController();
const listByCategoryController = new ListByCategoryController();

productRouter.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  createProductController.handle.bind(createProductController)
);

productRouter.get(
  '/category/product',
  isAuthenticated,
  listByCategoryController.handle.bind(listByCategoryController)
);
