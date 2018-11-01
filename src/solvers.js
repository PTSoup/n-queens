/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findSolution = function(row, n, board, conflictCheck) {

  for (var i = 0; i < n; i++) {
    // place the piece 
    if (row === n) {
      return board;
    }
    board.togglePiece(row, i);
    // check if it's a valid spot
    // to the next row -
    if (!board[conflictCheck]()) {
      // Check this
      var results = findSolution(row + 1, n, board, conflictCheck);
      if (results) {
        return results;
      }
    }
    board.togglePiece(row, i);
    // else if it's not valid - take out that piece
    // go to the next row
  }
};

window.findNSolution = function(row, n, board, conflictCheck, count) {
  // count the number of solution boards
  // Every time findsolution returns a valid board, the count should be incremented
  
  for (var i = 0; i < n; i++) {
    if (row === n) {
      count++;
      return count;
    }
    board.togglePiece(row, i);
    if (!board[conflictCheck]()) {
      // Check this
      count = findNSolution(row + 1, n, board, conflictCheck, count);
    }
    board.togglePiece(row, i);
  }

  return count;

};


window.findNRooksSolution = function(n) {
  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts');
  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;

  var count = findNSolution(0, n, board, 'hasAnyRooksConflicts', solutionCount);


  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts');
  solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  debugger;
  var count = findNSolution(0, n, board, 'hasAnyQueensConflicts', solutionCount);


  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};
