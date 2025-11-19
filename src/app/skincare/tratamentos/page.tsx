'use client';

import { useState } from 'react';
import SkincareLayout from '../components/SkincareLayout';
import { Sparkles, Plus, TrendingUp, Calendar, CheckCircle, Target } from 'lucide-react';

interface Treatment {
  id: string;
  name: string;
  type: 'manchas' | 'acne' | 'poros';
  duration: number;
  currentDay: number;
  steps: string[];
  progress: number;
}

export default function TratamentosPage() {
  const [treatments] = useState<Treatment[]>([
    {
      id: '1',
      name: 'Tratamento Anti-Manchas',
      type: 'manchas',
      duration: 30,
      currentDay: 12,
      steps: [
        'Aplicar sérum clareador 2x ao dia',
        'Usar protetor solar FPS 50+',
        'Evitar exposição solar direta',
        'Hidratar bem a pele'
      ],
      progress: 40
    },
    {
      id: '2',
      name: 'Protocolo Anti-Acne',
      type: 'acne',
      duration: 60,
      currentDay: 25,
      steps: [
        'Limpeza profunda 2x ao dia',
        'Aplicar ácido salicílico à noite',
        'Evitar produtos oleosos',
        'Trocar fronha regularmente'
      ],
      progress: 42
    }
  ]);

  const availableTreatments = [
    {
      name: 'Minimizador de Poros',
      type: 'poros',
      duration: 45,
      description: 'Reduza a aparência dos poros com tratamento específico',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Clareamento Intensivo',
      type: 'manchas',
      duration: 60,
      description: 'Tratamento avançado para manchas persistentes',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Controle de Oleosidade',
      type: 'acne',
      duration: 30,
      description: 'Equilibre a produção de sebo da pele',
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      manchas: 'from-purple-400 to-pink-500',
      acne: 'from-orange-400 to-red-500',
      poros: 'from-cyan-400 to-blue-500'
    };
    return colors[type] || 'from-gray-400 to-gray-500';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      manchas: 'Manchas',
      acne: 'Acne',
      poros: 'Poros'
    };
    return labels[type] || type;
  };

  return (
    <SkincareLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Tratamentos Personalizados
          </h1>
          <p className="text-gray-600 mt-2">Protocolos específicos para suas necessidades</p>
        </div>

        {/* Tratamentos Ativos */}
        {treatments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Tratamentos em Andamento</h2>
            {treatments.map((treatment) => (
              <div key={treatment.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getTypeColor(treatment.type)} flex items-center justify-center flex-shrink-0`}>
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {treatment.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(treatment.type)}`}>
                          {getTypeLabel(treatment.type)}
                        </span>
                        <span className="text-sm text-gray-600">
                          Dia {treatment.currentDay} de {treatment.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800">{treatment.progress}%</div>
                    <div className="text-xs text-gray-600">Progresso</div>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="mb-4">
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getTypeColor(treatment.type)} rounded-full transition-all duration-500`}
                      style={{ width: `${treatment.progress}%` }}
                    />
                  </div>
                </div>

                {/* Passos do Tratamento */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 mb-3">Passos Diários:</h4>
                  {treatment.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Ações */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform">
                    Marcar Dia Completo
                  </button>
                  <button className="px-4 py-2 bg-white border-2 border-pink-300 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-colors">
                    Ver Evolução
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Novos Tratamentos Disponíveis */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Novos Tratamentos</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform text-sm">
              <Plus className="w-4 h-4" />
              Criar Personalizado
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTreatments.map((treatment, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${treatment.gradient} flex items-center justify-center mb-4`}>
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {treatment.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {treatment.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{treatment.duration} dias</span>
                </div>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform">
                  Iniciar Tratamento
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">2</div>
                <div className="text-sm text-gray-600">Ativos</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">41%</div>
                <div className="text-sm text-gray-600">Progresso Médio</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">37</div>
                <div className="text-sm text-gray-600">Dias Totais</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Dica de Tratamento</h3>
              <p className="text-gray-700">
                Para melhores resultados, siga o tratamento consistentemente todos os dias. Tire fotos semanais para acompanhar sua evolução!
              </p>
            </div>
          </div>
        </div>
      </div>
    </SkincareLayout>
  );
}
