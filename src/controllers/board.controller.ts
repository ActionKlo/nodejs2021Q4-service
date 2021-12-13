// const uuid = require('uuid')
import { FastifyReply, FastifyRequest } from 'fastify';
import { getAll, getById, create, put, deleteById } from '../db/board.db';
// import tasks from '../db/tasks.db'

export function getAllBoards(_: FastifyRequest, reply: FastifyReply) {
  reply.status(200).send(getAll());
}

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
  // data.columns
  // console.log(data);
  // console.log(request.body)
  if (request.body.columns) {
    // for (let i : number = 0; i < request.body.columns.length; i += 1)
    // data.columns =
    // const columns = request.body.columns.map(column : any => ({
    // 		id: uuid.v4(),
    // 		title: column.title,
    // 		order: column.order
    // 	}))

    data.columns = request.body.columns;
  }
  reply.status(201).send(create(data));
}

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

export function deleteBoardById(
  request: FastifyRequest<{
    Params: {
      boardId: string
    }
  }>,
  reply: FastifyReply
) {
  const { boardId } = request.params;

  if (deleteById(boardId)) {
    // tasks.deleteTaskByBordId(boardId)
    reply.status(200).send({ msg: 'Board deleted' });
  }
  reply.status(404).send({ err: 'Board not found' });
}
