"use server"

import { revalidatePath } from "next/cache"
import { createOrder, updateOrderStatus } from "@/lib/orders"
import type { CreateOrderData, UpdateOrderData } from "@/lib/types"

export async function createOrderAction(formData: FormData) {
  try {
    const orderData: CreateOrderData = {
      customer_name: formData.get("customer_name") as string,
      customer_email: (formData.get("customer_email") as string) || undefined,
      customer_phone: (formData.get("customer_phone") as string) || undefined,
      product_name: formData.get("product_name") as string,
      product_description: (formData.get("product_description") as string) || undefined,
      quantity: Number.parseInt(formData.get("quantity") as string),
      unit_price: Number.parseFloat(formData.get("unit_price") as string),
      payment_method: (formData.get("payment_method") as string) || undefined,
      notes: (formData.get("notes") as string) || undefined,
    }

    // Validaciones
    if (!orderData.customer_name || !orderData.product_name) {
      throw new Error("Nombre del cliente y producto son requeridos")
    }

    if (orderData.quantity <= 0 || orderData.unit_price <= 0) {
      throw new Error("Cantidad y precio deben ser mayores a 0")
    }

    const newOrder = await createOrder(orderData)
    revalidatePath("/")

    return { success: true, data: newOrder }
  } catch (error) {
    console.error("Error in createOrderAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al crear el pedido",
    }
  }
}

export async function updateOrderStatusAction(id: number, status: "pagado" | "cancelado", paymentMethod?: string) {
  try {
    const updateData: UpdateOrderData = { status }

    if (status === "pagado" && paymentMethod) {
      updateData.payment_method = paymentMethod
    }

    const updatedOrder = await updateOrderStatus(id, updateData)
    revalidatePath("/")

    return { success: true, data: updatedOrder }
  } catch (error) {
    console.error("Error in updateOrderStatusAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al actualizar el pedido",
    }
  }
}
