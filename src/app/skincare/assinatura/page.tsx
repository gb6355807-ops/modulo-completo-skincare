'use client';

import { useState } from 'react';
import SkincareLayout from '../components/SkincareLayout';
import { Crown, Check, Sparkles, Camera, Bell, TrendingUp, Heart, Zap, Star } from 'lucide-react';

export default function AssinaturaPage() {
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'ultra'>('premium');

  const plans = [
    {
      id: 'premium',
      name: 'Premium',
      price: 29.99,
      icon: Crown,
      gradient: 'from-pink-400 to-rose-500',
      popular: true,
      features: [
        { text: '3 dias grátis para testar', icon: Star },
        { text: 'Análise de pele por IA', icon: Camera },
        { text: 'Lembretes personalizados', icon: Bell },
        { text: 'Diário ilimitado com fotos', icon: Heart },
        { text: 'Gráficos de evolução', icon: TrendingUp },
        { text: 'Tratamentos personalizados', icon: Sparkles },
        { text: 'Sugestões de produtos', icon: Heart },
        { text: 'Sem anúncios', icon: Zap },
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 39.99,
      icon: Sparkles,
      gradient: 'from-purple-500 to-indigo-600',
      popular: false,
      features: [
        { text: 'Tudo do Premium +', icon: Crown },
        { text: 'Análises ilimitadas por IA', icon: Camera },
        { text: 'Consulta com dermatologista', icon: Heart },
        { text: 'Rotinas personalizadas por IA', icon: Sparkles },
        { text: 'Acompanhamento semanal', icon: TrendingUp },
        { text: 'Acesso a produtos exclusivos', icon: Star },
        { text: 'Suporte prioritário 24/7', icon: Zap },
        { text: 'Relatórios mensais detalhados', icon: TrendingUp },
      ],
    },
  ];

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)!;

  return (
    <SkincareLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border-2 border-amber-300">
            <Star className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              3 DIAS GRÁTIS • Cancele quando quiser
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transforme sua rotina de skincare com tecnologia de ponta e cuidados personalizados
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as 'premium' | 'ultra')}
                className={`relative bg-white rounded-3xl p-8 cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-4 ring-pink-400 shadow-2xl scale-[1.02]'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                    MAIS POPULAR
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <div
                    className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm text-gray-500">R$</span>
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price.toFixed(2).split('.')[0]}
                    </span>
                    <span className="text-2xl text-gray-500">,99</span>
                    <span className="text-sm text-gray-500">/mês</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    isSelected
                      ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? 'Plano Selecionado' : 'Selecionar Plano'}
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center space-y-4">
          <button
            className={`px-12 py-5 rounded-2xl font-bold text-lg text-white shadow-2xl hover:scale-105 transition-all bg-gradient-to-r ${selectedPlanData.gradient}`}
          >
            Começar 3 Dias Grátis
          </button>
          <p className="text-sm text-gray-500">
            Após o período de teste, será cobrado R$ {selectedPlanData.price.toFixed(2)}/mês
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 border-2 border-pink-200">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Por que escolher o Premium?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Camera,
                title: 'IA Avançada',
                description: 'Análise precisa da sua pele',
              },
              {
                icon: TrendingUp,
                title: 'Evolução Real',
                description: 'Acompanhe resultados visíveis',
              },
              {
                icon: Sparkles,
                title: 'Personalizado',
                description: 'Tratamentos feitos para você',
              },
              {
                icon: Heart,
                title: 'Sem Limites',
                description: 'Use quantas vezes quiser',
              },
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <BenefitIcon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Perguntas Frequentes
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: 'Posso cancelar a qualquer momento?',
                a: 'Sim! Você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas.',
              },
              {
                q: 'Como funciona o período de teste?',
                a: 'Você tem 3 dias grátis para testar todos os recursos Premium. Após esse período, será cobrado automaticamente.',
              },
              {
                q: 'Posso mudar de plano depois?',
                a: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.',
              },
              {
                q: 'Os dados do período gratuito são mantidos?',
                a: 'Sim! Todas as suas fotos, anotações e progresso são mantidos mesmo após o período de teste.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <h4 className="font-bold text-gray-800 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Cancele Quando Quiser</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Dados Protegidos</span>
          </div>
        </div>
      </div>
    </SkincareLayout>
  );
}
