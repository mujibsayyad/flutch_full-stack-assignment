import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("This is not a valid email."),
  password: z.string().min(5, "Password is required"),
});

export const loginSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(5, "Password is required"),
});
