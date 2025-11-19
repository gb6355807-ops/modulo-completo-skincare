import { createClient } from '@supabase/supabase-js'

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERRO: Variáveis de ambiente do Supabase não encontradas!')
  console.error('📋 Para corrigir:')
  console.error('1. Acesse Configurações do Projeto')
  console.error('2. Vá em Integrações → Supabase')
  console.error('3. Selecione seu projeto Supabase')
  console.error('4. As credenciais serão configuradas automaticamente')
  console.error('')
  console.error('Status atual:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Definida' : '❌ Não definida')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Definida' : '❌ Não definida')
}

// Criar cliente do Supabase - REQUER variáveis válidas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '🔧 Configure o Supabase: Vá em Configurações do Projeto → Integrações → Supabase e selecione seu projeto'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          plan_type: 'free' | 'premium' | 'ultra'
          trial_ends_at: string | null
          skin_type: 'oleosa' | 'seca' | 'mista' | 'normal' | 'sensivel' | null
          avatar: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      routines: {
        Row: {
          id: string
          user_id: string
          time_of_day: 'manha' | 'noite'
          steps: any
          last_completed: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['routines']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['routines']['Insert']>
      }
      diary_entries: {
        Row: {
          id: string
          user_id: string
          date: string
          photos: string[]
          notes: string
          hydration: number
          acne: number
          spots: number
          texture: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['diary_entries']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['diary_entries']['Insert']>
      }
      reminders: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          time: string
          days: number[]
          enabled: boolean
          type: 'routine' | 'product' | 'treatment'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['reminders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['reminders']['Insert']>
      }
      treatments: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'manchas' | 'acne' | 'poros'
          duration: number
          current_day: number
          steps: string[]
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['treatments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['treatments']['Insert']>
      }
      products: {
        Row: {
          id: string
          name: string
          brand: string
          category: string
          skin_types: string[]
          price: number
          rating: number
          image: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
    }
  }
}
