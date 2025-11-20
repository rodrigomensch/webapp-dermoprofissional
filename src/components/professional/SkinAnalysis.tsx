"use client"

import { useState } from 'react'
import { Plus, Save, AlertCircle } from 'lucide-react'

interface SkinAnalysisProps {
  patientId: string
}

export default function SkinAnalysis({ patientId }: SkinAnalysisProps) {
  const [analysis, setAnalysis] = useState({
    skinType: 'Mista',
    mainConcerns: ['Acne', 'Oleosidade'],
    severity: 'Moderada',
    forehead: 'Oleosidade moderada, alguns comedões',
    eyes: 'Área sem alterações significativas',
    cheeks: 'Pele mista, tendência a ressecamento',
    chin: 'Oleosidade intensa, presença de acne',
    nose: 'Oleosidade intensa, poros dilatados',
    additionalNotes: 'Paciente apresenta melhora significativa após início do tratamento.'
  })

  const skinTypes = ['Normal', 'Seca', 'Oleosa', 'Mista', 'Sensível']
  const severityLevels = ['Leve', 'Moderada', 'Severa']
  const commonConcerns = ['Acne', 'Oleosidade', 'Ressecamento', 'Manchas', 'Rugas', 'Poros dilatados', 'Sensibilidade']

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Análise e Avaliação da Pele</h3>
        
        <form className="space-y-6">
          {/* Tipo de Pele */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Pele</label>
            <select 
              value={analysis.skinType}
              onChange={(e) => setAnalysis({...analysis, skinType: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
            >
              {skinTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Principais Queixas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Principais Queixas</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonConcerns.map(concern => (
                <label key={concern} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input 
                    type="checkbox" 
                    checked={analysis.mainConcerns.includes(concern)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAnalysis({...analysis, mainConcerns: [...analysis.mainConcerns, concern]})
                      } else {
                        setAnalysis({...analysis, mainConcerns: analysis.mainConcerns.filter(c => c !== concern)})
                      }
                    }}
                    className="w-4 h-4 text-cyan-600"
                  />
                  <span className="text-sm text-gray-700">{concern}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Grau de Severidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grau de Severidade</label>
            <div className="flex gap-3">
              {severityLevels.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setAnalysis({...analysis, severity: level})}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    analysis.severity === level
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Análise por Áreas */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-bold text-gray-900 mb-4">Análise por Áreas do Rosto</h4>
            <div className="space-y-4">
              {[
                { key: 'forehead', label: 'Testa' },
                { key: 'eyes', label: 'Região dos Olhos' },
                { key: 'cheeks', label: 'Bochechas' },
                { key: 'chin', label: 'Queixo' },
                { key: 'nose', label: 'Nariz' },
              ].map(area => (
                <div key={area.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{area.label}</label>
                  <textarea
                    value={analysis[area.key as keyof typeof analysis] as string}
                    onChange={(e) => setAnalysis({...analysis, [area.key]: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    rows={2}
                    placeholder={`Descreva a análise da região: ${area.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Anotações Adicionais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Anotações Técnicas Adicionais</label>
            <textarea
              value={analysis.additionalNotes}
              onChange={(e) => setAnalysis({...analysis, additionalNotes: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              rows={4}
              placeholder="Adicione observações técnicas, recomendações ou informações relevantes..."
            />
          </div>

          {/* Alert */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Dica Profissional</p>
              <p className="text-sm text-blue-700">Registre detalhadamente todas as observações. Isso ajudará no acompanhamento da evolução do tratamento.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
            >
              <Save className="w-5 h-5" />
              Salvar Análise
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
