import { randomUUID } from 'crypto';
import User from '../models/user.model';

let users: Array<{
  id: string;
  name: string;
  login: string;
  password: string;
}> = [];

export function getAll() {
  return users.map((user) => User.toResponse(user));
}

export function getById(userId: string) {
  return User.toResponse(users.filter((user) => user.id === userId)[0]);
}

export function create(data: {
  name: string;
  login: string;
  password: string;
}) {
  const user = {
    id: randomUUID(),
    name: data.name,
    login: data.login,
    password: data.password,
  };

  users.push(user);

  return User.toResponse(user);
}

export function put(userId: string, data: { name: string }) {
  // users = users.map(user => {
  // 	if (user.id === userId) {
  // 		user = data
  // 	}
  // 	return data
  // })
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].id === userId) {
      users[i].name = data.name;

      return users[i];
    }
  }

  return { error: 'User not found' };
}

export function deleteById(userId: string) {
  let deleted = false;
  users = users.filter((user) => {
    if (user.id === userId) {
      deleted = true;
    }
    return user.id !== userId;
  });

  return deleted;
}
