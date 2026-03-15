export interface Worker {
    id: number,
    name: string,
    email: string,
    phone: string,
    role: string,
    work: string,
    status: string,
    created_at: string,
}

export interface Product {
    id: number,
    sku: string,
    name: string,
    category: string,
    description: string,
    price: number,
    stock: number,
    status: 'active' | 'archived',
    image_url: string
    created_at: string,
    updated_at: string,
    total_sold?: number
}

export interface Order {
    id: number,
    order_date: string,
    payment_status: 'pending' | 'paid' | 'failed',
    shipment_status: 'pending' | 'shipped' | 'completed' | 'cancelled',
    customer_name: string,
    customer_number: string,
    customer_address: string,
    shipping_method: string,
    shipping_fee: number,
    tax: number,
    total_items: number,
    total_amount: number,
    remarks: string,

}

export interface OrderItems {
    id: number,
    order_id: number,
    product_id: number,
    quantity: number,
    discount: number,
    sub_total: number,
    name: string,
    price: number,
    image_url: string
}