const { getAllUsers, getUserById, createUser, putUser, deleteUserById } = require('../controllers/user.controller')
const { getAllBoards, getBoardById, createBoard, putBoard, deleteBoardById } = require('../controllers/board.controller')
const { getAlltasks, getTaskById, createTask, putTask, deleteTaskById} = require('../controllers/task.controller')

module.exports = (app) => {
	app.get('/users', getAllUsers)
	app.get('/users/:userId', getUserById)
	app.post('/users', createUser)
	app.put('/users/:userId', putUser)
	app.delete('/users/:userId', deleteUserById)

	app.get('/boards', getAllBoards)
	app.get('/boards/:boardId', getBoardById)
	app.post('/boards', createBoard)
	app.put('/boards/:boardId', putBoard)
	app.delete('/boards/:boardId', deleteBoardById)

	app.get('/boards/:boardId/tasks', getAlltasks)
	app.get('/boards/:boardId/tasks/:taskId', getTaskById)
	app.post('/boards/:boardId/tasks', createTask)
	app.put('/boards/:boardId/tasks/:taskId', putTask)
	app.delete('/boards/:boardId/tasks/:taskId', deleteTaskById)
}
