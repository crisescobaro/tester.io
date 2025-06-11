"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { X, Mail, Loader2, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order } from "@/lib/types"

interface OrderTableProps {
  orders: Order[]
  onStatusUpdate: (orderId: number, status: "pagado" | "cancelado") => Promise<void>
}

export function OrderTable({ orders, onStatusUpdate }: OrderTableProps) {
  const [updatingOrders, setUpdatingOrders] = useState<Set<number>>(new Set())

  const handleStatusUpdate = async (orderId: number, status: "pagado" | "cancelado") => {
    setUpdatingOrders((prev) => new Set(prev).add(orderId))
    await onStatusUpdate(orderId, status)
    setUpdatingOrders((prev) => {
      const newSet = new Set(prev)
      newSet.delete(orderId)
      return newSet
    })
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
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: es })
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead className="text-center">Cant.</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.order_number}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.customer_name}</div>
                  {order.customer_email && (
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {order.customer_email}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{order.product_name}</div>
                  {order.product_description && (
                    <div className="text-xs text-muted-foreground max-w-[200px] truncate">
                      {order.product_description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">{order.quantity}</TableCell>
              <TableCell className="text-right font-medium">${order.total_amount}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{formatDate(order.created_at)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  {order.status === "pendiente" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        onClick={() => handleStatusUpdate(order.id, "pagado")}
                        disabled={updatingOrders.has(order.id)}
                      >
                        {updatingOrders.has(order.id) ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Pagado
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        onClick={() => handleStatusUpdate(order.id, "cancelado")}
                        disabled={updatingOrders.has(order.id)}
                      >
                        {updatingOrders.has(order.id) ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <X className="w-3 h-3 mr-1" />
                            Cancelar
                          </>
                        )}
                      </Button>
                    </>
                  )}
                  {order.status !== "pendiente" && (
                    <span className="text-sm text-muted-foreground px-3 py-1">
                      {order.status === "pagado" ? "Completado" : "Cancelado"}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
