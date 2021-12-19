import { randomUUID } from 'crypto';

class Board {
  id: string;
  title: string;
  columns: { id: string; title: string; order: number }[];

  /**
   * Create Board
   *
   * @param param0 - object with default data for board
   */
  constructor({
    id = randomUUID(),
    title = 'Board title',
    columns = [
      {
        id: randomUUID(),
        title: 'Column title 1',
        order: 1,
      },
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return board from data
   *
   * @remarks
   * This function will be deleted in next updates
   * I have no time now =(
   *
   * @param board - board data
   * @returns board
   *
   * @beta
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static toResponse(board: { id: string; title: string; columns: object[] }) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export = Board;
