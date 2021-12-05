let users = []
const User = require('../models/user.model')


exports.getAll = () => users.map(user => User.toResponse(user))

exports.getById = (userId) => User.toResponse(users.filter(user => user.id === userId)[0])

exports.create = (data) => {
	const user = new User(data)
	users.push(user)
	
	return User.toResponse(user)
}

exports.put = (userId, data) => {
	// users = users.map(user => {
	// 	if (user.id === userId) {
	// 		user = data
	// 	}
	// 	return data
	// })
	for (let i = 0; i < users.length; i += 1) {
		if (users[i].id === userId) {
			users[i] = data

			return users[i]
		}
	}

	return { error: "User not found"}
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
