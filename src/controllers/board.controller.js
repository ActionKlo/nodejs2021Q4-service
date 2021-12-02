const uuid = require('uuid')
const board = require('../db/board.db')

exports.getAllBoards = (_, reply) => {
	reply.status(200).send(board.getAll())
}

exports.createBoard = (request, reply) => {
	const data = {}
	data.title = request.body.title

	console.log(request.body)
	if (request.body.columns) {
		const columns = request.body.columns.map(column => ({
				id: uuid.v4(),
				title: column.title,
				order: column.order
			}))

		data.columns = columns
	}

	console.log(data)
	reply.status(201).send(board.create(data))
}