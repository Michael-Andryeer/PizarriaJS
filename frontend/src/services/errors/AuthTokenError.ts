export class AuthTokenError extends Error {
  constructor() {
    super('Token de autenticação invalido ou expirado. Faça login novamente.');
    this.name = 'AuthTokenError';
  }
}