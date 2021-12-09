import Board from '../models/board.model'

// columns: { id: string; title: string; order: number }[]

// interface bordsss {
// 	id: string,
// 	title: string,
// 	order: number,
// 	columns: object[]
// }

let  boards: Array<{
	id: string,
	title: string,
	columns: object[]
}> = []

export function getAll() : object {
	return boards
}

export function getById(boardId: string): object {
	// console.log("---------------------------")
	// console.log(boardId)
	for (let i = 0; i < boards.length; i += 1) {
		// console.log("---------------------")
		// console.log(Board.toResponse(boards[i]))
		// console.log("---------------------")

		if (Board.toResponse(boards[i]).id === boardId) {
			return Board.toResponse(boards[i])
		}
	}
	return {}
}

export function create(data : object) : object {
	const b = new Board(data)
	
	boards.push(Board.toResponse(b))
	
	return Board.toResponse(b)
}

export function put (boardId : string, data : { title: string }) {
	console.log(data)
	for (let i = 0; i < boards.length; i += 1) {
		if (boards[i].id === boardId) {
			// boards[i] = data
			boards[i].title = data.title

			return boards[i]
		}
	}

	return { error: "Board not found" }
}

export function deleteById (boardId: string) {
	let deleted = false
	boards = boards.filter(board => {
		if (board.id === boardId) {
			deleted = true
		}
		return board.id !== boardId
	})
	
	return deleted
}
