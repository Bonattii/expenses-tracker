import { z } from 'zod';

// Make a validation of the data that will be received using zod
const createUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  name: z.string(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  })
});

// Will export the type to be used on the service
export type CreateUserInput = z.infer<typeof createUserSchema>;
