import { FastifyReply, FastifyRequest } from 'fastify';
import { getAll, create, put, getById, deleteById } from '../db/tasks.db';

/**
 * Send request to DB for get all tasks
 *
 * @param _ - FastifyRequest
 * @param reply - FastifyReply
 */
export function getAlltasks(_: FastifyRequest, reply: FastifyReply): void {
  reply.status(200).send(getAll());
}

/**
 * Send request to DB for get task by Id
 *
 * @param request - FastifyRequest with taskId params
 * @param reply - FastifyReply
 */
export function getTaskById(
  request: FastifyRequest<{
    Params: {
      taskId: string;
    };
  }>,
  reply: FastifyReply
): void {
  const task = getById(request.params.taskId);

  if (!task) {
    reply.status(404).send({ error: 'Task not found' });
  }

  reply.status(200).send(task);
}

/**
 * Send request to DB for create task
 *
 * @param request - FastifyRequest with task data and boardId params
 * @param reply - FastifyReply
 */
export function createTask(
  request: FastifyRequest<{
    Body: {
      title: string;
      order: number;
      description: string;
      userId: string | null;
      boardId: string | null;
      columnId: string | null;
    };
    Params: {
      boardId: string;
    };
  }>,
  reply: FastifyReply
): void {
  const data = request.body;

  data.boardId = request.params.boardId;

  reply.status(201).send(create(data));
}

/**
 * Send request to DB for put task by Id
 *
 * @param request - FastifyRequest with taskId params and task data
 * @param reply - FastifyReply
 */
export function putTask(
  request: FastifyRequest<{
    Body: {
      title: string;
      order: number;
      description: string;
      userId: string | null;
      boardId: string | null;
      columnId: string | null;
    };
    Params: {
      taskId: string;
    };
  }>,
  reply: FastifyReply
): void {
  const data: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
  } = request.body;
  const { taskId } = request.params;

  reply.status(200).send(put(taskId, data));
}
/**
 * Send request to DB for delete task by Id
 *
 * @param request - FastifyRequest with taskId params
 * @param reply - FastifyReply
 */
export function deleteTaskById(
  request: FastifyRequest<{
    Params: {
      taskId: string;
    };
  }>,
  reply: FastifyReply
): void {
  const { taskId } = request.params;

  if (deleteById(taskId)) {
    reply.status(200).send({ msg: 'Task deleted' });
  }
  reply.status(404).send({ err: 'Task not found' });
}
