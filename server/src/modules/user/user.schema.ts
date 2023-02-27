import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Basic user schema for both
const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  name: z.string()
};

// Make a validation of the data that will be received using zod for creating an user
const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  })
});

// Filter what the route should respond with
const createUserResponseSchema = z.object({
  id: z.string(),
  ...userCore
});

// Make a validation of the data sent on the login
const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  password: z.string()
});

// Filter what the route should respond with on the login
const loginResponseSchema = z.object({
  accesToken: z.string()
});

// Will export the type to be used on the service
export type CreateUserInput = z.infer<typeof createUserSchema>;

// Will export the type to be used on the service
export type LoginInput = z.infer<typeof loginSchema>;

// Create the schemas and enable to ref them into the routes
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema
});
