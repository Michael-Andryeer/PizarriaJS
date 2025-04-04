import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    response.status(401).end(); // Envia a resposta e encerra a execução
    return;
  }

  const [, token] = authToken.split(' ');

  try {
    // Validar token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    request.user_id = sub;

    next();   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    response.status(401).json({ message: 'Token inválido ou expirado!' }); 
    return;
  }
}
