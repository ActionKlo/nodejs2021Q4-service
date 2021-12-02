const { getAll, getById, create, deleteById } = require('../controllers/user.controller')
const { getAllBoards, createBoard } = require('../controllers/board.controller')

module.exports = (app) => {
	app.get('/users', getAll)
	app.get('/users/:userId', getById)

	app.post('/users', create)

	app.delete('/users/:userId', deleteById)

	app.get('/boards', getAllBoards)
	app.post('/boards', createBoard)
}
