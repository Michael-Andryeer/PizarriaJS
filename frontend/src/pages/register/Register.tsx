import { Building2, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Criar nova conta</h2>
            <p className="text-sm text-zinc-400">Registre sua empresa na plataforma</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da empresa"
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 rounded-lg text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 rounded-lg text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 rounded-lg text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Já tem uma conta? Faça login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}