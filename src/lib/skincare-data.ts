// Dados mock para o módulo de skincare
import { Routine, Product, Treatment } from '@/app/skincare/types';

export const morningRoutine: Routine = {
  id: 'morning-routine',
  timeOfDay: 'manha',
  steps: [
    {
      id: 'step-1',
      order: 1,
      title: 'Limpeza',
      description: 'Lave o rosto com água morna e sabonete facial suave',
      duration: '2 min',
      icon: 'Droplets',
    },
    {
      id: 'step-2',
      order: 2,
      title: 'Tônico',
      description: 'Aplique tônico facial com algodão ou com as mãos',
      duration: '1 min',
      icon: 'Sparkles',
    },
    {
      id: 'step-3',
      order: 3,
      title: 'Sérum Vitamina C',
      description: 'Aplique algumas gotas de sérum com vitamina C',
      duration: '1 min',
      icon: 'Sun',
    },
    {
      id: 'step-4',
      order: 4,
      title: 'Hidratante',
      description: 'Aplique hidratante facial adequado ao seu tipo de pele',
      duration: '2 min',
      icon: 'Heart',
    },
    {
      id: 'step-5',
      order: 5,
      title: 'Protetor Solar',
      description: 'Finalize com protetor solar FPS 50+',
      duration: '1 min',
      icon: 'Shield',
    },
  ],
};

export const nightRoutine: Routine = {
  id: 'night-routine',
  timeOfDay: 'noite',
  steps: [
    {
      id: 'step-1',
      order: 1,
      title: 'Demaquilante',
      description: 'Remova toda maquiagem com água micelar ou óleo demaquilante',
      duration: '3 min',
      icon: 'Eraser',
    },
    {
      id: 'step-2',
      order: 2,
      title: 'Limpeza Profunda',
      description: 'Lave o rosto com sabonete facial de limpeza profunda',
      duration: '2 min',
      icon: 'Droplets',
    },
    {
      id: 'step-3',
      order: 3,
      title: 'Esfoliação',
      description: 'Esfolie suavemente 2-3x por semana',
      duration: '2 min',
      icon: 'Sparkles',
    },
    {
      id: 'step-4',
      order: 4,
      title: 'Tônico',
      description: 'Aplique tônico facial para equilibrar o pH',
      duration: '1 min',
      icon: 'Waves',
    },
    {
      id: 'step-5',
      order: 5,
      title: 'Sérum Noturno',
      description: 'Aplique sérum com ácido hialurônico ou retinol',
      duration: '1 min',
      icon: 'Moon',
    },
    {
      id: 'step-6',
      order: 6,
      title: 'Creme Noturno',
      description: 'Finalize com creme noturno nutritivo',
      duration: '2 min',
      icon: 'Heart',
    },
  ],
};

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Sérum Vitamina C 20%',
    brand: 'SkinGlow',
    category: 'Sérum',
    skinTypes: ['oleosa', 'mista', 'normal'],
    price: 89.90,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
  },
  {
    id: 'prod-2',
    name: 'Hidratante Ácido Hialurônico',
    brand: 'HydraLux',
    category: 'Hidratante',
    skinTypes: ['seca', 'normal', 'sensivel'],
    price: 79.90,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
  },
  {
    id: 'prod-3',
    name: 'Protetor Solar FPS 60',
    brand: 'SunCare',
    category: 'Protetor Solar',
    skinTypes: ['oleosa', 'mista', 'normal', 'seca', 'sensivel'],
    price: 69.90,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
  },
  {
    id: 'prod-4',
    name: 'Tônico Facial Calmante',
    brand: 'PureBalance',
    category: 'Tônico',
    skinTypes: ['sensivel', 'seca', 'normal'],
    price: 59.90,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop',
  },
];

export const mockTreatments: Treatment[] = [
  {
    id: 'treat-1',
    name: 'Tratamento Anti-Manchas',
    type: 'manchas',
    duration: 30,
    currentDay: 7,
    steps: [
      'Aplicar sérum clareador 2x ao dia',
      'Usar protetor solar FPS 50+',
      'Evitar exposição solar direta',
      'Hidratar bem a pele',
    ],
    progress: 23,
  },
  {
    id: 'treat-2',
    name: 'Protocolo Anti-Acne',
    type: 'acne',
    duration: 60,
    currentDay: 15,
    steps: [
      'Limpeza profunda 2x ao dia',
      'Aplicar ácido salicílico à noite',
      'Evitar produtos oleosos',
      'Trocar fronha regularmente',
    ],
    progress: 25,
  },
];
