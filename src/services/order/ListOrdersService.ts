import { prisma } from '../../prisma';


export class ListOrdersService {
    async execute(){
        const orders = await prisma.order.findMany({
            where: {
                draft: false,
                status: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return orders;
    }
}