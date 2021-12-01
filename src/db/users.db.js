let users = []

exports.getAll = () => users

exports.getById = (id) => users.filter(user => user.id === id)[0]

exports.create = (data) => {
	users.push(data)

	return {
		id: data.id,
		login: data.login,
		name: data.name
	}
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
