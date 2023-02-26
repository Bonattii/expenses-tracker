import { FastifyInstance } from 'fastify';

import { registerUserHandler } from '../controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', registerUserHandler);
}
