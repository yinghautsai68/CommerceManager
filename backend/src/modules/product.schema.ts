import z from "zod";

export const productSchema = z.object({
    sku: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    status: z.string(),
    image_url: z.string()
})