import axios, {AxiosError} from 'axios';
import {parseCookies} from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';

 function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['token']}`,
    },
  })

 api.interceptors.response.use (response => {
  return response;
 }, (error: AxiosError) => {
  if ( error.response && error.response.status === 401) {
    // Deslogar o usuário

    if (typeof window !== "undefined" ) {
      //chamar função para logout
      signOut();
    } else {
      return Promise.reject(new AuthTokenError())
    }
  }
  return Promise.reject(error);
 }) 

 return api;
}

export { setupAPIClient };