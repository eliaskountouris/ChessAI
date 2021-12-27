function evaluation(board) {
  var score = 0;
  for (let i of board) {
    for (let piece of i) {
      var color = 1;
      if (piece != null) {
        if (piece.color == "b") {
          color = -1;
        }
        if (piece.type == "n") {
          score += color * 2.75;
        } else if (piece.type == "b") {
          score += color * 3.25;
        } else if (piece.type == "p") {
          score += color * 1;
        } else if (piece.type == "q") {
          score += color * 9;
        } else if (piece.type == "r") {
          score += color * 5;
        } else if (piece.type == "r") {
          score += color * 5;
        } else if (piece.type == "k") {
          score += color * 100;
        }
      }
    }
  }
  return score;
}

function pickMove(depth, possibleMoves, currentGame = game) {
  var simulated = new Chess();
  simulated.load(currentGame.fen());

  console.log(possibleMoves);

  var MaxOrMin = 1;
  if (simulated.turn() == "b") {
    MaxOrMin = -1;
  }

  var bestMoves = [];
  var bestScore = MaxOrMin * -99999;
  var tempScore = 0;

  var moveList = moveSort(possibleMoves);
  console.log(moveList);

  for (let move of moveList) {
    simulated.load(currentGame.fen());
    //simulated.move(move);
    //tempScore = evaluation(simulated.board());
    tempScore = alphaBetaSearch(move, simulated, depth, -1000, 1000);

    if (MaxOrMin * tempScore > MaxOrMin * bestScore) {
      bestMoves = [];
      bestMoves.push(move);
      bestScore = tempScore;
    } else if (tempScore == bestScore) {
      bestMoves.push(move);
    }
  }
  return bestMoves;
}

function alphaBetaSearch(moveToMake, currentGame, depth, a, b) {
  var simulated = new Chess();
  simulated.load(currentGame.fen());
  simulated.move(moveToMake);

  if (depth == 0) {
    return evaluation(simulated.board());
  } else if (simulated.turn() == "w") {
    var bestScore = -1000;

    var moveList = moveSort(simulated.moves());

    for (let move of moveList) {
      bestScore = Math.max(
        bestScore,
        alphaBetaSearch(move, simulated, depth - 1, a, b)
      );
      a = Math.max(a, bestScore);
      if (bestScore >= b) {
        break;
      }
    }
    return bestScore;
  } else {
    var bestScore = 1000000000;

    var moveList = moveSort(simulated.moves());

    for (let move of moveList) {
      bestScore = Math.min(
        bestScore,
        alphaBetaSearch(move, simulated, depth - 1, a, b)
      );
      b = Math.min(b, bestScore);
      if (bestScore <= a) {
        break;
      }
    }
    return bestScore;
  }
}

function moveSort(possibleMoves) {
  var winCap = [];
  var eqCap = [];
  var loseCap = [];

  var checks = [];
  var attacks = [];
  var forward = [];
  var back = [];

  for (let move of possibleMoves) {
    if (move.includes("x")) {
      captures.push(move);
      possibleMoves = possibleMoves.filter((item) => item !== move);
    } else if (move.includes("+")) {
      checks.push(move);
      possibleMoves = possibleMoves.filter((item) => item !== move);
    } else if (isAttack(move)) {
      checks.push(move);
      possibleMoves = possibleMoves.filter((item) => item !== move);
    }
  }
  var returnList = captures.concat(
    checks.concat(attacks.concat(forward.concat(back.concat(possibleMoves))))
  );
  return returnList;
}

/*
function depthSearch(
  depth,
  moves,
  currentGame = game,
  currentScore = evaluation(currentGame.board())
) {
  var simulated = new Chess();
  simulated.load(currentGame.fen());

  var turn = 1;
  if (simulated.turn == "b") {
    turn = -1;
  }

  var possibleMoves = [];
  var minScore = -10000;
  var tempScore = 0;

  for (let move of moves) {
    simulated.load(currentGame.fen());
    simulated.move(move);

    if (depth != 1) {
      tempScore = Math.abs(depthSearch(
        depth - 1,
        simulated.moves(),
        simulated,
        currentScore
      ) - currentScore);
    } else {
      tempScore = Math.abs(evaluation(simulated.board()) - currentScore);
    }

    if (tempScore > minScore) {
      possibleMoves = [];
      possibleMoves.push(move);
      minScore = tempScore;
    } else if (tempScore == minScore) {
      possibleMoves.push(move);
    }
  }

  if (depth == 1) {
    return minScore;
  }
  return possibleMoves;
} */

function depthSearch(moveToMake, simulatedPosition, depthToSearch) {
  var newBoard = new Chess();
  newBoard.load(simulatedPosition.fen());
  newBoard.move(moveToMake);

  if (depthToSearch == 1) {
    var MaxOrMin = 1;
    if (newBoard.turn() == "b") {
      MaxOrMin = -1;
    }

    var bestScore = MaxOrMin * -10000;
    var tempScore = 0;

    var simulated = new Chess();

    for (let move of newBoard.moves()) {
      simulated.load(newBoard.fen());
      simulated.move(move);
      tempScore = evaluation(simulated.board());

      if (MaxOrMin * tempScore > MaxOrMin * bestScore) {
        bestScore = tempScore;
      }
    }
    return bestScore;
  } else {
    var MaxOrMin = 1;
    if (newBoard.turn() == "b") {
      MaxOrMin = -1;
    }

    var bestScore = MaxOrMin * -10000;
    var tempScore = 0;

    for (let move of newBoard.moves()) {
      tempScore = depthSearch(move, newBoard, depthToSearch - 1);

      if (MaxOrMin * tempScore > MaxOrMin * bestScore) {
        bestScore = tempScore;
      }
    }
    return bestScore;
  }
}
