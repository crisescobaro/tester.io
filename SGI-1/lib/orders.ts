import { executeQuery } from "./database"
import type { Order, CreateOrderData, UpdateOrderData, OrderStats } from "./types"

export async function getAllOrders(): Promise<Order[]> {
  const query = `
    SELECT * FROM orders 
    ORDER BY created_at DESC
  `
  const results = (await executeQuery(query)) as Order[]
  return results
}

export async function getOrderById(id: number): Promise<Order | null> {
  const query = "SELECT * FROM orders WHERE id = ?"
  const results = (await executeQuery(query, [id])) as Order[]
  return results[0] || null
}

export async function createOrder(data: CreateOrderData): Promise<Order> {
  // Generar número de orden único
  const orderNumber = await generateOrderNumber()
  const totalAmount = data.quantity * data.unit_price

  const query = `
    INSERT INTO orders (
      order_number, customer_name, customer_email, customer_phone,
      product_name, product_description, quantity, unit_price, total_amount,
      payment_method, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  const params = [
    orderNumber,
    data.customer_name,
    data.customer_email || null,
    data.customer_phone || null,
    data.product_name,
    data.product_description || null,
    data.quantity,
    data.unit_price,
    totalAmount,
    data.payment_method || null,
    data.notes || null,
  ]

  const result = (await executeQuery(query, params)) as any
  const newOrder = await getOrderById(result.insertId)

  if (!newOrder) {
    throw new Error("Error al crear el pedido")
  }

  return newOrder
}

export async function updateOrderStatus(id: number, data: UpdateOrderData): Promise<Order> {
  const updates: string[] = []
  const params: any[] = []

  if (data.status) {
    updates.push("status = ?")
    params.push(data.status)
  }

  if (data.payment_method) {
    updates.push("payment_method = ?")
    params.push(data.payment_method)
  }

  if (data.notes) {
    updates.push("notes = ?")
    params.push(data.notes)
  }

  if (updates.length === 0) {
    throw new Error("No hay datos para actualizar")
  }

  params.push(id)
  const query = `UPDATE orders SET ${updates.join(", ")} WHERE id = ?`

  await executeQuery(query, params)

  const updatedOrder = await getOrderById(id)
  if (!updatedOrder) {
    throw new Error("Error al actualizar el pedido")
  }

  return updatedOrder
}

export async function deleteOrder(id: number): Promise<boolean> {
  const query = "DELETE FROM orders WHERE id = ?"
  const result = (await executeQuery(query, [id])) as any
  return result.affectedRows > 0
}

export async function getOrderStats(): Promise<OrderStats> {
  const query = `
    SELECT 
      COUNT(*) as total_orders,
      SUM(CASE WHEN status = 'pendiente' THEN total_amount ELSE 0 END) as pending_amount,
      SUM(CASE WHEN status = 'pagado' THEN total_amount ELSE 0 END) as paid_amount,
      SUM(CASE WHEN status = 'cancelado' THEN total_amount ELSE 0 END) as cancelled_amount,
      SUM(CASE WHEN status = 'pendiente' THEN 1 ELSE 0 END) as pending_count,
      SUM(CASE WHEN status = 'pagado' THEN 1 ELSE 0 END) as paid_count,
      SUM(CASE WHEN status = 'cancelado' THEN 1 ELSE 0 END) as cancelled_count
    FROM orders
  `

  const results = (await executeQuery(query)) as any[]
  const stats = results[0]

  return {
    total_orders: Number.parseInt(stats.total_orders) || 0,
    pending_amount: Number.parseFloat(stats.pending_amount) || 0,
    paid_amount: Number.parseFloat(stats.paid_amount) || 0,
    cancelled_amount: Number.parseFloat(stats.cancelled_amount) || 0,
    pending_count: Number.parseInt(stats.pending_count) || 0,
    paid_count: Number.parseInt(stats.paid_count) || 0,
    cancelled_count: Number.parseInt(stats.cancelled_count) || 0,
  }
}

async function generateOrderNumber(): Promise<string> {
  const query = "SELECT COUNT(*) as count FROM orders"
  const results = (await executeQuery(query)) as any[]
  const count = results[0].count + 1
  return `ORD-${count.toString().padStart(3, "0")}`
}
