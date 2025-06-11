import { type NextRequest, NextResponse } from "next/server"
import { getAllOrders, createOrder, getOrderStats } from "@/lib/orders"
import type { CreateOrderData } from "@/lib/types"

export async function GET() {
  try {
    const orders = await getAllOrders()
    const stats = await getOrderStats()

    return NextResponse.json({
      success: true,
      data: {
        orders,
        stats,
      },
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los pedidos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validaciones básicas
    if (!body.customer_name || !body.product_name || !body.quantity || !body.unit_price) {
      return NextResponse.json({ success: false, error: "Faltan campos requeridos" }, { status: 400 })
    }

    if (body.quantity <= 0 || body.unit_price <= 0) {
      return NextResponse.json({ success: false, error: "Cantidad y precio deben ser mayores a 0" }, { status: 400 })
    }

    const orderData: CreateOrderData = {
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      product_name: body.product_name,
      product_description: body.product_description,
      quantity: Number.parseInt(body.quantity),
      unit_price: Number.parseFloat(body.unit_price),
      payment_method: body.payment_method,
      notes: body.notes,
    }

    const newOrder = await createOrder(orderData)

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: "Pedido creado exitosamente",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Error al crear el pedido" }, { status: 500 })
  }
}
