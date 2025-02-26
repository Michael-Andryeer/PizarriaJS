export class CategoryValidator {
    static validateName(name:string): string | null {
        if (!name) return 'Nome da categoria é obrigatório';
        if (name.length < 3) return 'Nome da categoria deve ter pelo menos 3 caracteres';
        if (name.length > 255) return 'Nome da categoria deve ter no máximo 255 caracteres';
        return null;
    }

    static validateId(category_id: string): string | null {
        if (!category_id) return 'ID da categoria é obrigatório';
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(category_id)) return 'ID da categoria deve ser um UUID válido';
        return null;
    }
}