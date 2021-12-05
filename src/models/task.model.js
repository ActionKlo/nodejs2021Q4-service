const uuid = require('uuid')

class Task {
	constructor({
		id = uuid.v4(),
		title = "Task title",
		order = 1,
		description = "Description",
		userId = null,
		boardId = null,
		columnId = null
	} = {}) {
		this.id = id
		this.title = title
		this.order = order
		this.description = description
		this.userId = userId
		this.boardId = boardId
		this.columnId = columnId
	}
}

module.exports = Task
