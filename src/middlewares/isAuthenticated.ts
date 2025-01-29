import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  // recebendo o token do usuario
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    // validaar o token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
