import Fastify from 'fastify';

import { userRoutes } from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

async function bootstrap() {
  // Initializa the server
  const fastify = Fastify({
    logger: true
  });

  // Register the schemas into the server
  for (const schema of userSchemas) {
    fastify.addSchema(schema);
  }

  // Register the user routes on the server to be used
  await fastify.register(userRoutes, { prefix: 'api/users' });

  // Put the server to lister to the port 3333
  await fastify.listen({ port: 3333, host: '0.0.0' });
}

bootstrap();
