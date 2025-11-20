"use client"

import { useState } from 'react'
import { 
  Plus, Search, Eye, Edit, Trash2, User, Phone, Mail, 
  Calendar, FileText, Image, TrendingUp, Clock, AlertCircle
} from 'lucide-react'
import PatientDetails from './PatientDetails'

export default function PatientsManagement() {
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddPatient, setShowAddPatient] = useState(false)

  const patients = [
    { 
      id: '1', 
      name: 'Maria Silva', 
      age: 32, 
      phone: '(11) 98765-4321', 
      email: 'maria@email.com',
      lastVisit: '2024-01-15',
      skinType: 'Mista',
      status: 'Ativo'
    },
    { 
      id: '2', 
      name: 'João Santos', 
      age: 28, 
      phone: '(11) 91234-5678', 
      email: 'joao@email.com',
      lastVisit: '2024-01-10',
      skinType: 'Oleosa',
      status: 'Ativo'
    },
    { 
      id: '3', 
      name: 'Ana Costa', 
      age: 45, 
      phone: '(11) 99876-5432', 
      email: 'ana@email.com',
      lastVisit: '2024-01-08',
      skinType: 'Seca',
      status: 'Ativo'
    },
  ]

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (showPatientDetails && selectedPatientId) {
    return (
      <PatientDetails 
        patientId={selectedPatientId} 
        onBack={() => {
          setShowPatientDetails(false)
          setSelectedPatientId(null)
        }} 
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar paciente por nome ou e-mail..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAddPatient(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Novo Paciente
        </button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.age} anos</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {patient.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Última visita: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>Tipo de pele: {patient.skinType}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedPatientId(patient.id)
                  setShowPatientDetails(true)
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-all"
              >
                <Eye className="w-4 h-4" />
                Ver Detalhes
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Novo Paciente</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                  <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Histórico Clínico</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24" placeholder="Descreva o histórico clínico do paciente..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alergias Conhecidas</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20" placeholder="Liste as alergias conhecidas..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tratamentos Anteriores</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20" placeholder="Descreva tratamentos anteriores..."></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPatient(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Cadastrar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
