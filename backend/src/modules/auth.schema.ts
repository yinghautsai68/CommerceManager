import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().trim().min(3, "至少三個字!").regex(/^[a-zA-Z0-9_]+$/, "只能包含英文字母、數字或底線!"),
    password: z.string().min(8, "至少8個字!"),
    confirmPassword: z.string().min(8, "至少8個字!")
}).refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致!",
    path: ["confirmPassword"]
});

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});