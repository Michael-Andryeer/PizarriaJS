export class UserValidator{
    static validateEmail(email: string): string | null {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email) return 'Email é obrigatório';
        if(!emailRegex.test(email)) return 'Email inválido';
        return null;
    }

    static validatePassword(passowrd: string): string | null {
        if(!passowrd) return 'Senha é obrigatório';
        if(passowrd.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
        return null;
    }

    static validateName(name: string): string | null {
        if(!name) return 'Nome é obrigatório';
        if(name.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        return null;
    }


    static validateUUID(uuid: string): string | null {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        if(!uuid) return 'UUID é obrigatório';
        if(!uuidRegex.test(uuid)) return 'UUID inválido';
        return null;
    }

    static validateCredentials(email: string, password: string): string[] {
        const errors: string[] = [];

        // Validações de formato
        const emailError = this.validateEmail(email);
        const passwordError = this.validatePassword(password);

        if (emailError) errors.push(emailError);
        if (passwordError) errors.push(passwordError);

        return errors;
    }
}