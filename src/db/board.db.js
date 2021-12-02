const Board = require('../models/board.modes')

const boards = []

exports.getAll = () => boards

exports.create = (data) => {
	const b = new Board(data)
	boards.push(b)
	
	return Board.toResponse(b)
}