const { getAll, getById, create, deleteById } = require('./user.router')

module.exports = (app) => {
	app.get('/users', getAll)
	app.get('/users/:userId', getById)

	app.post('/users', create)

	app.delete('/users/:userId', deleteById)
}
