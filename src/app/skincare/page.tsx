'use client';

import { useState } from 'react';
import SkincareLayout from './components/SkincareLayout';
import { Calendar, BookOpen, Sparkles, TrendingUp, Heart, Crown, Camera, Bell, Target, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SkincarePage() {
  const [userName] = useState('Maria');
  const [planType] = useState<'free' | 'premium' | 'ultra'>('free');
  const [trialDaysLeft] = useState(3);

  const stats = [
    { label: 'Dias de rotina', value: '12', icon: Calendar, color: 'from-pink-400 to-rose-500' },
    { label: 'Fotos no diário', value: '8', icon: Camera, color: 'from-purple-400 to-indigo-500' },
    { label: 'Progresso', value: '67%', icon: TrendingUp, color: 'from-blue-400 to-cyan-500' },
    { label: 'Produtos salvos', value: '15', icon: Heart, color: 'from-rose-400 to-pink-500' },
  ];

  const quickActions = [
    {
      title: 'Rotina Manhã',
      description: 'Comece seu dia com cuidados',
      icon: Calendar,
      href: '/skincare/rotinas?time=manha',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      title: 'Rotina Noite',
      description: 'Cuide da sua pele antes de dormir',
      icon: Calendar,
      href: '/skincare/rotinas?time=noite',
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      title: 'Diário da Pele',
      description: 'Registre a evolução',
      icon: BookOpen,
      href: '/skincare/diario',
      gradient: 'from-pink-400 to-rose-500',
    },
    {
      title: 'Análise por Foto',
      description: 'IA analisa sua pele',
      icon: Camera,
      href: '/skincare/analise',
      gradient: 'from-cyan-400 to-blue-500',
      badge: 'Premium',
    },
    {
      title: 'Tratamentos',
      description: 'Protocolos personalizados',
      icon: Target,
      href: '/skincare/tratamentos',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Lembretes',
      description: 'Configure alertas',
      icon: Bell,
      href: '/skincare/lembretes',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      title: 'Produtos',
      description: 'Recomendações personalizadas',
      icon: ShoppingBag,
      href: '/skincare/produtos',
      gradient: 'from-rose-400 to-pink-600',
    },
    {
      title: 'Minha Assinatura',
      description: 'Gerencie seu plano',
      icon: Crown,
      href: '/skincare/assinatura',
      gradient: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <SkincareLayout>
      <div className="space-y-8">
        {/* Header com saudação */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Olá, {userName}! ✨
          </h1>
          <p className="text-lg text-gray-600">
            Sua pele merece o melhor cuidado todos os dias
          </p>
        </div>

        {/* Trial Banner */}
        {planType === 'free' && trialDaysLeft > 0 && (
          <Link href="/skincare/assinatura">
            <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-2xl hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Crown className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {trialDaysLeft} dias grátis restantes!
                    </h3>
                    <p className="text-white/90 text-sm">
                      Desbloqueie análise por IA, tratamentos personalizados e muito mais
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-2xl font-bold">R$ 29,99</div>
                  <div className="text-sm text-white/80">por mês</div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                  {action.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold">
                      {action.badge}
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dica do Dia */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                💡 Dica do Dia
              </h3>
              <p className="text-gray-700">
                Beba pelo menos 2 litros de água por dia! A hidratação interna é tão importante quanto a externa para manter sua pele saudável e radiante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SkincareLayout>
  );
}
