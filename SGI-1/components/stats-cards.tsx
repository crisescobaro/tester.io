"use client"

import { Package, DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrderStats } from "@/lib/types"

interface StatsCardsProps {
  stats: OrderStats
  isDark?: boolean
}

export function StatsCards({ stats, isDark }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${isDark ? "text-gray-200" : ""}`}>Total Pedidos</CardTitle>
          <Package className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isDark ? "text-white" : ""}`}>{stats.total_orders}</div>
          <div className={`flex items-center pt-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            <span>{stats.pending_count} pendientes</span>
          </div>
        </CardContent>
      </Card>

      <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${isDark ? "text-gray-200" : ""}`}>Pendientes</CardTitle>
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Package className="h-4 w-4 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">${stats.pending_amount.toFixed(2)}</div>
          <div className="flex items-center pt-1 text-xs">
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>{stats.pending_count} pedidos</span>
          </div>
        </CardContent>
      </Card>

      <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${isDark ? "text-gray-200" : ""}`}>Pagados</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">${stats.paid_amount.toFixed(2)}</div>
          <div className="flex items-center pt-1 text-xs">
            <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
            <span className="text-green-600">{stats.paid_count} completados</span>
          </div>
        </CardContent>
      </Card>

      <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${isDark ? "text-gray-200" : ""}`}>Cancelados</CardTitle>
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">${stats.cancelled_amount.toFixed(2)}</div>
          <div className="flex items-center pt-1 text-xs">
            <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
            <span className="text-red-600">{stats.cancelled_count} cancelados</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
