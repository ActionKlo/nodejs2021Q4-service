import { FastifyInstance } from 'fastify';
import {
  getAllUsers,
  getUserById,
  createUser,
  putUser,
  deleteUserById,
} from '../controllers/user.controller';
import {
  getAllBoards,
  getBoardById,
  createBoard,
  putBoard,
  deleteBoardById,
} from '../controllers/board.controller';
import {
  getAlltasks,
  getTaskById,
  createTask,
  putTask,
  deleteTaskById,
} from '../controllers/task.controller';

/**
 * Function for route requests 
 * 
 * @param app - FastifyInstance
 */
export function router(app: FastifyInstance) {
  app.get('/users', getAllUsers);
  app.get('/users/:userId', getUserById);
  app.post('/users', createUser);
  app.put('/users/:userId', putUser);
  app.delete('/users/:userId', deleteUserById);

  app.get('/boards', getAllBoards);
  app.get('/boards/:boardId', getBoardById);
  app.post('/boards', createBoard);
  app.put('/boards/:boardId', putBoard);
  app.delete('/boards/:boardId', deleteBoardById);

  app.get('/boards/:boardId/tasks', getAlltasks);
  app.get('/boards/:boardId/tasks/:taskId', getTaskById);
  app.post('/boards/:boardId/tasks', createTask);
  app.put('/boards/:boardId/tasks/:taskId', putTask);
  app.delete('/boards/:boardId/tasks/:taskId', deleteTaskById);
}
