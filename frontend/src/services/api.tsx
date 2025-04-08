import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AuthTokenError } from './errors/AuthTokenError';

// Função para fazer logout (não pode usar useNavigate aqui)
function handleSignOut() {
  Cookies.remove('token');
  window.location.href = '/';
}

function setupAPIClient(ctx = undefined) {
  const token = Cookies.get('token');

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        // Deslogar o usuário
        if (typeof window !== "undefined") {
          // chamar função para logout
          handleSignOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export { setupAPIClient };