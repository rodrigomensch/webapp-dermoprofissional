"use client"

import { useState } from 'react'
import { User, Lock, Mail, Stethoscope, UserCircle } from 'lucide-react'

interface LoginPageProps {
  onLogin: (role: 'professional' | 'patient', email: string, password: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'professional' | 'patient'>('professional')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(activeTab, email, password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SkinCare Pro</h1>
          <p className="text-gray-600">Gestão Profissional de Pacientes</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('professional')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'professional'
                  ? 'bg-white text-cyan-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>Profissional</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('patient')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'patient'
                  ? 'bg-white text-cyan-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserCircle className="w-4 h-4" />
                <span>Paciente</span>
              </div>
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Entrar
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700">
              Esqueceu sua senha?
            </a>
            <div className="text-sm text-gray-600">
              Não tem conta?{' '}
              <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">
                Cadastre-se
              </a>
            </div>
          </div>
        </div>

        {/* Informações de Teste */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-2">🔐 Credenciais de Teste:</p>
          <p className="text-xs text-blue-700">Profissional: pro@skincare.com / senha123</p>
          <p className="text-xs text-blue-700">Paciente: paciente@email.com / senha123</p>
        </div>
      </div>
    </div>
  )
}
