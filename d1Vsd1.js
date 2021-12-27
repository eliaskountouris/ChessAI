var board = null
var game = new Chess()
const SPEED = 500

function depthOne () {
  var possibleMoves = pickMove(2,game.moves())

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  //game.move(possibleMoves[1])
  board.position(game.fen())
  window.setTimeout(depthOne, SPEED)
}

board = Chessboard('board', 'start')

window.setTimeout(depthOne, SPEED)