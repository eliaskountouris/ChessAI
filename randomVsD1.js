var board = null
var game = new Chess()
const SPEED = 50

function makeRandomMove () {
  var possibleMoves = game.moves()

  // exit if the game is over
  if (game.game_over()) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())

  window.setTimeout(makeRandomMove, SPEED)
}

function depthOne () {
  var possibleMoves = depthSearch(1,game.moves())

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  //game.move(possibleMoves[1])
  board.position(game.fen())
  window.setTimeout(depthOne, SPEED)
}

board = Chessboard('board', 'start')

if (game.turn == "w") {window.setTimeout(makeRandomMove, SPEED)}
else {window.setTimeout(depthOne, SPEED)}
  