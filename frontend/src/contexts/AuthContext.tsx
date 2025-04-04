import { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
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

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {
  const [user,setUser] = useState<UserProps>()
  const isAuthenticated = !!user // Converte a variavel do user em booleano, se estiver vazio vai converter para false


  async function signIn({email,password}: SignInProps)  {
    console.log(email,password)
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated,signIn} as AuthContextData}>
      {children}
    </AuthContext.Provider>
  )
}