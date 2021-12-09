import { randomUUID } from "crypto"

class Board {
	id: string
	title: string
	columns: { id: string; title: string; order: number }[]
	constructor({
		id = randomUUID(),
		title = "Board title",
		columns = [{
			id: randomUUID(),
			title: "Column title 1",
			order: 1
		}]
	} = {}) {
		this.id = id
		this.title = title
		this.columns = columns
	}

	static toResponse(board : { id: string, title: string, columns: object[]}) {
		const { id, title, columns } = board
		return { id, title, columns }
	}
}

export = Board