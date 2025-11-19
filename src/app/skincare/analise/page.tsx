'use client';

import { useState } from 'react';
import SkincareLayout from '../components/SkincareLayout';
import { Camera, Upload, Sparkles, AlertCircle, CheckCircle, Crown } from 'lucide-react';
import Link from 'next/link';

export default function AnalisePage() {
  const [planType] = useState<'free' | 'premium' | 'ultra'>('free');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (planType === 'free') return;
    
    setAnalyzing(true);
    // Simula análise
    setTimeout(() => {
      setResult({
        acne: { level: 'moderado', score: 35, description: 'Algumas lesões ativas detectadas' },
        spots: { level: 'leve', score: 20, description: 'Poucas manchas superficiais' },
        pores: { level: 'normal', score: 45, description: 'Poros visíveis na zona T' },
        texture: { level: 'boa', score: 75, description: 'Textura uniforme e suave' },
        hydration: { level: 'boa', score: 70, description: 'Boa hidratação geral' }
      });
      setAnalyzing(false);
    }, 3000);
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'excelente': 'from-green-400 to-emerald-500',
      'boa': 'from-blue-400 to-cyan-500',
      'normal': 'from-yellow-400 to-orange-400',
      'moderado': 'from-orange-400 to-red-400',
      'grave': 'from-red-500 to-rose-600',
      'leve': 'from-green-300 to-teal-400'
    };
    return colors[level] || 'from-gray-400 to-gray-500';
  };

  if (planType === 'free') {
    return (
      <SkincareLayout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Crown className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Análise por IA
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Recurso exclusivo para assinantes Premium e Ultra
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">O que você terá acesso:</h3>
            <div className="space-y-4 text-left">
              {[
                'Análise detalhada de manchas, acne e poros',
                'Diagnóstico preciso com inteligência artificial',
                'Recomendações personalizadas de tratamento',
                'Acompanhamento da evolução com gráficos',
                'Comparação de fotos antes e depois'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/skincare/assinatura"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            <Crown className="w-6 h-6" />
            Assinar Agora
          </Link>
        </div>
      </SkincareLayout>
    );
  }

  return (
    <SkincareLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Análise da Pele por IA
          </h1>
          <p className="text-gray-600 mt-2">Tire uma foto e receba diagnóstico instantâneo</p>
        </div>

        {/* Upload Area */}
        {!result && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="border-4 border-dashed border-pink-200 rounded-2xl p-12 text-center hover:border-pink-400 transition-colors cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Tire ou envie uma foto
                </h3>
                <p className="text-gray-600 mb-6">
                  Para melhores resultados, tire a foto com boa iluminação natural
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleAnalyze}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
                  >
                    <Camera className="w-5 h-5" />
                    Tirar Foto
                  </button>
                  <button
                    onClick={handleAnalyze}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-pink-300 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    Enviar Foto
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analyzing */}
        {analyzing && (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Analisando sua pele...</h3>
            <p className="text-gray-600">Nossa IA está processando a imagem</p>
          </div>
        )}

        {/* Results */}
        {result && !analyzing && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold">Análise Concluída!</h3>
                  <p className="text-white/90">Confira os resultados abaixo</p>
                </div>
              </div>
            </div>

            {/* Resultados detalhados */}
            <div className="grid gap-4">
              {Object.entries(result).map(([key, data]: [string, any]) => (
                <div key={key} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getLevelColor(data.level)} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-2xl font-bold text-white">{data.score}%</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-800 capitalize">{key}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getLevelColor(data.level)}`}>
                          {data.level}
                        </span>
                      </div>
                      <p className="text-gray-600">{data.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recomendações */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Recomendações Personalizadas</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Continue com sua rotina de limpeza 2x ao dia</li>
                    <li>• Adicione um sérum com ácido salicílico para controle de acne</li>
                    <li>• Use protetor solar FPS 50+ diariamente</li>
                    <li>• Considere tratamento específico para manchas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 px-6 py-3 bg-white border-2 border-pink-300 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
              >
                Nova Análise
              </button>
              <Link
                href="/skincare/tratamentos"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform text-center"
              >
                Ver Tratamentos
              </Link>
            </div>
          </div>
        )}
      </div>
    </SkincareLayout>
  );
}
