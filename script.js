let Board = new Array(24).fill(0)
let Turn = 0
let BoardType = 0

let legalMove = []
let displayedMove = []
let availableMove = []

const Staple1 = document.querySelector(".staple1")
const Staple2 = document.querySelector(".staple2")
const board = document.querySelector(".board")

const alphabet = "abcdefghijklmnopqrstuvwxyz"

class Move {
	constructor (from, to) {
		this.from = from
		this.to = to
	}
}

function checkCondition() {
	
	//Win Condition
	let Row = Board.slice(Board.length - 4, Board.length)
	if (Row.includes("S")) {
		if (BoardType === 1) {
			alert("Player 1 wins")
		} else if (BoardType === 2) {
			alert("Player 2 wins")
		}
		Turn = 0
		setGame("SSSS4444ssss u")
		return
	}
	Row = Board.slice(0, 4)
	if (Row.includes("s")) {
		if (BoardType === 1) {
			alert("Player 2 wins")
		} else if (BoardType === 2) {
			alert("Player 1 wins")
		}
		Turn = 0
		setGame("SSSS4444ssss u")
		return
	}

	if (!Board.includes("s")) {
		alert("Player 1 wins")
		Turn = 0
		setGame("SSSS4444ssss u")
		return
	} else if (!Board.includes("S")) {
		alert("Player 2 wins")
		Turn = 0
		setGame("SSSS4444ssss u")
		return
	}

	//Draw Condition
	for (i=0; i<Board.length;i++) {
		if (Board[i] == 0) continue
		else if (Board[i] === "S" && Turn === 1) {
			availableMove.push(...checkMove1(i+1))
		} else if (Board[i] === "s" && Turn === 2) {
			availableMove.push(...checkMove2(i+1))
		}
	}
	if (availableMove.length === 0) {
		alert("Draw")
		setGame("SSSS4444ssss u")
	}
}

function move(e) {
	let index = isNaN(parseInt(e.target.id)) ? parseInt(e.target.parentNode.id) : parseInt(e.target.id)
	const availableMoves = legalMove.some(x => x.to === index)
	if (availableMoves) {
		legalMove = (legalMove.filter(x => x.to === index))[0]
		Board[legalMove.to-1] = Board[legalMove.from-1]
		Board[legalMove.from-1] = 0
		updateBoard()
		legalMove = []
		Turn === 1 ? Turn = 2 : Turn = 1
		setTimeout(checkCondition, 1)
		removeDisplayedMove()
		availableMove = []
		return
	}

}

function removeDisplayedMove() {
	for (i=0; i<displayedMove.length; i++) {
		if (!document.getElementById(displayedMove[i]).innerHTML.includes("staple")) {
			document.getElementById(displayedMove[i]).innerHTML = ""
		}
		if (document.getElementById(displayedMove[i]).className === "dark") {
			document.getElementById(displayedMove[i]).style.backgroundColor = "forestgreen"
		} else if (document.getElementById(displayedMove[i]).className === "light") {
			document.getElementById(displayedMove[i]).style.backgroundColor = "white"
		}
	}
	displayedMove = []
}

function displayMove() {
	removeDisplayedMove()
	if (legalMove.length > 0) {
		for (i=0; i<legalMove.length; i++) {
			if (!Board[legalMove[i].to - 1]) {
				document.getElementById(legalMove[i].to).innerHTML = "<div class=\"dot\"></div>"
			} else {
				if (document.getElementById(legalMove[i].to).className === "dark") {
					document.getElementById(legalMove[i].to).style.backgroundColor = "darkgreen"
				} else if (document.getElementById(legalMove[i].to).className === "light") {
					document.getElementById(legalMove[i].to).style.backgroundColor = "lightgray"
				}
			}
			displayedMove.push(legalMove[i].to)
		}
	}
}

function checkMove1(index) {
	let Moves = []
	if (index < 5) {
		if (!Board[index+3]) {
			Moves.push(new Move(index, index + 4))
			if (!Board[index+3] && !Board[index+7]) Moves.push(new Move(index, index + 8))
		}
		
	} else if (index > 4) {
		if (!Board[index+3]) Moves.push(new Move(index, index + 4))
		if (index > 8) {
			if (!Board[index-5]) {
				Moves.push(new Move(index, index - 4))
			}
		}
	}
	if (Board[index + 4] === "s") {
		if (index % 4 !== 0) {
			Moves.push(new Move(index, index + 5))
		}
	}
	if (Board[index + 2] === "s") {
		if (index % 4 !== 1) {
			Moves.push(new Move(index, index + 3))
		}
	}
	return Moves
}

function staple1Click(e) {
	e.preventDefault()
	if (Turn === 2) return
	legalMove = checkMove1(parseInt(e.target.parentNode.id))
	availableMove.push(...legalMove)
	displayMove()
}

function checkMove2(index) {
	let Moves = []

	if (index > 20) {
		if (!Board[index-5]) {
			Moves.push(new Move(index, index - 4))
			if (!Board[index-5] && !Board[index - 9]) Moves.push(new Move(index, index - 8))
		}
		
	} else if (index < 21) {
		if (!Board[index-5]) Moves.push(new Move(index, index - 4))
		if (index < 17) {
			if (!Board[index+3]) {
				Moves.push(new Move(index, index + 4))
			}
		}
	}
	if (Board[index - 4] === "S") {
		if (index % 4 !== 0) {
			Moves.push(new Move(index, index - 3))
		}
	}
	if (Board[index - 6] === "S") {
		if (index % 4 !== 1) {
			Moves.push(new Move(index, index - 5))
		}
	}
	return Moves
}

function staple2Click(e) {
	e.preventDefault()
	if (Turn === 1) return
	legalMove = checkMove2(parseInt(e.target.parentNode.id))
	availableMove.push(...legalMove)
	displayMove()
}

function flipBoard() {
	if (BoardType === 1) {
		for (j=0; j<4; j++) {
			document.getElementById(`l${j}`).innerHTML = alphabet[3-j]
		}
		for (j=0; j<6; j++) {
			document.getElementById(`n${j}`).innerHTML = j+1
		}
		BoardType = 2
		Board = Board.reverse().map(x => {
			if (x === "S") {
				return "s"
			} else if (x === "s") {
				return "S"
			} else {
				return x
			}
		})
		updateBoard()
		document.querySelector(".player0").innerText = "Player 2"
		document.querySelector(".player1").innerText = "Player 1"
	} else if (BoardType === 2) {
		for (j=0; j<4; j++) {
			document.getElementById(`l${j}`).innerHTML = alphabet[j]
		}
		for (j=0; j<6; j++) {
			document.getElementById(`n${j}`).innerHTML = 6-j
		}
		BoardType = 1
		Board = Board.reverse().map(x => {
			if (x === "S") {
				return "s"
			} else if (x === "s") {
				return "S"
			} else {
				return x
			}
		})
		updateBoard()
		document.querySelector(".player0").innerText = "Player 1"
		document.querySelector(".player1").innerText = "Player 2"
	}
	if (Turn === 1) Turn = 2
	else if (Turn === 2) Turn = 1 
}

function updateBoard() {
	for (i = 0; i < Board.length; i++) {
		if (Board[i] === "S") {
			document.getElementById(`${i + 1}`).innerHTML = "<div class=\"staple1\" onclick=\"staple1Click(event)\"></div>"
		} else if (Board[i] === "s") {
			document.getElementById(`${i + 1}`).innerHTML = "<div class=\"staple2\" onclick=\"staple2Click(event)\"></div>"
		} else if (Board[i] === 0) {
			document.getElementById(`${i + 1}`).innerHTML = ""
		}
	}
	if (BoardType === 1) {
		for (j=0; j<4; j++) {
			document.getElementById(`l${j}`).innerHTML = alphabet[j]
		}
		for (j=0; j<6; j++) {
			document.getElementById(`n${j}`).innerHTML = 6-j
		}
	} else if (BoardType === 2) {
		for (j=0; j<4; j++) {
			document.getElementById(`l${j}`).innerHTML = alphabet[3-j]
		}
		for (j=0; j<6; j++) {
			document.getElementById(`n${j}`).innerHTML = j+1
		}
	}
}

function setGame(str) {
	Board = new Array(24).fill(0)
	let c = 0
	for (i = 0; i < str.length; i++) {
		if (str[i] === "S") {
			Board[c++] = str[i]
		} else if (str[i] === "s") {
			Board[c++] = str[i]
		} else if (/[1-4]/.test(str[i])) {
			c += parseInt(str[i])
		} else if (str[i] === "u") {
			Turn = 1
			BoardType = 1
		} else if (str[i] === "n") {
			Turn = 2
			BoardType = 2
		} else continue
	}
	if (c > 24 || Turn === 0 || BoardType === 0) alert("Invalid Notation")
	updateBoard()
}

function target(e) {
	e.preventDefault()
	if (e.target.style.backgroundColor !== "red" && e.target.style.backgroundColor !== "darkred") {
		if (e.target.className === "light") {
			e.target.style.backgroundColor = "red"
		} else if (e.target.className === "dark") {
			e.target.style.backgroundColor = "darkred"
		}

	} else {
		if (e.target.className === "light") {
			e.target.style.backgroundColor = "white"
		} else if (e.target.className === "dark") {
			e.target.style.backgroundColor = "forestgreen"
		}
	}
}

document.addEventListener("contextmenu", (e) => {
	e.preventDefault()
	removeDisplayedMove()
	legalMove = []
})

function key(e) {
	if (e.key === "f" || e.key === "F") {
		flipBoard()
	}
}

setGame("SSSS4444ssss u")