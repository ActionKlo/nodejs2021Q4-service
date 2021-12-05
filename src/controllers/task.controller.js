const tasks = require('../db/tasks.db')

exports.getAlltasks = (_, reply) => {
	reply.status(200).send(tasks.getAll())
}

exports.getTaskById = (request, reply) => {
	const task = tasks.getById(request.params.taskId)

	if (!task) {
		reply.status(404).send({ error: "Task not found" })
	}

	reply.status(200).send(task)
}

exports.createTask = (request, reply) => {
	const data = {}
	data.title = request.body.title
	data.order = request.body.order
	data.description = request.body.description
  data.userId = request.body.userId
  data.boardId = request.params.boardId
  data.columnId = request.body.columnId

	reply.status(201).send(tasks.create(data))
}

exports.putTask = (request, reply) => {
	const data = request.body
	const {taskId} = request.params

	reply.status(200).send(tasks.put(taskId, data))
}

exports.deleteTaskById = (request, reply) => {
	const { taskId } = request.params
	
	if (tasks.delete(taskId)) {
		reply.status(200).send({ msg: "Task deleted"})
	}
	reply.status(404).send({ err: "Task not found"})
}
