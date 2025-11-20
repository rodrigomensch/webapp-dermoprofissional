"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import LoginPage from '@/components/auth/LoginPage'
import ProfessionalDashboard from '@/components/professional/ProfessionalDashboard'
import PatientDashboard from '@/components/patient/PatientDashboard'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'professional' | 'patient'>('professional')
  const [userId, setUserId] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsLoggedIn(true)
      setUserId(session.user.id)
      // Verificar role do usuário
      const role = session.user.user_metadata?.role || 'professional'
      setUserRole(role)
    }
    setLoading(false)
  }

  const handleLogin = async (role: 'professional' | 'patient', email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      setUserRole(role)
      setUserId(data.user.id)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Erro ao fazer login. Verifique suas credenciais.')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    setUserId('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (userRole === 'professional') {
    return <ProfessionalDashboard userId={userId} onLogout={handleLogout} />
  }

  return <PatientDashboard userId={userId} onLogout={handleLogout} />
}
