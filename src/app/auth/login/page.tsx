'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        router.push('/skincare')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Skincare Pro
            </h1>
          </Link>
          <p className="text-gray-600">Entre na sua conta</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {/* Esqueci a senha */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>

        {/* Card de Criar Conta - DESTAQUE */}
        <div className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl shadow-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <UserPlus className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Não tem uma conta?</h3>
          </div>
          <p className="text-white/90 mb-4 text-sm">
            Crie sua conta grátis e ganhe 3 dias para testar todas as funcionalidades!
          </p>
          <Link
            href="/auth/signup"
            className="block w-full py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            🎉 Criar Conta Grátis
          </Link>
        </div>

        {/* Voltar */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
            ← Voltar para home
          </Link>
        </div>
      </div>
    </div>
  )
}
