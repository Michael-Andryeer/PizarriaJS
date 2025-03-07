export interface OrderItem {
    product_id: string;
    amount: number;
  }
  
  export interface OrderRequest {
    table: string | number;
    items: OrderItem[];
  }

  export interface AddItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
  }