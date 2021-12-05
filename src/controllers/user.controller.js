const uuid = require('uuid')
const users = require('../db/users.db')
const tasks = require('../db/tasks.db')

exports.getAllUsers = (_, reply) => {
	reply.status(200).send(users.getAll())
}

exports.getUserById = (request, reply) => {
	const user = users.getById(request.params.userId)

	if (!user) {
		reply.status(404).send({ error: "User not found" })
	}

	reply.status(200).send(user)
}

exports.createUser = (request, reply) => {
	const data = {}
	data.id = uuid.v4()
	data.login = request.body.login
	data.name = request.body.name
	data.password = request.body.password

	reply.status(201).send(users.create(data))
}

exports.putUser = (request, reply) => {
	const data = request.body
	const {userId} = request.params

	reply.status(200).send(users.put(userId, data))
}

exports.deleteUserById = (request, reply) => {
	const { userId } = request.params
	
	if (users.delete(userId)) {
		tasks.deleteUserFromTask(userId)
		reply.status(200).send({ msg: "User deleted"})
	}
	reply.status(404).send({ err: "User not found"})
}
