"use client"

import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar, FileText, Download } from 'lucide-react'

export default function FinancialControl() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  const transactions = [
    { id: '1', date: '2024-01-15', type: 'Receita', category: 'Consulta', description: 'Maria Silva - Avaliação', amount: 250 },
    { id: '2', date: '2024-01-15', type: 'Receita', category: 'Procedimento', description: 'João Santos - Limpeza de Pele', amount: 180 },
    { id: '3', date: '2024-01-14', type: 'Despesa', category: 'Produtos', description: 'Compra de insumos', amount: -350 },
    { id: '4', date: '2024-01-13', type: 'Receita', category: 'Produto', description: 'Venda de sérum', amount: 120 },
    { id: '5', date: '2024-01-12', type: 'Despesa', category: 'Aluguel', description: 'Aluguel do consultório', amount: -2000 },
  ]

  const summary = {
    totalRevenue: 12450,
    totalExpenses: 4230,
    netProfit: 8220,
    monthlyGrowth: 15.3
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Receita Total</p>
          <p className="text-3xl font-bold text-gray-900">R$ {summary.totalRevenue.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-emerald-600 mt-2">+{summary.monthlyGrowth}% este mês</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Despesas Totais</p>
          <p className="text-3xl font-bold text-gray-900">R$ {summary.totalExpenses.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-gray-600 mt-2">Fixas e variáveis</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Lucro Líquido</p>
          <p className="text-3xl font-bold text-gray-900">R$ {summary.netProfit.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-cyan-600 mt-2">Margem de {((summary.netProfit / summary.totalRevenue) * 100).toFixed(1)}%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Ticket Médio</p>
          <p className="text-3xl font-bold text-gray-900">R$ 259</p>
          <p className="text-sm text-gray-600 mt-2">Por consulta</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Transações Recentes</h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button
            onClick={() => setShowAddTransaction(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nova Transação
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Data</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Descrição</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'Receita' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type === 'Receita' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${
                    transaction.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4">Receita por Categoria</h4>
          <div className="space-y-3">
            {[
              { category: 'Consultas', amount: 7500, percentage: 60, color: 'from-cyan-500 to-blue-600' },
              { category: 'Procedimentos', amount: 3200, percentage: 26, color: 'from-purple-500 to-pink-600' },
              { category: 'Produtos', amount: 1750, percentage: 14, color: 'from-emerald-500 to-teal-600' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-bold text-gray-900">R$ {item.amount.toLocaleString('pt-BR')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4">Despesas por Categoria</h4>
          <div className="space-y-3">
            {[
              { category: 'Aluguel', amount: 2000, percentage: 47, color: 'from-red-500 to-orange-600' },
              { category: 'Produtos', amount: 1500, percentage: 35, color: 'from-orange-500 to-yellow-600' },
              { category: 'Outros', amount: 730, percentage: 18, color: 'from-yellow-500 to-amber-600' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-bold text-gray-900">R$ {item.amount.toLocaleString('pt-BR')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nova Transação</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option>Receita</option>
                  <option>Despesa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option>Consulta</option>
                  <option>Procedimento</option>
                  <option>Produto</option>
                  <option>Aluguel</option>
                  <option>Produtos/Insumos</option>
                  <option>Outros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
                <input type="number" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="0,00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg h-20"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTransaction(false)}
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
