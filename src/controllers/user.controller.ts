import { FastifyReply, FastifyRequest } from 'fastify';
import { deleteUserFromTask } from '../db/tasks.db';
import { create, getAll, getById, put, deleteById } from '../db/users.db';

/**
 * Send request to DB for get all users
 *
 * @param _ - FastifyRequest
 * @param reply - FastifyReply
 */
export function getAllUsers(_: FastifyRequest, reply: FastifyReply) {
  reply.status(200).send(getAll());
}

/**
 * Send request to DB for get user by Id
 *
 * @param request - FastifyRequest with userId params
 * @param reply - FastifyReply
 */
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

/**
 * Send request to DB for create user
 *
 * @param request - FastifyRequest with user data
 * @param reply - FastifyReply
 */
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

/**
 * Send request to DB for put user by Id
 *
 * @param request - FastifyRequest with userId params and user data
 * @param reply - FastifyReply
 */
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

/**
 * Send request to DB for delete user by Id and delete this user in all tasks
 *
 * @param request - FastifyRequest with userId params
 * @param reply - FastifyReply
 */
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
    deleteUserFromTask(userId);
    reply.status(200).send({ msg: 'User deleted' });
  }
  reply.status(404).send({ err: 'User not found' });
}
