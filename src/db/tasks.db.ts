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

export function getAll() {
  return tasks;
}

export function getById(taskId: string) {
  return tasks.filter((task) => task.id === taskId)[0];
}

export function create(data: object) {
  const b = new Task(data);
  tasks.push(b);

  return b;
}

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

export function deleteUserFromTask(userId: string) {
  tasks.map((task) => {
    const item = task;
    if (task.userId === userId) {
      item.userId = null;
      return 1;
    }
    return 1;
  });
}

export function deleteTaskByBordId(boardId: string) {
  tasks = tasks.filter((task) => task.boardId !== boardId);

  return 1;
}
