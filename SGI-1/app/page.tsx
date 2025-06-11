"use client"

import { useState, useEffect } from "react"
import { Package, Search, SlidersHorizontal, Loader2, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderForm } from "@/components/order-form"
import { OrderCard } from "@/components/order-card"
import { OrderTable } from "@/components/order-table"
import { StatsCards } from "@/components/stats-cards"
import { EmptyState } from "@/components/empty-state"
import { updateOrderStatusAction } from "@/app/actions/orders"
import { useToast } from "@/hooks/use-toast"
import type { Order, OrderStats } from "@/lib/types"

export default function InventoryDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<OrderStats>({
    total_orders: 0,
    pending_amount: 0,
    paid_amount: 0,
    cancelled_amount: 0,
    pending_count: 0,
    paid_count: 0,
    cancelled_count: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [isDark, setIsDark] = useState(false)
  const { toast } = useToast()

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/orders")
      const result = await response.json()

      if (result.success) {
        setOrders(result.data.orders)
        setStats(result.data.stats)
      } else {
        toast({
          title: "Error",
          description: "Error al cargar los pedidos",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error de conexión",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusUpdate = async (orderId: number, status: "pagado" | "cancelado") => {
    try {
      const paymentMethod = status === "pagado" ? "Efectivo" : undefined
      const result = await updateOrderStatusAction(orderId, status, paymentMethod)

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: `Pedido marcado como ${status}`,
        })
        await fetchOrders()
      } else {
        toast({
          title: "Error",
          description: result.error || "Error al actualizar el pedido",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado",
        variant: "destructive",
      })
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab !== "all" && order.status !== activeTab) {
      return false
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        order.customer_name.toLowerCase().includes(query) ||
        order.product_name.toLowerCase().includes(query) ||
        order.order_number.toLowerCase().includes(query)
      )
    }

    return true
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando inventario...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto py-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="mr-4 p-2 bg-blue-100 rounded-lg">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Inventario Moderno
              </h1>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Gestiona tus pedidos con estilo y eficiencia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className={isDark ? "border-gray-600 text-gray-300" : ""}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <OrderForm onOrderCreated={fetchOrders} />
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} isDark={isDark} />

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            />
            <Input
              placeholder="Buscar por cliente, producto o número..."
              className={`pl-10 w-full ${isDark ? "bg-gray-800 border-gray-600 text-white" : ""}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className={isDark ? "bg-gray-800" : ""}>
                <TabsTrigger value="all" className="text-xs">
                  Todos
                  <Badge variant="outline" className="ml-2">
                    {stats.total_orders}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pendiente" className="text-xs">
                  Pendientes
                  <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                    {stats.pending_count}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pagado" className="text-xs">
                  Pagados
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                    {stats.paid_count}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="cancelado" className="text-xs">
                  Cancelados
                  <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                    {stats.cancelled_count}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
              className={isDark ? "border-gray-600 text-gray-300" : ""}
            >
              {viewMode === "cards" ? <SlidersHorizontal className="h-4 w-4" /> : <Package className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Orders List */}
        <div className="transition-all duration-300">
          {filteredOrders.length > 0 ? (
            viewMode === "cards" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} isDark={isDark} />
                ))}
              </div>
            ) : (
              <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-0">
                  <OrderTable orders={filteredOrders} onStatusUpdate={handleStatusUpdate} isDark={isDark} />
                </CardContent>
              </Card>
            )
          ) : (
            <EmptyState
              icon={<Search className="h-12 w-12 text-gray-400" />}
              title="No se encontraron pedidos"
              description={
                searchQuery ? "Intenta con otra búsqueda o cambia los filtros" : "Comienza agregando tu primer pedido"
              }
              action={<OrderForm onOrderCreated={fetchOrders} />}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  )
}
