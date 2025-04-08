import { createContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/apiClient';
import axios from 'axios';

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
  password: string,}

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

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      if (password.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres");
        return;
      }
      
      if (!email.includes('@')) {
        alert("Por favor, insira um e-mail válido");
        return;
      }
      
      if (!name.trim()) {
        alert("O nome é obrigatório");
        return;
      }
  
      // Fazer a requisição
      const response = await api.post('/users', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });
  
      // Tratar sucesso
      alert('Usuário cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Tratamento específico para erros de validação do servidor
        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors.join('\n');
          alert(`Por favor, corrija os seguintes erros:\n${errorMessages}`);
        } else {
          // Outros erros do servidor com mensagem
          alert(`Não foi possível criar a conta: ${error.response.data.error || 'Verifique seus dados'}`);
        }
      } else {
        // Erros genéricos ou de rede
        alert('Erro ao cadastrar. Verifique sua conexão e tente novamente.');
      }
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut,signUp} as AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
}