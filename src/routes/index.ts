import { Router } from 'express';
import { userRouter } from './user.routes';
import { orderRouter } from './order.routes';
import { productRouter } from './product.routes';
import { categoryRouter } from './category.routes';

export const router = Router();

// Agrega todas as rotas com prefixos
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
