import { FastifyReply, FastifyRequest } from 'fastify';
import { getAll, getById, create, put, deleteById } from '../db/board.db';
import { deleteTaskByBordId } from '../db/tasks.db';

/**
 * Send request to DB for get all boards
 *
 * @param _ - FastifyRequest
 * @param reply - FastifyReply
 */
export function getAllBoards(_: FastifyRequest, reply: FastifyReply) {
  reply.status(200).send(getAll());
}

/**
 * Send request to DB for get board by Id
 *
 * @param request - FastifyRequest with boardId params
 * @param reply - FastifyReply
 */
export function getBoardById(
  request: FastifyRequest<{
    Params: {
      boardId: string;
    };
  }>,
  reply: FastifyReply
) {
  const board: object = getById(request.params.boardId);

  if (JSON.stringify(board) === JSON.stringify({})) {
    reply.status(404).send({ error: 'Board not found' });
  }

  reply.status(200).send(board);
}

/**
 * Send request to DB for create board
 *
 * @param request - FastifyRequest with board data
 * @param reply - FastifyReply
 */
export function createBoard(
  request: FastifyRequest<{
    Body: {
      title: string;
      columns: object[];
    };
  }>,
  reply: FastifyReply
) {
  const data = request.body;
  data.title = request.body.title;
  if (request.body.columns) {
    data.columns = request.body.columns;
  }
  reply.status(201).send(create(data));
}

/**
 * Send request to DB for put board by Id
 *
 * @param request - FastifyRequest with boardId params and board data
 * @param reply - FastifyReply
 */
export function putBoard(
  request: FastifyRequest<{
    Body: {
      title: string;
    };
    Params: {
      boardId: string;
    };
  }>,
  reply: FastifyReply
) {
  const data: { title: string } = request.body;
  const { boardId } = request.params;

  reply.status(200).send(put(boardId, data));
}

/**
 * Send request to DB for delete board by Id and delete all tasks in this board
 *
 * @param request - FastifyRequest with boardId params
 * @param reply - FastifyReply
 */
export function deleteBoardById(
  request: FastifyRequest<{
    Params: {
      boardId: string;
    };
  }>,
  reply: FastifyReply
) {
  const { boardId } = request.params;

  if (deleteById(boardId)) {
    deleteTaskByBordId(boardId);
    reply.status(200).send({ msg: 'Board deleted' });
  }
  reply.status(404).send({ err: 'Board not found' });
}
