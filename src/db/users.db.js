let users = []
const User = require('../models/user.model')


exports.getAll = () => users.map(user => User.toResponse(user))

exports.getById = (userId) => User.toResponse(users.filter(user => user.id === userId)[0])

exports.create = (data) => {
	const user = new User(data)
	users.push(user)
	console.log(user)
	return User.toResponse(user)
}

exports.delete = (userId) => {
	let deleted = false
	users = users.filter(user => {
		if (user.id === userId) {
			deleted = true
		}
		return user.id !== userId
	})
	
	return deleted
}
