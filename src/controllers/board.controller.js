const uuid = require('uuid')
const boards = require('../db/board.db')
const tasks = require('../db/tasks.db')

exports.getAllBoards = (_, reply) => {
	reply.status(200).send(boards.getAll())
}

exports.getBoardById = (request, reply) => {
	const board = boards.getById(request.params.boardId)

	if (!board) {
		reply.status(404).send({ error: "Board not found" })
	}

	reply.status(200).send(board)
}

exports.createBoard = (request, reply) => {
	const data = {}
	data.title = request.body.title

	if (request.body.columns) {
		const columns = request.body.columns.map(column => ({
				id: uuid.v4(),
				title: column.title,
				order: column.order
			}))

		data.columns = columns
	}

	reply.status(201).send(boards.create(data))
}

exports.putBoard = (request, reply) => {
	const data = request.body
	const {boardId} = request.params

	reply.status(200).send(boards.put(boardId, data))
}

exports.deleteBoardById = (request, reply) => {
	const { boardId } = request.params
	
	if (boards.delete(boardId)) {
		tasks.deleteTaskByBordId(boardId)
		reply.status(200).send({ msg: "Board deleted"})
	}
	reply.status(404).send({ err: "Board not found"})
}
