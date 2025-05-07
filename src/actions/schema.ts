import * as z from 'zod';



export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'password should be at least 8 characters').max(40),
})

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'password should be at least 8 characters').max(40),
})