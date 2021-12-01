const { randomUUID } = require('crypto')
const users = require('../db/users.db')

exports.getAll = (_, reply) => {
	reply.status(200).send(users.getAll())
}

exports.getById = (request, reply) => {
	reply.status(200).send(users.getById(request.params.userId))
}

exports.create = (request, reply) => {
	const data = {}
	data.id = randomUUID()
	data.login = request.body.login
	data.name = request.body.name
	data.password = request.body.password

	reply.status(201).send(users.create(data))
}

exports.deleteById = (request, reply) => {
	const {userId} = request.params
	
	if (users.delete(userId)) {
		console.log("Udaleno")
		reply.status(200).send({ msg: "Udaleno"})
	}
	reply.status(404).send({ err: "User not found"})
}
