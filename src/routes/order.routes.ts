import { Router } from 'express';
import { CreateOrderController } from '../controllers/order/CreateOrderController';
import { RemoveOrderController } from '../controllers/order/RemoveOrderController';
import { AddItemController } from '../controllers/order/AddItemController';
import { RemoveItemController } from '../controllers/order/RemoveItemController';
import { SendOrderController } from '../controllers/order/SendOrderController';
import { ListOrdersController } from '../controllers/order/ListOrdersController';
import { DetailOrderController } from '../controllers/order/DetailOrderController';
import { FinishOrderController } from '../controllers/order/FinishOrderController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

export const orderRouter = Router();

const createOrderController = new CreateOrderController();
const removeOrderController = new RemoveOrderController();
const addItemController = new AddItemController();
const removeItemController = new RemoveItemController();
const sendOrderController = new SendOrderController();
const listOrdersController = new ListOrdersController();
const detailOrderController = new DetailOrderController();
const finishOrderController = new FinishOrderController();

orderRouter.post('/', isAuthenticated, createOrderController.handle.bind(createOrderController));
orderRouter.delete('/order', isAuthenticated, removeOrderController.handle.bind(removeOrderController));
orderRouter.post('/add', isAuthenticated, addItemController.handle.bind(addItemController));
orderRouter.delete('/order/remove', isAuthenticated, removeItemController.handle.bind(removeItemController));
orderRouter.put('/send', isAuthenticated, sendOrderController.handle.bind(sendOrderController));
orderRouter.get('/', isAuthenticated, listOrdersController.handle.bind(listOrdersController));
orderRouter.get('/order/detail', isAuthenticated, detailOrderController.handle.bind(detailOrderController));
orderRouter.put('/order/finish', isAuthenticated, finishOrderController.handle.bind(finishOrderController));
