import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../prisma';
import { AuthError } from '../../errors/AuthError';

// Interface para a requisição de autenticação
interface AuthRequest {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // verificar se o email existe
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AuthError('Credenciais inválidas');
    }

    // verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AuthError('Credenciais inválidas');
    }

    // gerar um token jwt
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id, // id do usuário
        expiresIn: '30d', // tempo de expiração do token
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}
