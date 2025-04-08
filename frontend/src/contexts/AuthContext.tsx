import { createContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/apiClient';

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
  id: string,
  name: string,
  email: string,
}

type SignInProps = {
  email: string,
  password: string,
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const isAuthenticated = !!user; // Converte a variável do user em booleano
  const navigate = useNavigate();

  function signOut() {
    try {
      Cookies.remove('token');
      setUser(undefined);
      navigate('/');
    } catch {
      console.log('Erro ao deslogar');
    }
  }

  async function signIn({email, password}: SignInProps) {
    try {
      const response = await api.post('users/session', {
        email,
        password,
      });

      const {id, name, token} = response.data;

      // Salvar o token nos cookies
      Cookies.set('token', token, {
        expires: 30, // 30 dias
        path: '/'
      });

      setUser({
        id,
        name,
        email,
      });

      // Configurar o token para as requisições futuras
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Redirecionar o usuário para a página de dashboard
      navigate('/dashboard');

    } catch (error) {
      console.log('Erro ao acessar', error);
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut} as AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
}