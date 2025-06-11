"use client"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Loader2, User, Package, DollarSign, FileText } from "lucide-react"
import { createOrderAction } from "@/app/actions/orders"
import { useToast } from "@/hooks/use-toast"

interface OrderFormProps {
  onOrderCreated?: () => void
  children?: ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function OrderForm({ onOrderCreated, children, variant = "default" }: OrderFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("customer")
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createOrderAction(formData)

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: "Pedido creado exitosamente",
        })
        setIsOpen(false)
        setActiveTab("customer")
        onOrderCreated?.()
      } else {
        toast({
          title: "Error",
          description: result.error || "Error al crear el pedido",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al crear el pedido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextTab = () => {
    if (activeTab === "customer") setActiveTab("product")
    else if (activeTab === "product") setActiveTab("additional")
  }

  const prevTab = () => {
    if (activeTab === "additional") setActiveTab("product")
    else if (activeTab === "product") setActiveTab("customer")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={variant === "default" ? "bg-blue-600 hover:bg-blue-700" : ""}>
          {children || (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Pedido
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Pedido</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="customer" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Cliente
              </TabsTrigger>
              <TabsTrigger value="product" className="flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Producto
              </TabsTrigger>
              <TabsTrigger value="additional" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Adicional
              </TabsTrigger>
            </TabsList>

            <div className="transition-all duration-200">
              <TabsContent value="customer" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customer_name">Nombre del Cliente *</Label>
                    <Input id="customer_name" name="customer_name" required placeholder="Ej: María García" />
                  </div>
                  <div>
                    <Label htmlFor="customer_email">Email</Label>
                    <Input id="customer_email" name="customer_email" type="email" placeholder="cliente@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="customer_phone">Teléfono</Label>
                    <Input id="customer_phone" name="customer_phone" placeholder="+1234567890" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="product" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product_name">Nombre del Producto *</Label>
                    <Input id="product_name" name="product_name" required placeholder="Ej: Laptop Dell Inspiron" />
                  </div>
                  <div>
                    <Label htmlFor="product_description">Descripción</Label>
                    <Textarea
                      id="product_description"
                      name="product_description"
                      placeholder="Descripción detallada del producto..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Cantidad *</Label>
                      <Input id="quantity" name="quantity" type="number" min="1" defaultValue="1" required />
                    </div>
                    <div>
                      <Label htmlFor="unit_price">Precio Unitario ($) *</Label>
                      <Input
                        id="unit_price"
                        name="unit_price"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="additional" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment_method">Método de Pago</Label>
                    <Input
                      id="payment_method"
                      name="payment_method"
                      placeholder="Ej: Tarjeta de Crédito, Efectivo, Transferencia"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notas</Label>
                    <Textarea id="notes" name="notes" placeholder="Notas adicionales sobre el pedido..." rows={3} />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={prevTab} disabled={activeTab === "customer" || isLoading}>
              Anterior
            </Button>

            {activeTab !== "additional" ? (
              <Button type="button" onClick={nextTab} disabled={isLoading}>
                Siguiente
              </Button>
            ) : (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Crear Pedido
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
