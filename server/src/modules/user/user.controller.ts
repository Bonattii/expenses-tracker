import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';

import { CreateUserInput, LoginInput } from './user.schema';
import { createUser, findUserByEmail } from './user.service';
import { verifyPassword } from '../../utils/hash';
import { fastify } from '../../server';

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

export async function loginUserHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  // Find a user by email
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      message: 'Invalid email or password'
    });
  }

  // Verify password
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;

    // // Generate access token with the rest of the user informations
    return { accesToken: fastify.jwt.sign(rest) };
  }

  // If the password was incorrect
  return reply.code(401).send({
    message: 'Invalid email or password'
  });
}
