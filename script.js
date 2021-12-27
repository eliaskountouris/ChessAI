var board = null
var game = new Chess()

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}

function makeRandomMove () {
   
  var possibleMoves = game.moves()

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  //game.move(possibleMoves[1])
  board.position(game.fen())
}

function depthOne () {
  var possibleMoves = depthSearchOne(1,game.moves())

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  //game.move(possibleMoves[1])
  board.position(game.fen())
}

function alphaBeta () {
  var possibleMoves = pickMove(2,game.moves(),game)

  // game over
  if (possibleMoves.length == 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  //game.move(possibleMoves[1])
  board.position(game.fen())
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  console.log(evaluation(game.board()))

  // make random legal move for black
  window.setTimeout(alphaBeta, 250)
} 

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  //console.log(game.fen())
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}

board = Chessboard('board', config)


