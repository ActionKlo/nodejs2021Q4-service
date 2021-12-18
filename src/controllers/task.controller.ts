import { FastifyReply, FastifyRequest } from 'fastify';
import { getAll, create, put, getById, deleteById } from '../db/tasks.db';

export function getAlltasks(_: FastifyRequest, reply: FastifyReply) {
  reply.status(200).send(getAll());
}

export function getTaskById(
  request: FastifyRequest<{
    Params: {
      taskId: string;
    };
  }>,
  reply: FastifyReply
) {
  const task = getById(request.params.taskId);

  if (!task) {
    reply.status(404).send({ error: 'Task not found' });
  }

  reply.status(200).send(task);
}

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
) {
  const data = request.body;

  data.boardId = request.params.boardId;

  reply.status(201).send(create(data));
}

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
) {
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

export function deleteTaskById(
  request: FastifyRequest<{
    Params: {
      taskId: string;
    };
  }>,
  reply: FastifyReply
) {
  const { taskId } = request.params;

  if (deleteById(taskId)) {
    reply.status(200).send({ msg: 'Task deleted' });
  }
  reply.status(404).send({ err: 'Task not found' });
}
