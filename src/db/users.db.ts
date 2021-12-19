import { randomUUID } from 'crypto';
import User from '../models/user.model';

let users: Array<{
  id: string;
  name: string;
  login: string;
  password: string;
}> = [];

/**
 * Get all users
 *
 * @returns all users
 */
export function getAll() {
  return users.map((user) => User.toResponse(user));
}

/**
 * Get user by id
 *
 * @param userId - id user from request
 * @returns fined user || empty object
 */
export function getById(userId: string) {
  return User.toResponse(users.filter((user) => user.id === userId)[0]);
}

/**
 * Create user
 *
 * @param data - object with data to create user
 * @returns new created user
 */
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

/**
 * Put user by id
 *
 * @param userId - id user that need to edit
 * @param data - object with new data
 * @returns Edited user || error
 */
export function put(userId: string, data: { name: string }) {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].id === userId) {
      users[i].name = data.name;

      return users[i];
    }
  }

  return { error: 'User not found' };
}

/**
 * Delete user by id
 *
 * @param userId - id user that need to delete
 * @returns true if deleted || false if not found
 */
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
