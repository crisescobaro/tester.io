-- Insertar datos de ejemplo
USE inventory_orders;

INSERT INTO orders (
    order_number, customer_name, customer_email, customer_phone,
    product_name, product_description, quantity, unit_price, total_amount,
    status, payment_method, notes
) VALUES 
(
    'ORD-001', 'María García', 'maria.garcia@email.com', '+1234567890',
    'Laptop Dell Inspiron 15', 'Laptop para oficina con 8GB RAM y 256GB SSD',
    1, 899.99, 899.99, 'pendiente', NULL, 'Cliente prefiere entrega en oficina'
),
(
    'ORD-002', 'Juan Pérez', 'juan.perez@email.com', '+1234567891',
    'Mouse Inalámbrico Logitech', 'Mouse ergonómico con batería de larga duración',
    2, 29.99, 59.98, 'pagado', 'Tarjeta de Crédito', 'Pago procesado exitosamente'
),
(
    'ORD-003', 'Ana Rodríguez', 'ana.rodriguez@email.com', '+1234567892',
    'Teclado Mecánico RGB', 'Teclado gaming con switches azules',
    1, 149.99, 149.99, 'cancelado', NULL, 'Cliente canceló por cambio de presupuesto'
),
(
    'ORD-004', 'Carlos López', 'carlos.lopez@email.com', '+1234567893',
    'Monitor 4K 27 pulgadas', 'Monitor profesional para diseño gráfico',
    1, 399.99, 399.99, 'pendiente', NULL, 'Pendiente de confirmación de stock'
);
