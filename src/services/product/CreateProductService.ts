interface ProductRequest {
  name: string;
  price: number;
  description: string;
  banner: string; // imagem do produto
  category_id: string;
}

export class CreateProductService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ name, price, description, banner, category_id }: ProductRequest) {}
}
