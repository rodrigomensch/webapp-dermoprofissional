// Tipos principais do sistema

export type UserRole = 'professional' | 'patient' | 'admin'

export interface Professional {
  id: string
  email: string
  name: string
  specialty: string
  license_number: string
  phone: string
  avatar_url?: string
  plan: 'free' | 'premium'
  created_at: string
}

export interface Patient {
  id: string
  professional_id: string
  name: string
  email: string
  phone: string
  birth_date: string
  cpf: string
  address: string
  city: string
  state: string
  zip_code: string
  avatar_url?: string
  created_at: string
}

export interface ClinicalHistory {
  id: string
  patient_id: string
  allergies: string[]
  medications: string[]
  previous_treatments: string[]
  skin_conditions: string[]
  notes: string
  updated_at: string
}

export interface SkinAnalysis {
  id: string
  patient_id: string
  professional_id: string
  date: string
  skin_type: 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive'
  main_concerns: string[]
  severity_level: 1 | 2 | 3 | 4 | 5
  areas: {
    forehead: string
    eyes: string
    cheeks: string
    nose: string
    chin: string
    full_face: string
  }
  notes: string
  photos: string[]
  created_at: string
}

export interface SkincareRoutine {
  id: string
  patient_id: string
  professional_id: string
  name: string
  description: string
  start_date: string
  end_date?: string
  active: boolean
  steps: RoutineStep[]
  created_at: string
}

export interface RoutineStep {
  id: string
  routine_id: string
  order: number
  product_name: string
  product_category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen' | 'treatment' | 'mask' | 'eye_cream'
  instructions: string
  frequency: string
  time_of_day: 'morning' | 'night' | 'both'
  notes: string
}

export interface Appointment {
  id: string
  professional_id: string
  patient_id: string
  date: string
  time: string
  duration: number
  type: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  notes: string
  created_at: string
}

export interface ClinicalSession {
  id: string
  appointment_id: string
  patient_id: string
  professional_id: string
  date: string
  procedures: string[]
  products_used: string[]
  observations: string
  next_session_recommendation: string
  photos: string[]
  created_at: string
}

export interface FinancialRecord {
  id: string
  professional_id: string
  patient_id: string
  date: string
  type: 'service' | 'product' | 'procedure'
  description: string
  amount: number
  payment_method: string
  status: 'pending' | 'paid' | 'cancelled'
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'appointment' | 'routine' | 'evolution' | 'message'
  title: string
  message: string
  read: boolean
  created_at: string
}
