import { OrderItem } from '../@types/order';
export class OrderValidator {
    static validateTable(table: number | string): string | null {
      const tableNumber = Number(table);
      
      if (!table) return 'Número da mesa é obrigatório';
      if (isNaN(tableNumber)) return 'Número da mesa deve ser um número válido';
      if (tableNumber <= 0) return 'Número da mesa deve ser maior que zero';
      
      return null;
    }
  
    static validateItems(items: OrderItem[]): string | null {
      if (!items || !Array.isArray(items)) return 'Items do pedido são obrigatórios';
      if (items.length === 0) return 'Pedido deve ter pelo menos um item';
      
      // Validar cada item do pedido
      for (const item of items) {
        const productError = this.validateProductId(item.product_id);
        const amountError = this.validateAmount(item.amount);
        
        if (productError) return productError;
        if (amountError) return amountError;
      }
      
      return null;
    }
  
    static validateProductId(product_id: string): string | null {
      if (!product_id) return 'ID do produto é obrigatório';
      
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(product_id)) return 'ID de produto inválido';
      
      return null;
    }
  
    static validateAmount(amount: number): string | null {
      if (!amount) return 'Quantidade é obrigatória';
      if (amount <= 0) return 'Quantidade deve ser maior que zero';
      if (!Number.isInteger(amount)) return 'Quantidade deve ser um número inteiro';
      
      return null;
    }
  
    static validateStatus(status: boolean): string | null {
      if (status === undefined || status === null) return 'Status é obrigatório';
      if (typeof status !== 'boolean') return 'Status deve ser um booleano';
      return null;
    }

    static validateOrderId(order_id: string): string | null {
        if (!order_id) return 'ID do pedido é obrigatório';

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(order_id)) return 'ID de pedido inválido';

        return null;
    }
  }