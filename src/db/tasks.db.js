const Tasks = require('../models/task.model')

let tasks = []

exports.getAll = () => tasks

exports.getById = (taskId) => tasks.filter(task => task.id === taskId)[0]

exports.create = (data) => {
	const b = new Tasks(data)
	tasks.push(b)
	
	return b
}

exports.put = (taskId, data) => {
	for (let i = 0; i < tasks.length; i += 1) {
		if (tasks[i].id === taskId) {
			tasks[i] = data

			return tasks[i]
		}
	}

	return { error: "Task not found"}
}

exports.delete = (taskId) => {
	let deleted = false
	tasks = tasks.filter(task => {
		if (task.id === taskId) {
			deleted = true
		}
		return task.id !== taskId
	})
	
	return deleted
}

exports.deleteUserFromTask = (userId) => {
	tasks.map(task => {
		const item = task
		if (task.userId === userId) {
			item.userId = null
			return 1
		}
		return 1
	})
}

exports.deleteTaskByBordId = (boardId) => {
	tasks = tasks.filter(task => task.boardId !== boardId)

	return 1
}
