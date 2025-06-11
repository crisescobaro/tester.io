import { type NextRequest, NextResponse } from "next/server"
import { getOrderById, updateOrderStatus, deleteOrder } from "@/lib/orders"
import type { UpdateOrderData } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const order = await getOrderById(id)
    if (!order) {
      return NextResponse.json({ success: false, error: "Pedido no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el pedido" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const body = await request.json()
    const updateData: UpdateOrderData = {}

    if (body.status) {
      if (!["pendiente", "pagado", "cancelado"].includes(body.status)) {
        return NextResponse.json({ success: false, error: "Estado inválido" }, { status: 400 })
      }
      updateData.status = body.status
    }

    if (body.payment_method) {
      updateData.payment_method = body.payment_method
    }

    if (body.notes) {
      updateData.notes = body.notes
    }

    const updatedOrder = await updateOrderStatus(id, updateData)

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: "Pedido actualizado exitosamente",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar el pedido" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
    }

    const deleted = await deleteOrder(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Pedido no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Pedido eliminado exitosamente",
    })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar el pedido" }, { status: 500 })
  }
}
