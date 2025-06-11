"use client"

import { useState } from "react"
import {
  Package,
  DollarSign,
  X,
  Calendar,
  User,
  Phone,
  Mail,
  Loader2,
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "@/lib/types"

interface OrderCardProps {
  order: Order
  onStatusUpdate: (orderId: number, status: "pagado" | "cancelado") => Promise<void>
  isDark?: boolean
}

export function OrderCard({ order, onStatusUpdate, isDark }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (status: "pagado" | "cancelado") => {
    setIsUpdating(true)
    await onStatusUpdate(order.id, status)
    setIsUpdating(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "pagado":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="mr-1 h-3 w-3" />
            Pagado
          </Badge>
        )
      case "cancelado":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="mr-1 h-3 w-3" />
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="transition-all duration-300 hover:scale-105">
      <Card
        className={`overflow-hidden border-l-4 ${
          order.status === "pendiente"
            ? "border-l-yellow-400"
            : order.status === "pagado"
              ? "border-l-green-500"
              : "border-l-red-500"
        } ${isDark ? "bg-gray-800 border-gray-700" : ""}`}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className={`text-base ${isDark ? "text-white" : ""}`}>{order.product_name}</CardTitle>
              <div className={`flex items-center text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <User className="mr-1 h-3 w-3" />
                {order.customer_name}
              </div>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Package className={`mr-2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <span className={isDark ? "text-gray-300" : ""}>Cantidad: {order.quantity}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className={`mr-2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`font-medium ${isDark ? "text-white" : ""}`}>${order.total_amount}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Calendar className={`mr-2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>{formatDate(order.created_at)}</span>
            </div>
          </div>

          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              className={`p-0 h-auto w-full justify-start ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronUp className="mr-1 h-3 w-3" /> : <ChevronDown className="mr-1 h-3 w-3" />}
              {isOpen ? "Menos detalles" : "Más detalles"}
            </Button>

            {isOpen && (
              <div className="mt-2 space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className={isDark ? "text-gray-400" : "text-gray-500"}>Número de Pedido</div>
                    <div className={`font-medium ${isDark ? "text-white" : ""}`}>{order.order_number}</div>
                  </div>
                  <div className="space-y-1">
                    <div className={isDark ? "text-gray-400" : "text-gray-500"}>Precio Unitario</div>
                    <div className={`font-medium ${isDark ? "text-white" : ""}`}>${order.unit_price}</div>
                  </div>
                </div>

                {order.customer_email && (
                  <div className="flex items-center">
                    <Mail className={`mr-2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={isDark ? "text-gray-300" : ""}>{order.customer_email}</span>
                  </div>
                )}

                {order.customer_phone && (
                  <div className="flex items-center">
                    <Phone className={`mr-2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={isDark ? "text-gray-300" : ""}>{order.customer_phone}</span>
                  </div>
                )}

                {order.product_description && (
                  <div>
                    <div className={isDark ? "text-gray-400" : "text-gray-500"}>Descripción</div>
                    <div className={isDark ? "text-gray-300" : ""}>{order.product_description}</div>
                  </div>
                )}

                {order.notes && (
                  <div>
                    <div className={isDark ? "text-gray-400" : "text-gray-500"}>Notas</div>
                    <div className={isDark ? "text-gray-300" : ""}>{order.notes}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>

        {order.status === "pendiente" && (
          <CardFooter className="pt-0 flex justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-1/2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              onClick={() => handleStatusUpdate("pagado")}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <Check className="mr-1 h-3 w-3" />
                  Pagado
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-1/2 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              onClick={() => handleStatusUpdate("cancelado")}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <X className="mr-1 h-3 w-3" />
                  Cancelar
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
