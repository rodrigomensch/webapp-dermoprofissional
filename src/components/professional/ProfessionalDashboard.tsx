"use client"

import { useState } from 'react'
import { 
  Users, Calendar, DollarSign, Settings, LogOut, 
  Plus, Search, Bell, TrendingUp, Clock, FileText,
  LayoutDashboard, Clipboard, Image, Package
} from 'lucide-react'
import PatientsManagement from './PatientsManagement'
import AppointmentsCalendar from './AppointmentsCalendar'
import FinancialControl from './FinancialControl'
import SubscriptionPlans from './SubscriptionPlans'

interface ProfessionalDashboardProps {
  userId: string
  onLogout: () => void
}

export default function ProfessionalDashboard({ userId, onLogout }: ProfessionalDashboardProps) {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'patients' | 'calendar' | 'financial' | 'plans' | 'settings'>('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'calendar', label: 'Agenda', icon: Calendar },
    { id: 'financial', label: 'Financeiro', icon: DollarSign },
    { id: 'plans', label: 'Planos', icon: Package },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ]

  const stats = [
    { label: 'Pacientes Ativos', value: '48', icon: Users, color: 'from-cyan-500 to-blue-600' },
    { label: 'Consultas Hoje', value: '8', icon: Calendar, color: 'from-blue-500 to-indigo-600' },
    { label: 'Receita Mensal', value: 'R$ 12.450', icon: DollarSign, color: 'from-emerald-500 to-teal-600' },
    { label: 'Taxa de Retorno', value: '87%', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Clipboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">SkinCare Pro</h1>
              <p className="text-xs text-gray-500">Profissional</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'patients' && 'Gestão de Pacientes'}
              {activeSection === 'calendar' && 'Agenda de Atendimentos'}
              {activeSection === 'financial' && 'Controle Financeiro'}
              {activeSection === 'plans' && 'Planos e Assinaturas'}
              {activeSection === 'settings' && 'Configurações'}
            </h2>
            <p className="text-gray-600">
              {activeSection === 'dashboard' && 'Visão geral do seu consultório'}
              {activeSection === 'patients' && 'Gerencie seus pacientes e históricos clínicos'}
              {activeSection === 'calendar' && 'Organize suas consultas e compromissos'}
              {activeSection === 'financial' && 'Acompanhe receitas e despesas'}
              {activeSection === 'plans' && 'Gerencie planos e assinaturas'}
              {activeSection === 'settings' && 'Personalize suas preferências'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DR</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Dr. Silva</p>
                <p className="text-xs text-gray-500">Dermatologista</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        {activeSection === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Próximas Consultas</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Maria Silva', time: '09:00', type: 'Avaliação Inicial' },
                    { name: 'João Santos', time: '10:30', type: 'Retorno' },
                    { name: 'Ana Costa', time: '14:00', type: 'Procedimento' },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{appointment.name}</p>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                      <span className="text-sm font-medium text-cyan-600">{appointment.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Atividades Recentes</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Nova avaliação registrada', patient: 'Maria Silva', time: '2h atrás' },
                    { action: 'Rotina de skincare criada', patient: 'João Santos', time: '5h atrás' },
                    { action: 'Fotos comparativas adicionadas', patient: 'Ana Costa', time: '1 dia atrás' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-cyan-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.patient}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'patients' && <PatientsManagement />}
        {activeSection === 'calendar' && <AppointmentsCalendar />}
        {activeSection === 'financial' && <FinancialControl />}
        {activeSection === 'plans' && <SubscriptionPlans />}
        {activeSection === 'settings' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Configurações do Perfil</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" defaultValue="Dr. Silva" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Especialidade</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" defaultValue="Dermatologista" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CRM</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" defaultValue="12345-SP" />
              </div>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all">
                Salvar Alterações
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
