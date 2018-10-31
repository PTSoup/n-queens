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

  // if (row === n) {
  //   return board;
  // }
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
      return findSolution(row + 1, n, board, conflictCheck); 
    } else {
      board.togglePiece(row, i);
    }
    // else if it's not valid - take out that piece
    // go to the next row
  }
}


window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  //console.log('fresh board', board.rows());

  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts');
  solution = board.rows();
  //console.log('solution board', solution.rows());
  //[[1, 0 ,0],[0, 1, 0]]
  

  // var solution = [];
  // var length = n;
  // var matrix = function(n) {
  //   var counter = n;
  //   var board = [];
  //   if (counter === 0) {
  //     return;
  //   }
  //   for (var i = 0; i < length; i++) {
  //     if (i === n - 1) {
  //       board.push(1);
  //     } else {
  //       board.push(0);
  //     }
  //   }
  //   solution.push(board);
  //   n--;
  //   matrix(n);
  // /};

  //matrix(n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});

  //console.log('fresh board', board.rows());

  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts');
  solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
