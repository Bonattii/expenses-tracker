import { FastifyInstance } from 'fastify';

import { loginUserHandler, registerUserHandler } from './user.controller';
import { $ref } from './user.schema';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      // This will garantee that we send the necessary informations to create the user
      // and will receive back just the real important information about the user to work on
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema')
        }
      }
    },
    registerUserHandler
  );

  fastify.post(
    '/login',
    {
      // This will garantee that we send the necessary informations to create the user
      // and will receive back just the real important information about the user to work on
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema')
        }
      }
    },
    loginUserHandler
  );
}
