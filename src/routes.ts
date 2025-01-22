import {CreateUserController} from './controllers/user/CreateUserController'
import {Router} from 'express';


const router = Router();

// --ROTAS USER--
router.post('/users', CreateUserController.handle)

export {router};