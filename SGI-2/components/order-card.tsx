"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Order } from "@/lib/types"

interface OrderCardProps {
  order: Order
  onStatusUpdate: (orderId: number, status: "pagado" | "cancelado") => Promise<void>
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
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
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: es })
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card
        className={`overflow-hidden border-l-4 ${
          order.status === "pendiente"
            ? "border-l-yellow-400"
            : order.status === "pagado"
              ? "border-l-green-500"
              : "border-l-red-500"
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-base">{order.product_name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
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
              <Package className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Cantidad: {order.quantity}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">${order.total_amount}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{formatDate(order.created_at)}</span>
            </div>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-auto w-full justify-start text-muted-foreground">
                {isOpen ? <ChevronUp className="mr-1 h-3 w-3" /> : <ChevronDown className="mr-1 h-3 w-3" />}
                {isOpen ? "Menos detalles" : "Más detalles"}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Número de Pedido</div>
                  <div className="font-medium">{order.order_number}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Precio Unitario</div>
                  <div className="font-medium">${order.unit_price}</div>
                </div>
              </div>

              {order.customer_email && (
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{order.customer_email}</span>
                </div>
              )}

              {order.customer_phone && (
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{order.customer_phone}</span>
                </div>
              )}

              {order.product_description && (
                <div>
                  <div className="text-muted-foreground">Descripción</div>
                  <div>{order.product_description}</div>
                </div>
              )}

              {order.notes && (
                <div>
                  <div className="text-muted-foreground">Notas</div>
                  <div>{order.notes}</div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
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
    </motion.div>
  )
}
