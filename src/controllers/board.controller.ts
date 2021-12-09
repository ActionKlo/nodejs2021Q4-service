// const uuid = require('uuid')
import { getAll, getById, create, put, deleteById } from '../db/board.db';
// import tasks from '../db/tasks.db'

export function getAllBoards(
  _: { params: object },
  reply: { status: (arg0: number) => { send: { (arg0: object): object } } }
): object {
  reply.status(200);
  return getAll();
}

export function getBoardById(
  request: {
    params: {
      boardId: string;
    };
  },
  reply: {
    status: (arg0: number) => { send: object };
  }
): object {
  const board: object = getById(request.params.boardId);

  if (JSON.stringify(board) === JSON.stringify({})) {
    reply.status(404);
    return { error: 'Board not found' };
  }

  reply.status(200);
  return board;
}

export function createBoard(
  request: { body: { title: string; columns: object[] } },
  reply: {
    status: (arg0: number) => {
      send: object;
    };
  }
) {
  const data = request.body;
  data.title = request.body.title;
  // data.columns
  console.log(data);
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
  reply.status(201);
  return create(data);
}

export function putBoard(
  request: { body: { title: string }; params: { boardId: string } },
  reply: {
    status: (arg0: number) => {
      send: object;
    };
  }
) {
  const data: { title: string } = request.body;
  const { boardId } = request.params;

  reply.status(200);
  return put(boardId, data);
}

export function deleteBoardById (request:
	{ params: {
			boardId: string
		}
	}, reply: {
		status: (arg0: number) => {
			send: object
		}
	}) : object {
	const { boardId } = request.params

	if (deleteById(boardId)) {
		// tasks.deleteTaskByBordId(boardId)
		reply.status(200)
		return { msg: "Board deleted"}
	}
	reply.status(404)
	return { err: "Board not found"}
}
