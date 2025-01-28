import { PrismaClient } from '@prisma/client';
import { prisma } from '../../prisma';
import { compare } from 'bcrypt';

// Interface para a requisição de autenticação
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // verificar se o email existe
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('Usuário/senha incorretos');
    }

    // verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Usuário/senha incorretos');
    }

    // gerar um token

    return { ok: true };
  }
}

export { AuthUserService };
