import { createContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/apiClient';
import axios from 'axios';
import { toast } from 'react-toastify';

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
  name: string,
  email: string,
  password: string,
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  function signOut() {
    try {
      Cookies.remove('token');
      setUser(undefined);
      navigate('/');
      toast.success('Logout realizado com sucesso!');
    } catch {
      toast.error('Erro ao deslogar');
    }
  }

  async function signIn({email, password}: SignInProps) {
    try {
      const response = await api.post('users/session', {
        email,
        password,
      });

      const {id, name, token} = response.data;

      Cookies.set('token', token, {
        expires: 30,
        path: '/'
      });

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers.Authorization = `Bearer ${token}`;

      toast.success(`Bem-vindo(a), ${name}!`);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Falha no login. Verifique seus dados.');
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      if (password.length < 8) {
        toast.warning("A senha deve ter pelo menos 8 caracteres");
        return;
      }
      
      if (!email.includes('@')) {
        toast.warning("Por favor, insira um e-mail válido");
        return;
      }
      
      if (!name.trim()) {
        toast.warning("O nome é obrigatório");
        return;
      }
  
      const response = await api.post('/users', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });
  
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors;
          
          // Mostrar cada erro como um toast separado
          errorMessages.forEach((msg: string) => {
            toast.error(msg);
          });
        } else {
          toast.error(error.response.data.error || 'Não foi possível criar a conta');
        }
      } else {
        toast.error('Erro ao cadastrar. Verifique sua conexão.');
      }
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  );
}