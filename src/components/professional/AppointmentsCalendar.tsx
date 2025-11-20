"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, User, Calendar as CalendarIcon } from 'lucide-react'

export default function AppointmentsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [showAddAppointment, setShowAddAppointment] = useState(false)

  const appointments = [
    { id: '1', date: '2024-01-15', time: '09:00', patient: 'Maria Silva', type: 'Avaliação Inicial', duration: 60 },
    { id: '2', date: '2024-01-15', time: '10:30', patient: 'João Santos', type: 'Retorno', duration: 30 },
    { id: '3', date: '2024-01-15', time: '14:00', patient: 'Ana Costa', type: 'Procedimento', duration: 90 },
    { id: '4', date: '2024-01-16', time: '09:30', patient: 'Pedro Lima', type: 'Avaliação', duration: 60 },
    { id: '5', date: '2024-01-16', time: '15:00', patient: 'Carla Souza', type: 'Retorno', duration: 30 },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.filter(apt => apt.date === dateStr)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-2xl font-bold text-gray-900">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {['month', 'week', 'day'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === v
                    ? 'bg-white text-cyan-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {v === 'month' ? 'Mês' : v === 'week' ? 'Semana' : 'Dia'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddAppointment(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nova Consulta
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      {view === 'month' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const dayAppointments = getAppointmentsForDay(day)
              const isToday = day === new Date().getDate() && 
                             currentDate.getMonth() === new Date().getMonth() &&
                             currentDate.getFullYear() === new Date().getFullYear()
              
              return (
                <div
                  key={day}
                  className={`aspect-square p-2 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer ${
                    isToday ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-cyan-600' : 'text-gray-900'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map((apt) => (
                      <div
                        key={apt.id}
                        className="text-xs px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded truncate"
                      >
                        {apt.time} - {apt.patient.split(' ')[0]}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-600 px-2">
                        +{dayAppointments.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {view === 'day' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4">
            Consultas de {new Date().toLocaleDateString('pt-BR')}
          </h4>
          <div className="space-y-3">
            {appointments.filter(apt => apt.date === '2024-01-15').map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg hover:shadow-md transition-all">
                <div className="w-16 text-center">
                  <Clock className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900">{apt.time}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-600" />
                    <p className="font-medium text-gray-900">{apt.patient}</p>
                  </div>
                  <p className="text-sm text-gray-600">{apt.type} • {apt.duration} minutos</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all">
                    Iniciar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nova Consulta</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option>Selecione um paciente</option>
                  <option>Maria Silva</option>
                  <option>João Santos</option>
                  <option>Ana Costa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
                <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Consulta</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option>Avaliação Inicial</option>
                  <option>Retorno</option>
                  <option>Procedimento</option>
                  <option>Emergência</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duração (minutos)</label>
                <input type="number" className="w-full px-4 py-3 border border-gray-300 rounded-lg" defaultValue="60" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddAppointment(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
