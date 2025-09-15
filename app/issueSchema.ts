import {z} from "zod";
export const schema = z.object({
    title: z.string().min(1 , "Titel is required").max(255),
    description: z.string().min(1,"Description is required"),
})