export class ProductValidator {
    static validateName(name: string): string | null {
        if (!name) return 'Nome do produto é obrigatório';
        if (name.length < 3) return 'Nome do produto deve ter pelo menos 3 caracteres';
        if(name.length > 255) return 'Nome do produto deve ter no máximo 255 caracteres';
        return null;
    }

    static validatePrice(price: number): string | null {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(numPrice)) return 'Preço do produto é obrigatório';
        if (numPrice <= 0) return 'Preço do produto deve ser maior que 0';
        return null;
    }

    static validateDescription(description: string): string | null {
        if (!description) return 'Descrição do produto é obrigatório';
        if (description.length < 10) return 'Descrição do produto deve ter pelo menos 10 caracteres';
        if (description.length > 1000) return 'Descrição do produto deve ter no máximo 1000 caracteres';
        return null;
    }


    static validateCategory(category_id: string): string | null {
        if (!category_id) return 'Categoria do produto é obrigatória';
        
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(category_id)) return 'Categoria do produto deve ser um UUID válido';
        return null;
    }

    static validateImage(file: Express.Multer.File | undefined): string | null {
        if (!file) return 'Imagem é obrigatória';

        const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!allowedMimes.includes(file.mimetype)) return 'Formato de imagem inválido. Use PNG,JPEG ou JPG';

        const maxSize = 5 * 1024 * 1024; // 5MB
        if(file.size > maxSize) return 'Imagem deve ter no máximo 5MB';
        return null;
    }
}