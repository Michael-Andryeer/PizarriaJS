import { Lock, Mail, Pizza } from 'lucide-react';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


function Login() {

  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 async function handleLogin(event:FormEvent) {
  event.preventDefault()
  
  const data = {
    email: "teste@teste.com",
    password: "123"
   }

   await signIn(data)
 }

 

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D35400] to-[#E67E22] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Pizza className="h-12 w-12 text-white" strokeWidth={1.5} />
            <h1 className="text-4xl font-bold text-white tracking-tight">PizzariaJS</h1>
          </div>
          <p className="text-white/80">Sistema de gestão para pizzarias</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl ring-1 ring-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Bem-vindo de volta</h2>
              <p className="text-sm text-white/80">Acesse sua conta para continuar</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-400 text-[#D35400] rounded-lg font-medium hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-[#D35400] transition-all"
            >
              Acessar
            </button>

            <p className="text-center text-sm">
              <a
                href="/register"
                className="text-white/80 hover:text-white transition-colors"
              >
                Não tem uma conta? Registre sua empresa
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
