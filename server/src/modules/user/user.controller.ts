import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';

import { CreateUserInput } from './user.schema';
import { createUser } from './user.service';

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    // Create a user into the DB and than send the created user
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}
