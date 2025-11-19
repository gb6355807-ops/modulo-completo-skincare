'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SkincareLayout from '../components/SkincareLayout';
import { Sun, Moon, Check, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { morningRoutine, nightRoutine } from '@/lib/skincare-data';
import { RoutineStep } from '../types';

export default function RotinasPage() {
  const searchParams = useSearchParams();
  const timeParam = searchParams.get('time');
  
  const [selectedTime, setSelectedTime] = useState<'manha' | 'noite'>(
    timeParam === 'noite' ? 'noite' : 'manha'
  );
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const currentRoutine = selectedTime === 'manha' ? morningRoutine : nightRoutine;
  const progress = (completedSteps.size / currentRoutine.steps.length) * 100;

  useEffect(() => {
    if (progress === 100 && completedSteps.size > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [progress, completedSteps.size]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Droplets: '💧',
      Sparkles: '✨',
      Sun: '☀️',
      Heart: '💖',
      Shield: '🛡️',
      Eraser: '🧹',
      Waves: '🌊',
      Moon: '🌙',
    };
    return icons[iconName] || '✨';
  };

  return (
    <SkincareLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Rotinas de Skincare
          </h1>
          <p className="text-gray-600">
            Siga o passo a passo para uma pele radiante
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setSelectedTime('manha')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all ${
              selectedTime === 'manha'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg'
            }`}
          >
            <Sun className="w-6 h-6" />
            <span>Manhã</span>
          </button>
          <button
            onClick={() => setSelectedTime('noite')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all ${
              selectedTime === 'noite'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg'
            }`}
          >
            <Moon className="w-6 h-6" />
            <span>Noite</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Progresso da Rotina
            </span>
            <span className="text-sm font-bold text-pink-600">
              {completedSteps.size}/{currentRoutine.steps.length}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <div className="mt-4 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-sm font-semibold text-green-600">
                Parabéns! Rotina completa!
              </p>
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {currentRoutine.steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                  isCompleted ? 'ring-2 ring-green-400' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step Number/Check */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                        : 'bg-gradient-to-br from-pink-400 to-purple-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-xl text-white font-bold">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {getIconComponent(step.icon)}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800">
                          {step.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className={`w-5 h-5 flex-shrink-0 transition-all ${
                      isCompleted ? 'text-green-500' : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                💡 Dicas para {selectedTime === 'manha' ? 'Manhã' : 'Noite'}
              </h3>
              {selectedTime === 'manha' ? (
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Use água morna, nunca quente</li>
                  <li>• Protetor solar é OBRIGATÓRIO, mesmo em dias nublados</li>
                  <li>• Aguarde 2-3 minutos entre cada produto</li>
                </ul>
              ) : (
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Remova toda maquiagem antes de dormir</li>
                  <li>• Use produtos mais nutritivos à noite</li>
                  <li>• Troque a fronha regularmente</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* CTA Premium */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">
                🔔 Configure Lembretes Automáticos
              </h3>
              <p className="text-white/90 text-sm">
                Nunca mais esqueça sua rotina com notificações personalizadas
              </p>
            </div>
            <button className="hidden sm:block px-6 py-3 bg-white text-orange-600 rounded-full font-semibold hover:scale-105 transition-transform">
              Ativar Premium
            </button>
          </div>
        </div>
      </div>
    </SkincareLayout>
  );
}
