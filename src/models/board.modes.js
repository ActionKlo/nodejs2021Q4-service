const uuid = require('uuid')

class Board {
	constructor({
		id = uuid.v4(),
		title = "Board title",
		columns = [{
			id: uuid.v4(),
			title: "Column title 1",
			order: 1
		}, {
			id: uuid.v4(),
			title: "Column title 2",
			order: 2
		}]
	} = {}) {
		this.id = id
		this.title = title
		this.columns = columns
		
	}

	static toResponse(board) {
		const { id, title, columns } = board
		return { id, title, columns }
	}
}

module.exports = Board