'use client'

import { useState } from 'react'
import { Calendar, Camera, Bell, Sparkles, TrendingUp, Package, Heart, Crown } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'ultra'>('free')

  const features = [
    {
      icon: Calendar,
      title: 'Rotina Skincare',
      description: 'Passo a passo manhã e noite',
      href: '/skincare/rotinas',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: Camera,
      title: 'Diário da Pele',
      description: 'Fotos e evolução',
      href: '/skincare/diario',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Análise por IA',
      description: 'Diagnóstico inteligente',
      href: '/skincare/analise',
      color: 'from-blue-400 to-purple-500',
      premium: true
    },
    {
      icon: Bell,
      title: 'Lembretes',
      description: 'Nunca esqueça seus cuidados',
      href: '/skincare/lembretes',
      color: 'from-orange-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Tratamentos',
      description: 'Personalizados para você',
      href: '/skincare/tratamentos',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      icon: Package,
      title: 'Produtos',
      description: 'Sugestões para seu tipo de pele',
      href: '/skincare/produtos',
      color: 'from-indigo-400 to-purple-500'
    }
  ]

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$ 0',
      period: '3 dias',
      features: [
        'Rotina básica de skincare',
        'Diário da pele com fotos',
        'Lembretes simples',
        'Sugestões de produtos'
      ],
      color: 'from-gray-400 to-gray-500',
      icon: Heart
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 29,99',
      period: '/mês',
      features: [
        'Tudo do plano gratuito',
        'Análise por IA avançada',
        'Tratamentos personalizados',
        'Gráficos de evolução',
        'Lembretes ilimitados'
      ],
      color: 'from-pink-500 to-rose-600',
      icon: Sparkles,
      popular: true
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 'R$ 39,99',
      period: '/mês',
      features: [
        'Tudo do Premium',
        'Consultas com dermatologista',
        'Rotinas personalizadas por IA',
        'Análises ilimitadas',
        'Suporte prioritário 24/7',
        'Acesso antecipado a novidades'
      ],
      color: 'from-purple-600 to-indigo-700',
      icon: Crown
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header com animação */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center animate-pulse-slow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Skincare Pro
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/auth/login"
                className="px-6 py-2.5 text-gray-700 font-semibold hover:text-pink-600 transition-all duration-300 rounded-lg hover:bg-pink-50 hover:scale-105"
              >
                Entrar
              </Link>
              <Link 
                href="/auth/signup"
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Criar Conta Grátis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com animações */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-600 font-medium text-sm mb-6 animate-bounce-slow">
          ✨ 3 dias grátis para testar
        </div>
        <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
          Sua pele merece o melhor
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
          Cuide da sua pele com inteligência artificial, rotinas personalizadas e acompanhamento completo da sua evolução
        </p>
        
        {/* CTA Buttons Hero */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in-delay-2">
          <Link
            href="/auth/signup"
            className="px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto relative overflow-hidden group"
          >
            <span className="relative z-10">🎉 Criar Conta - 3 Dias Grátis</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="/auth/login"
            className="px-10 py-5 bg-white text-gray-800 rounded-full font-bold text-xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-pink-200 w-full sm:w-auto"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* Features Grid com animações */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
          Tudo que você precisa em um só lugar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link
                key={index}
                href={feature.href}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-pink-100 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {feature.premium && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
                    PREMIUM
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Link>
            )
          })}</div>
      </section>

      {/* Pricing Section com animações */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-4 text-gray-800 animate-fade-in">
          Escolha seu plano
        </h3>
        <p className="text-center text-gray-600 mb-12 animate-fade-in-delay">
          Comece grátis e faça upgrade quando quiser
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl transition-all duration-300 hover:scale-105 border-2 animate-slide-up ${
                  plan.popular ? 'border-pink-500' : 'border-pink-100'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg animate-bounce-slow">
                    MAIS POPULAR
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 mx-auto`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {plan.name}
                </h4>
                
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/auth/signup"
                  className={`block w-full py-4 rounded-xl font-bold transition-all duration-300 text-center relative overflow-hidden group ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <span className="relative z-10">
                    {plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
                  </span>
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section com animação */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 shadow-2xl animate-scale-in hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronta para transformar sua pele?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de mulheres que já estão cuidando da pele de forma inteligente
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Criar Conta Agora - 3 Dias Grátis</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>© 2024 Skincare Pro. Feito com 💖 para você</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
