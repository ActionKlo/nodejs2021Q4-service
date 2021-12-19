import Task from '../models/task.model';

let tasks: Array<{
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}> = [];

/**
 * Get all tasks
 *
 * @returns all tasks
 */
export function getAll() {
  return tasks;
}

/**
 * Get task by id
 *
 * @param taskId - id task from request
 * @returns fined task || empty object
 */
export function getById(taskId: string) {
  return tasks.filter((task) => task.id === taskId)[0];
}

/**
 * Create task
 *
 * @param data - object with data to create task
 * @returns new created task
 */
export function create(data: object) {
  const b = new Task(data);
  tasks.push(b);

  return b;
}

/**
 * Put task by id
 *
 * @param taskId - id task that need to edit
 * @param data - object with new data
 * @returns Edited task || error
 */
export function put(
  taskId: string,
  data: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
  }
) {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].id === taskId) {
      tasks[i].title = data.title;
      tasks[i].order = data.order;
      tasks[i].description = data.description;
      tasks[i].userId = data.userId;
      tasks[i].boardId = data.boardId;
      tasks[i].columnId = data.columnId;

      return tasks[i];
    }
  }

  return { error: 'Task not found' };
}

/**
 * Delete task by id
 *
 * @param taskId - id taks that need to delete
 * @returns true if deleted || false if not found
 */
export function deleteById(taskId: string) {
  let deleted = false;
  tasks = tasks.filter((task) => {
    if (task.id === taskId) {
      deleted = true;
    }
    return task.id !== taskId;
  });

  return deleted;
}

/**
 * Find and dalate user from tasks
 *
 * @param userId - id user from request
 */
export function deleteUserFromTask(userId: string) {
  tasks.map((task) => {
    const item = task;
    if (task.userId === userId) {
      item.userId = null;
    }
  });
}

/**
 * Delete all task from board
 *
 * @param boardId - id board from request
 */
export function deleteTaskByBordId(boardId: string) {
  tasks = tasks.filter((task) => task.boardId !== boardId);
}
