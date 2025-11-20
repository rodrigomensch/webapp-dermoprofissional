"use client"

import { useState } from 'react'
import { Plus, Save, Clock, Sun, Moon, Droplets, Sparkles, AlertCircle } from 'lucide-react'

interface SkincareRoutineProps {
  patientId: string
}

export default function SkincareRoutine({ patientId }: SkincareRoutineProps) {
  const [routine, setRoutine] = useState({
    morning: [
      { step: 1, product: 'Sabonete Facial Suave', frequency: 'Diário', instructions: 'Lavar o rosto com água morna' },
      { step: 2, product: 'Tônico Hidratante', frequency: 'Diário', instructions: 'Aplicar com algodão' },
      { step: 3, product: 'Sérum Vitamina C', frequency: 'Diário', instructions: '3-4 gotas no rosto' },
      { step: 4, product: 'Hidratante Facial', frequency: 'Diário', instructions: 'Aplicar uniformemente' },
      { step: 5, product: 'Protetor Solar FPS 50+', frequency: 'Diário', instructions: 'Reaplicar a cada 2-3 horas' },
    ],
    night: [
      { step: 1, product: 'Demaquilante Bifásico', frequency: 'Diário', instructions: 'Remover toda maquiagem' },
      { step: 2, product: 'Sabonete Facial', frequency: 'Diário', instructions: 'Limpeza profunda' },
      { step: 3, product: 'Ácido Glicólico 10%', frequency: '3x por semana', instructions: 'Aplicar à noite' },
      { step: 4, product: 'Sérum de Niacinamida', frequency: 'Diário', instructions: '3-4 gotas' },
      { step: 5, product: 'Creme Noturno', frequency: 'Diário', instructions: 'Aplicar generosamente' },
    ],
    weekly: [
      { product: 'Máscara de Argila', frequency: '2x por semana', instructions: 'Deixar agir por 15 minutos' },
      { product: 'Esfoliante Facial', frequency: '1x por semana', instructions: 'Movimentos circulares suaves' },
    ]
  })

  const [showAddProduct, setShowAddProduct] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'morning' | 'night' | 'weekly'>('morning')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Rotina de Skincare Personalizada</h3>
          <p className="text-gray-600">Crie e gerencie a rotina completa do paciente</p>
        </div>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Adicionar Produto
        </button>
      </div>

      {/* Morning Routine */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Rotina Matinal</h4>
            <p className="text-sm text-gray-600">Aplicar pela manhã, após acordar</p>
          </div>
        </div>
        <div className="space-y-3">
          {routine.morning.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-orange-600 shadow-sm">
                {item.step}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.product}</p>
                <p className="text-sm text-gray-600 mt-1">{item.instructions}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white text-orange-600 text-xs font-medium rounded-full">
                  {item.frequency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Night Routine */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Rotina Noturna</h4>
            <p className="text-sm text-gray-600">Aplicar antes de dormir</p>
          </div>
        </div>
        <div className="space-y-3">
          {routine.night.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600 shadow-sm">
                {item.step}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.product}</p>
                <p className="text-sm text-gray-600 mt-1">{item.instructions}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white text-indigo-600 text-xs font-medium rounded-full">
                  {item.frequency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Treatments */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Tratamentos Semanais</h4>
            <p className="text-sm text-gray-600">Cuidados especiais periódicos</p>
          </div>
        </div>
        <div className="space-y-3">
          {routine.weekly.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <Droplets className="w-6 h-6 text-emerald-600 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.product}</p>
                <p className="text-sm text-gray-600 mt-1">{item.instructions}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white text-emerald-600 text-xs font-medium rounded-full">
                  {item.frequency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 mb-2">Recomendações Importantes</p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Sempre aplicar protetor solar, mesmo em dias nublados</li>
              <li>Aguardar 1-2 minutos entre cada produto para melhor absorção</li>
              <li>Evitar exposição solar direta após uso de ácidos</li>
              <li>Manter hidratação adequada (2L de água por dia)</li>
              <li>Em caso de irritação, suspender uso e contatar o profissional</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
          Gerar PDF
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg">
          <Save className="w-5 h-5" />
          Salvar Rotina
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Adicionar Produto</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option>Manhã</option>
                  <option>Noite</option>
                  <option>Semanal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Produto</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequência</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Ex: Diário, 3x por semana" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instruções de Uso</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
