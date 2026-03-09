import z from 'zod';

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    role: z.string(),
    work: z.string().optional(),
    status: z.string().optional(),
    password: z.string()
})