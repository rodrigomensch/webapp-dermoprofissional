"use client"

import { useState } from 'react'
import { Upload, Camera, Download, Maximize2, X, Calendar } from 'lucide-react'

interface PhotoComparisonProps {
  patientId: string
}

export default function PhotoComparison({ patientId }: PhotoComparisonProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const photoSessions = [
    {
      date: '2024-01-15',
      photos: [
        { id: '1', angle: 'Frontal', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop' },
        { id: '2', angle: 'Perfil Direito', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop' },
        { id: '3', angle: 'Perfil Esquerdo', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop' },
      ]
    },
    {
      date: '2023-12-20',
      photos: [
        { id: '4', angle: 'Frontal', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop' },
        { id: '5', angle: 'Perfil Direito', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop' },
        { id: '6', angle: 'Perfil Esquerdo', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop' },
      ]
    },
  ]

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upload de Novas Fotos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Frontal', 'Perfil Direito', 'Perfil Esquerdo'].map((angle) => (
            <div key={angle} className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-cyan-500 transition-all cursor-pointer">
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 mb-1">{angle}</p>
                <p className="text-sm text-gray-600">Clique para adicionar foto</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg">
          <Upload className="w-5 h-5" />
          Salvar Sessão de Fotos
        </button>
      </div>

      {/* Photo Sessions */}
      {photoSessions.map((session, sessionIndex) => (
        <div key={sessionIndex} className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-600" />
              <div>
                <h4 className="font-bold text-gray-900">
                  Sessão de {new Date(session.date).toLocaleDateString('pt-BR')}
                </h4>
                <p className="text-sm text-gray-600">
                  {sessionIndex === 0 ? 'Mais recente' : `${Math.floor((new Date().getTime() - new Date(session.date).getTime()) / (1000 * 60 * 60 * 24))} dias atrás`}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all">
              <Download className="w-4 h-4" />
              Baixar Todas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {session.photos.map((photo) => (
              <div key={photo.id} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={photo.url} 
                    alt={photo.angle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedPhoto(photo.url)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-900" />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-all">
                    <Download className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
                <p className="mt-2 text-center text-sm font-medium text-gray-900">{photo.angle}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Comparison View */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Comparação Antes e Depois</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Antes (20/12/2023)</p>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop" 
                alt="Antes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Depois (15/01/2024)</p>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop" 
                alt="Depois"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-900 mb-1">Evolução Positiva</p>
          <p className="text-sm text-green-700">Redução visível de oleosidade e melhora na textura da pele após 26 dias de tratamento.</p>
        </div>
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-white rounded-lg hover:bg-gray-100 transition-all"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Visualização ampliada"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  )
}
