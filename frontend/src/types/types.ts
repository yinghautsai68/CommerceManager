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
    sku: string,
    name: string,
    category: string,
    description: string,
    price: number,
    stock: number,
    status: string,
    image_url: string
    created_at: string,
    updated_at: string
}