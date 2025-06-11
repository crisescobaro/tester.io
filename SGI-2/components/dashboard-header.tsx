"use client"

import { motion } from "framer-motion"
import { Package, Plus, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderForm } from "@/components/order-form"
import type { OrderStats } from "@/lib/types"

interface DashboardHeaderProps {
  stats: OrderStats
  onNewOrder: () => void
  onThemeToggle: () => void
  theme?: string
}

export function DashboardHeader({ stats, onNewOrder, onThemeToggle, theme }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center">
          <div className="mr-4 p-2 bg-primary/10 rounded-lg">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
            <p className="text-muted-foreground">Gestiona tus pedidos y mantén el control de tu inventario</p>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onThemeToggle}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <OrderForm onOrderCreated={onNewOrder}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </OrderForm>
      </div>
    </div>
  )
}
