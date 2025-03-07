import { prisma } from '../../prisma';


export class ListOrdersService{
    async execute(){
        const orders = await prisma.order.findMany({
            where: {
                draft: false,
                status: true, // apenas pediddos abertos
            },
            include:{
                items:{
                    include:{
                        product:true
                    }
                }
            },
            orderBy:{
                createdAt: 'desc'
            }
        });
        return orders;
    }
}