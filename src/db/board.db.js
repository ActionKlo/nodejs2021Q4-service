const Board = require('../models/board.modes')

let boards = []

exports.getAll = () => boards

exports.getById = (boardId) => boards.filter(board => board.id === boardId)[0]

exports.create = (data) => {
	const b = new Board(data)
	boards.push(b)
	
	return Board.toResponse(b)
}

exports.put = (boardId, data) => {
	for (let i = 0; i < boards.length; i += 1) {
		if (boards[i].id === boardId) {
			boards[i] = data

			return boards[i]
		}
	}

	return { error: "Board not found" }
}

exports.delete = (boardId) => {
	let deleted = false
	boards = boards.filter(board => {
		if (board.id === boardId) {
			deleted = true
		}
		return board.id !== boardId
	})
	
	return deleted
}
