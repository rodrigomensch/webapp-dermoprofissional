"use client"

import { useState } from 'react'
import { 
  ArrowLeft, User, Phone, Mail, Calendar, FileText, Image as ImageIcon,
  Plus, Edit, TrendingUp, Clock, AlertCircle, Camera, Download
} from 'lucide-react'
import SkinAnalysis from './SkinAnalysis'
import SkincareRoutine from './SkincareRoutine'
import PhotoComparison from './PhotoComparison'

interface PatientDetailsProps {
  patientId: string
  onBack: () => void
}

export default function PatientDetails({ patientId, onBack }: PatientDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'routine' | 'timeline' | 'photos'>('overview')

  // Mock data
  const patient = {
    id: patientId,
    name: 'Maria Silva',
    age: 32,
    phone: '(11) 98765-4321',
    email: 'maria@email.com',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    registrationDate: '2023-06-15',
    skinType: 'Mista',
    mainConcerns: ['Acne', 'Oleosidade', 'Poros dilatados'],
    allergies: ['Ácido salicílico'],
    previousTreatments: ['Limpeza de pele profunda', 'Peeling químico'],
    clinicalHistory: 'Paciente apresenta histórico de acne desde a adolescência. Já realizou diversos tratamentos com resultados parciais.'
  }

  const appointments = [
    { date: '2024-01-15', type: 'Avaliação', notes: 'Melhora significativa na oleosidade' },
    { date: '2024-01-08', type: 'Retorno', notes: 'Paciente seguindo rotina corretamente' },
    { date: '2023-12-20', type: 'Inicial', notes: 'Primeira avaliação completa realizada' },
  ]

  const tabs = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'analysis', label: 'Análise da Pele' },
    { id: 'routine', label: 'Rotina de Skincare' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'photos', label: 'Fotos Comparativas' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-gray-600">{patient.age} anos • {patient.skinType}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-all">
          <Edit className="w-4 h-4" />
          Editar
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="font-medium text-gray-900">{patient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-600">E-mail</p>
                    <p className="font-medium text-gray-900">{patient.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-600">Cadastro</p>
                    <p className="font-medium text-gray-900">{new Date(patient.registrationDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Pele</p>
                    <p className="font-medium text-gray-900">{patient.skinType}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Endereço</p>
                <p className="font-medium text-gray-900">{patient.address}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Histórico Clínico</h3>
              <p className="text-gray-700 mb-4">{patient.clinicalHistory}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Principais Queixas:</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.mainConcerns.map((concern, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Alergias:</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Tratamentos Anteriores:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {patient.previousTreatments.map((treatment, index) => (
                      <li key={index} className="text-gray-700">{treatment}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Últimas Consultas</h3>
              <div className="space-y-3">
                {appointments.map((appointment, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-cyan-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-cyan-600 mb-1">{appointment.type}</p>
                    <p className="text-sm text-gray-600">{appointment.notes}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all">
                <Plus className="w-5 h-5" />
                Nova Consulta
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && <SkinAnalysis patientId={patientId} />}
      {activeTab === 'routine' && <SkincareRoutine patientId={patientId} />}
      {activeTab === 'photos' && <PhotoComparison patientId={patientId} />}
      
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Timeline de Evolução</h3>
          <div className="space-y-6">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  {index < appointments.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{appointment.type}</span>
                      <span className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-gray-700">{appointment.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
