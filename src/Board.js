// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var board = this.attributes;
      var counter = 0;
      for (var i = 0; i < board[rowIndex].length; i++) {
        if (board[rowIndex][i] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts

    hasAnyRowConflicts: function() {
      var board = this.attributes;
      var conflicts = [];
      for (var key in board) {
        conflicts.push(this.hasRowConflictAt(key));
      }
      return conflicts.reduce(function(acc, value) {
        acc = acc || value;
        return acc;
      }, false);
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.attributes;
      var counter = 0;

      // find each column
      for (var key in board) {
        // pass in column index
        if (board[key][colIndex] === 1) {
          //debugger;
          counter++;
        }
        // compare all column values to check for conflicts
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.attributes;
      var conflicts = [];

      for (var key in board) {
        conflicts.push(this.hasColConflictAt(key));
      }
      return conflicts.reduce(function(acc, value) {
        acc = acc || value;
        return acc;
      }, false);
    },

    // 0: [0, 1, 0, 0],
    // 1: [0, 0, 1, 0],
    // [0, 0, 0, 0],
    // [0, 0, 0, 0]

    // Major Diagonals - go from top-left to  bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var j = majorDiagonalColumnIndexAtFirstRow;
      var board = this.attributes;
      var counter = 0;
      var row;
      // check if majordia less than 0
      if (j < 0) {
        // increment row by abs(majordia)
        row = Math.abs(j).toString();
        // set majordia to 0
        j = 0;
      } else {
        row = "0";
      }
      // go through board
      while (j < (board.n) && Number(row) < (board.n)) {
        if (board[row][j] === 1) {
          counter++;
        }
        row++;
        row = row.toString();
        j++;
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.attributes;
      var conflicts = [];
      var start = 0 - (board.n - 1);

      for (var i = start; i < (board.n - 1); i++) {
        conflicts.push(this.hasMajorDiagonalConflictAt(i));
      }
      return conflicts.reduce(function(acc, value) {
        acc = acc || value;
        return acc;
      }, false);
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var j = minorDiagonalColumnIndexAtFirstRow;
      var board = this.attributes;
      var row;
      var counter = 0;
      // starting with the first row
      if (j > board.n - 1) {
        row = (j - (board.n - 1)).toString();
        j = board.n - 1;
      } else {
        row = "0";
      }
      while (j >= 0 && Number(row) < board.n) {
        if (board[row][j] === 1) {
          counter++;
        }
        row++;
        row = row.toString();
        j--;
      }
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var conflicts = [];
      var board = this.attributes;
      for (var i = 0; i < (board.n + board.n - 1); i++) {
        conflicts.push(this.hasMinorDiagonalConflictAt(i));
      }
      return conflicts.reduce(function(acc, value) {
        acc = acc || value;
        return acc;
      }, false);
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
