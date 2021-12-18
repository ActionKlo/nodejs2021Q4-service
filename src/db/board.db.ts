import Board from '../models/board.model';

let boards: Array<{
  id: string;
  title: string;
  columns: object[];
}> = [];

/**
 * Get all boards
 * @returns all boards
 */
export function getAll(): object {
  return boards;
}

/**
 * Get board by id
 * @param boardId - id board from request
 * @returns - fined board || empty object
 */
export function getById(boardId: string): object {
  for (let i = 0; i < boards.length; i += 1) {
    if (Board.toResponse(boards[i]).id === boardId) {
      return Board.toResponse(boards[i]);
    }
  }
  return {};
}

/**
 * Create board
 * @param data - object with data to create board
 * @returns new created board
 */
export function create(data: object): object {
  const b = new Board(data);

  boards.push(Board.toResponse(b));

  return Board.toResponse(b);
}

/**
 * Put board by id
 * @param boardId - id board wich need to edit
 * @param data - object with new data
 * @returns Edited board || error object
 */
export function put(boardId: string, data: { title: string }) {
  for (let i = 0; i < boards.length; i += 1) {
    if (boards[i].id === boardId) {
      boards[i].title = data.title;

      return boards[i];
    }
  }

  return { error: 'Board not found' };
}

/**
 * Delete board by id
 * @param boardId id board with need to delete
 * @returns true if deleted
 */
export function deleteById(boardId: string) {
  let deleted = false;
  boards = boards.filter((board) => {
    if (board.id === boardId) {
      deleted = true;
    }
    return board.id !== boardId;
  });

  return deleted;
}
