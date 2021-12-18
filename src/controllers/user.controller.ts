import { FastifyReply, FastifyRequest } from 'fastify';
import { create, getAll, getById, put, deleteById } from '../db/users.db';

export function getAllUsers(_: FastifyRequest, reply: FastifyReply) {
  reply.status(200).send(getAll());
}

export function getUserById(
  request: FastifyRequest<{
    Params: {
      userId: string;
    };
  }>,
  reply: FastifyReply
) {
  const user = getById(request.params.userId);

  if (!user) {
    reply.status(404).send({ error: 'User not found' });
  }

  reply.status(200).send(user);
}

export function createUser(
  request: FastifyRequest<{
    Body: {
      name: string;
      login: string;
      password: string;
    };
  }>,
  reply: FastifyReply
) {
  const data = request.body;

  reply.status(201).send(create(data));
}

export function putUser(
  request: FastifyRequest<{
    Body: {
      name: string;
      login: string;
      password: string;
    };
    Params: {
      userId: string;
    };
  }>,
  reply: FastifyReply
) {
  const data: {
    name: string;
  } = request.body;
  const { userId } = request.params;

  reply.status(200).send(put(userId, data));
}

export function deleteUserById(
  request: FastifyRequest<{
    Params: {
      userId: string;
    };
  }>,
  reply: FastifyReply
) {
  const { userId } = request.params;

  if (deleteById(userId)) {
    // tasks.deleteUserFromTask(userId);
    reply.status(200).send({ msg: 'User deleted' });
  }
  reply.status(404).send({ err: 'User not found' });
}
