import {CreateUserController} from './controllers/user/CreateUserController'
import {Router} from 'express';


const router = Router();

// --ROTAS USER--
router.post('/users', (request,response): Promise<any> => {
    return new CreateUserController().handle(request,response)
})


export {router};