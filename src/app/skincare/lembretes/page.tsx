'use client';

import { useState } from 'react';
import SkincareLayout from '../components/SkincareLayout';
import { Bell, Plus, Clock, Calendar, Trash2, Edit } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  days: number[];
  enabled: boolean;
  type: 'routine' | 'product' | 'treatment';
}

export default function LembretesPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Rotina da Manhã',
      description: 'Hora de cuidar da sua pele!',
      time: '08:00',
      days: [1, 2, 3, 4, 5, 6, 7],
      enabled: true,
      type: 'routine'
    },
    {
      id: '2',
      title: 'Rotina da Noite',
      description: 'Não esqueça sua rotina noturna',
      time: '22:00',
      days: [1, 2, 3, 4, 5, 6, 7],
      enabled: true,
      type: 'routine'
    },
    {
      id: '3',
      title: 'Aplicar Protetor Solar',
      description: 'Reaplique o protetor solar',
      time: '12:00',
      days: [1, 2, 3, 4, 5],
      enabled: true,
      type: 'product'
    },
    {
      id: '4',
      title: 'Tratamento Anti-Manchas',
      description: 'Aplicar sérum clareador',
      time: '20:00',
      days: [1, 3, 5],
      enabled: false,
      type: 'treatment'
    }
  ]);

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      routine: 'from-blue-400 to-cyan-500',
      product: 'from-pink-400 to-rose-500',
      treatment: 'from-purple-400 to-indigo-500'
    };
    return colors[type] || 'from-gray-400 to-gray-500';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      routine: 'Rotina',
      product: 'Produto',
      treatment: 'Tratamento'
    };
    return labels[type] || type;
  };

  const getDayName = (day: number) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[day - 1];
  };

  return (
    <SkincareLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Lembretes
            </h1>
            <p className="text-gray-600 mt-1">Configure alertas para sua rotina de skincare</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
            <Plus className="w-5 h-5" />
            Novo Lembrete
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {reminders.filter(r => r.enabled).length}
                </div>
                <div className="text-sm text-gray-600">Ativos</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {reminders.length}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">7</div>
                <div className="text-sm text-gray-600">Dias/semana</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Lembretes */}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`bg-white rounded-2xl p-6 shadow-lg transition-all ${
                reminder.enabled ? 'border-2 border-pink-200' : 'opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Toggle */}
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-14 h-8 rounded-full transition-colors relative flex-shrink-0 ${
                    reminder.enabled
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      reminder.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>

                {/* Conteúdo */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {reminder.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{reminder.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {/* Horário */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {reminder.time}
                      </span>
                    </div>

                    {/* Tipo */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(reminder.type)}`}>
                      {getTypeLabel(reminder.type)}
                    </span>

                    {/* Dias */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                            reminder.days.includes(day)
                              ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {getDayName(day)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reminders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum lembrete configurado</h3>
            <p className="text-gray-600 mb-6">Crie lembretes para não esquecer sua rotina!</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" />
              Criar Primeiro Lembrete
            </button>
          </div>
        )}

        {/* Dica */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Dica</h3>
              <p className="text-gray-700">
                Configure lembretes nos horários que você costuma estar livre. A consistência é a chave para resultados visíveis!
              </p>
            </div>
          </div>
        </div>
      </div>
    </SkincareLayout>
  );
}
