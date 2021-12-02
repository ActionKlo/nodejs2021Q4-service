const uuid = require('uuid')
const users = require('../db/users.db')

exports.getAll = (_, reply) => {
	reply.status(200).send(users.getAll())
}

exports.getById = (request, reply) => {
	const user = users.getById(request.params.userId)

	if (!user) {
		reply.status(404).send({ error: "User not found" })
	}

	reply.status(200).send(user)
}

exports.create = (request, reply) => {
	const data = {}
	data.id = uuid.v4()
	data.login = request.body.login
	data.name = request.body.name
	data.password = request.body.password

	reply.status(201).send(users.create(data))
}

exports.deleteById = (request, reply) => {
	const {userId} = request.params
	
	if (users.delete(userId)) {
		reply.status(200).send({ msg: "User deleted"})
	}
	reply.status(404).send({ err: "User not found"})
}
