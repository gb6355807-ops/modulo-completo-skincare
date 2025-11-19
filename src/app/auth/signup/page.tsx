'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Mail, Lock, Eye, EyeOff, User, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    // Validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      // Criar conta no Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          }
        }
      })

      if (signUpError) throw signUpError

      if (data.user) {
        // Calcular data de término do trial (3 dias)
        const trialEndsAt = new Date()
        trialEndsAt.setDate(trialEndsAt.getDate() + 3)

        // Criar registro na tabela users
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: email,
            name: name,
            plan_type: 'free',
            trial_ends_at: trialEndsAt.toISOString(),
            skin_type: null,
            avatar: null
          })

        if (insertError) {
          console.error('Erro ao criar perfil:', insertError)
          // Não bloqueia o cadastro se falhar
        }

        setSuccess(true)
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push('/skincare')
        }, 2000)
      }
    } catch (err: any) {
      console.error('Erro no cadastro:', err)
      setError(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Conta Criada com Sucesso! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Você ganhou 3 dias de teste grátis! Redirecionando...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
        </div>
      </div>
    )
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
          <p className="text-gray-600">Crie sua conta grátis</p>
        </div>

        {/* Card de Cadastro */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
          {/* Benefícios */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-6">
            <p className="text-sm font-semibold text-purple-700 text-center">
              🎁 3 dias de teste grátis + Acesso completo
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="Seu nome"
                />
              </div>
            </div>

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
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="Mínimo 6 caracteres"
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

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="Digite a senha novamente"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Botão de Cadastro */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando conta...' : '🎉 Criar Conta Grátis'}
            </button>

            {/* Termos */}
            <p className="text-xs text-gray-500 text-center">
              Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </form>
        </div>

        {/* Link para Login */}
        <div className="mt-6 text-center bg-white rounded-2xl shadow-lg p-4">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/auth/login" className="text-pink-600 font-semibold hover:text-pink-700">
              Fazer Login
            </Link>
          </p>
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
