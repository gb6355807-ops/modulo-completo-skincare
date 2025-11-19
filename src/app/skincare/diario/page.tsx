'use client';

import { useState } from 'react';
import SkincareLayout from '../components/SkincareLayout';
import { Camera, Plus, TrendingUp, Calendar, Image as ImageIcon, FileText } from 'lucide-react';
import Link from 'next/link';

interface DiaryEntry {
  id: string;
  date: Date;
  photos: string[];
  notes: string;
  skinCondition: {
    hydration: number;
    acne: number;
    spots: number;
    texture: number;
  };
}

export default function DiarioPage() {
  const [entries] = useState<DiaryEntry[]>([
    {
      id: '1',
      date: new Date('2024-01-15'),
      photos: ['https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop'],
      notes: 'Pele mais hidratada hoje! Comecei a usar o novo sérum.',
      skinCondition: { hydration: 75, acne: 20, spots: 30, texture: 80 }
    },
    {
      id: '2',
      date: new Date('2024-01-10'),
      photos: ['https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop'],
      notes: 'Notei algumas manchas novas. Vou aumentar o uso do protetor solar.',
      skinCondition: { hydration: 65, acne: 35, spots: 45, texture: 70 }
    },
    {
      id: '3',
      date: new Date('2024-01-05'),
      photos: ['https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop'],
      notes: 'Primeira foto do diário! Animada para acompanhar a evolução.',
      skinCondition: { hydration: 60, acne: 40, spots: 50, texture: 65 }
    }
  ]);

  const [planType] = useState<'free' | 'premium' | 'ultra'>('free');

  const getConditionColor = (value: number) => {
    if (value >= 70) return 'from-green-400 to-emerald-500';
    if (value >= 40) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  const getConditionLabel = (key: string) => {
    const labels: Record<string, string> = {
      hydration: 'Hidratação',
      acne: 'Acne',
      spots: 'Manchas',
      texture: 'Textura'
    };
    return labels[key] || key;
  };

  return (
    <SkincareLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Diário da Pele
            </h1>
            <p className="text-gray-600 mt-1">Acompanhe sua evolução com fotos e anotações</p>
          </div>
          <Link
            href="/skincare/diario/nova-entrada"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nova Entrada
          </Link>
        </div>

        {/* Gráfico de Evolução */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Evolução da Pele</h2>
              <p className="text-sm text-gray-600">Últimos 30 dias</p>
            </div>
          </div>

          {/* Gráfico simplificado */}
          <div className="space-y-4">
            {Object.entries(entries[0].skinCondition).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{getConditionLabel(key)}</span>
                  <span className="text-sm font-bold text-gray-800">{value}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getConditionColor(value)} rounded-full transition-all duration-500`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {planType === 'free' && (
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-semibold">✨ Premium:</span> Desbloqueie gráficos detalhados e comparação de fotos lado a lado
              </p>
            </div>
          )}
        </div>

        {/* Lista de Entradas */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Foto */}
                <div className="flex-shrink-0">
                  <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={entry.photos[0]}
                      alt="Foto da pele"
                      className="w-full h-full object-cover"
                    />
                    {entry.photos.length > 1 && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                        +{entry.photos.length - 1}
                      </div>
                    )}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {entry.date.toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>

                  <p className="text-gray-700">{entry.notes}</p>

                  {/* Mini indicadores */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(entry.skinCondition).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xs text-gray-600 mb-1">{getConditionLabel(key)}</div>
                        <div className="text-lg font-bold text-gray-800">{value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {entries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhuma entrada ainda</h3>
            <p className="text-gray-600 mb-6">Comece seu diário da pele hoje mesmo!</p>
            <Link
              href="/skincare/diario/nova-entrada"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              Criar Primeira Entrada
            </Link>
          </div>
        )}
      </div>
    </SkincareLayout>
  );
}
