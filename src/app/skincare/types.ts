// Tipos do módulo de skincare

export type PlanType = 'free' | 'premium' | 'ultra';

export type SkinType = 'oleosa' | 'seca' | 'mista' | 'normal' | 'sensivel';

export type TimeOfDay = 'manha' | 'noite';

export interface User {
  id: string;
  name: string;
  email: string;
  planType: PlanType;
  trialEndsAt?: Date;
  skinType?: SkinType;
  avatar?: string;
}

export interface RoutineStep {
  id: string;
  order: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
  completed?: boolean;
}

export interface Routine {
  id: string;
  timeOfDay: TimeOfDay;
  steps: RoutineStep[];
  lastCompleted?: Date;
}

export interface DiaryEntry {
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

export interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  days: number[];
  enabled: boolean;
  type: 'routine' | 'product' | 'treatment';
}

export interface Treatment {
  id: string;
  name: string;
  type: 'manchas' | 'acne' | 'poros';
  duration: number;
  currentDay: number;
  steps: string[];
  progress: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  skinTypes: SkinType[];
  price: number;
  rating: number;
  image: string;
}
