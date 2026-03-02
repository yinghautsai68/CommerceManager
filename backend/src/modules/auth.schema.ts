import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, "至少三個字!"),
    password: z.string().min(8, "至少8個字!"),
    confirmPassword: z.string().min(8, "至少8個字!")
}).refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致!",
    path: ["confirmPassword"]
});