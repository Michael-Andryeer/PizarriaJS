import {prisma} from '../../prisma';
interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name,email,password}: UserRequest){
       if (!name || !email || !password){
        throw new Error('Preencha todos os campos')
       }

       const userAlreadyExists = await prisma.user.findFirst({
        where: {
            email: email
        }
       })

       if (userAlreadyExists){
        throw new Error('Usuário já existe')
       }

       const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
        select: {
            id: true,
            name: true,
            email: true
        }
       })
        return user;
    }
}

export {CreateUserService}