import * as z from 'zod';



export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'password should be at least 8 characters').max(40),
})

export const onBoardingSchema = z.object({
    name: z.string().min(2, 'name should be at least 2 characters').max(40),
    password: z.string().min(8, 'password should be at least 8 characters').max(40),
    confirmPassword: z.string().min(8, 'password should be at least 8 characters').max(40),
}).superRefine(({confirmPassword, password}, ctx)=>{
    if(confirmPassword !== password){
        ctx.addIssue({
            code: 'custom',
            path: ['confirmPassword'],
            message: 'Passwords do not match',
        })
    }
})

export const signUpSchema = z.object({
    email: z.string().email(),
})

export const verifactionSchema = z.object({
    target: z.string(),
    type: z.string(),
    code: z.string()
})

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

export const resetPasswordSchema = z.object({
    password: z.string().min(8, 'password should be at least 8 characters').max(40),
    confirmPassword: z.string().min(8, 'password should be at least 8 characters').max(40),
}).superRefine(({confirmPassword, password}, ctx)=>{
    if(confirmPassword !== password){
        ctx.addIssue({
            code: 'custom',
            path: ['confirmPassword'],
            message: 'Passwords do not match',
        })
    }
})

export const changeEmailSchema = z.object({
    email: z.string().email(),
});

export const noteSchema = z.object({
    title: z.string().min(5, 'title is required'),
    content: z.string().min(10, 'content is required'),
    id: z.string().optional(),

})

export const noteActionSchema = z.object({
    id: z.string().cuid(),
    intent: z.enum(['archive', 'delete'])
})