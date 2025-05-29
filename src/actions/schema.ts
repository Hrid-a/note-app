import * as z from 'zod';



export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'password should be at least 8 characters').max(40),
})

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'password should be at least 8 characters').max(40),
})

export const noteSchema = z.object({
    title: z.string().min(5, 'title is required'),
    content: z.string().min(10, 'content is required'),
    id: z.string().optional(),

})

export const noteActionSchema = z.object({
    id: z.string().cuid(),
    intent: z.enum(['archive', 'delete'])
})