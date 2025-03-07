import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/order/RemoveItemService';
import { OrderValidator } from '../../validators/OrderValidator';

export class RemoveItemController {
  async handle(request: Request, response: Response) {
 try{
  const item_id = request.query.item_id as string;

  const itemError = OrderValidator.validateItemId(item_id)

  if (itemError) {
    return response.status(400).json({
      error: itemError
    });
  }

  const removeItemService = new RemoveItemService();

  await removeItemService.execute({ item_id });

  return response.json({message: 'Item removido com sucesso!'})
 } catch (error) {
  return response.status(400).json({
    error: error.message
  });
 }

 return response.status(500).json({
  status: 'Error',
  message: 'Erro interno do servidor!'
 })
}
}