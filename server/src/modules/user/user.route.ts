import { FastifyInstance } from 'fastify';

import { registerUserHandler } from './user.controller';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', registerUserHandler);
}
