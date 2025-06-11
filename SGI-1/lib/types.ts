export interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email?: string
  customer_phone?: string
  product_name: string
  product_description?: string
  quantity: number
  unit_price: number
  total_amount: number
  status: "pendiente" | "pagado" | "cancelado"
  payment_method?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateOrderData {
  customer_name: string
  customer_email?: string
  customer_phone?: string
  product_name: string
  product_description?: string
  quantity: number
  unit_price: number
  payment_method?: string
  notes?: string
}

export interface UpdateOrderData {
  status?: "pendiente" | "pagado" | "cancelado"
  payment_method?: string
  notes?: string
}

export interface OrderStats {
  total_orders: number
  pending_amount: number
  paid_amount: number
  cancelled_amount: number
  pending_count: number
  paid_count: number
  cancelled_count: number
}
