
/*
 * Calculates the best legal move for the given color.
 */
function getBestMove(game, color, currSum) {
    positionCount = 0;
  
    if (color === 'b') {
      var depth = 3;
    } else {
      var depth = 3;
    }
  
    var d = new Date().getTime();
    var [bestMove, bestMoveValue] = minimax(
      game,
      depth,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      true,
      currSum,
      color
    );
    var d2 = new Date().getTime();
    var moveTime = d2 - d;
    var positionsPerS = (positionCount * 1000) / moveTime;
  
    console.log('#position-count',positionCount);
    console.log('#time',moveTime / 1000);
    console.log('#positions-per-s',ath.round(positionsPerS));
  
    return [bestMove, bestMoveValue];
  }

/*
 * Makes the best legal move for the given color.
 */
function makeBestMove(color) {
    if (color === 'b') {
      var move = getBestMove(game, color, globalSum)[0];
    } else {
      var move = getBestMove(game, color, -globalSum)[0];
    }
  
    globalSum = evaluateBoard(game, move, globalSum, 'b');
    
  
    game.move(move);
    board.position(game.fen());
    //move here
  
    if (color === 'b') {
      checkStatus('black');
  
      // Highlight black move
    } else {
      checkStatus('white');
  
      // Highlight white move
    }
  }
  
var undo_stack = [];
function onDrop(source, target) {
    undo_stack = [];
    removeGreySquares();
  
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q', // NOTE: always promote to a queen for example simplicity
    });
  
    // Illegal move
    if (move === null) return 'snapback';
  
    globalSum = evaluateBoard(game, move, globalSum, 'b');
    
  
    // Highlight latest move
    if (!checkStatus('black'));
    {
      // Make the best move for black
      window.setTimeout(function () {
        makeBestMove('b');
        window.setTimeout(function () {
          showHint();
        }, 250);
      }, 250);
    }
  }

  
/*
 * Resets the game to its initial state.
 */
  function reset() {
    game.reset();
    globalSum = 0;
    board.position(game.fen());
  
    // Kill the Computer vs. Computer callback
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function checkStatus(color) {
    if (game.in_checkmate()) {
      $('#status').html(`<b>Checkmate!</b> Oops, <b>${color}</b> lost.`);
    } else if (game.insufficient_material()) {
      $('#status').html(`It's a <b>draw!</b> (Insufficient Material)`);
    } else if (game.in_threefold_repetition()) {
      $('#status').html(`It's a <b>draw!</b> (Threefold Repetition)`);
    } else if (game.in_stalemate()) {
      $('#status').html(`It's a <b>draw!</b> (Stalemate)`);
    } else if (game.in_draw()) {
      $('#status').html(`It's a <b>draw!</b> (50-move Rule)`);
    } else if (game.in_check()) {
      $('#status').html(`Oops, <b>${color}</b> is in <b>check!</b>`);
      return false;
    } else {
      $('#status').html(`No check, checkmate, or draw.`);
      return false;
    }
    return true;
  }
  function onDragStart(source, piece) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false;
  
    // or if it's not that side's turn
    if (
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)
    ) {
      return false;
    }
  }
  $('#showHint').change(function () {
    window.setTimeout(showHint, 250);
  });
  
  function showHint() {
    var showHint = document.getElementById('showHint');
    $board.find('.' + squareClass).removeClass('highlight-hint');
  
    // Show hint (best move for white)
    if (showHint.checked) {
      var move = getBestMove(game, 'w', -globalSum)[0];
  
      $board.find('.square-' + move.from).addClass('highlight-hint');
      $board.find('.square-' + move.to).addClass('highlight-hint');
    }
  }
  $('#redoBtn').on('click', function () {
    if (undo_stack.length >= 2) {
      // Redo twice: Player's last move, followed by opponent's last move
      redo();
      window.setTimeout(function () {
        redo();
        window.setTimeout(function () {
          showHint();
        }, 250);
      }, 250);
    } else {
      alert('Nothing to redo.');
    }
  });

  function redo() {
    game.move(undo_stack.pop());
    board.position(game.fen());
  }
  function undo() {
    var move = game.undo();
    undo_stack.push(move);
  
    // Maintain a maximum stack size
    if (undo_stack.length > STACK_SIZE) {
      undo_stack.shift();
    }
    board.position(game.fen());
  }
  
  $('#undoBtn').on('click', function () {
    if (game.history().length >= 2) {
      $board.find('.' + squareClass).removeClass('highlight-white');
      $board.find('.' + squareClass).removeClass('highlight-black');
      $board.find('.' + squareClass).removeClass('highlight-hint');
  
      // Undo twice: Opponent's latest move, followed by player's latest move
      undo();
      window.setTimeout(function () {
        undo();
        window.setTimeout(function () {
          showHint();
        }, 250);
      }, 250);
    } else {
      alert('Nothing to undo.');
    }
  });

/*
 * Event listeners for various buttons.
 */
  $('#ruyLopezBtn').on('click', function () {
    reset();
    game.load(
      'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1'
    );
    board.position(game.fen());
    window.setTimeout(function () {
      makeBestMove('b');
    }, 250);
  });
  $('#italianGameBtn').on('click', function () {
    reset();
    game.load(
      'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1'
    );
    board.position(game.fen());
    window.setTimeout(function () {
      makeBestMove('b');
    }, 250);
  });
  $('#sicilianDefenseBtn').on('click', function () {
    reset();
    game.load('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1');
    board.position(game.fen());
  });
  $('#startBtn').on('click', function () {
    reset();
  });
  
  $('#compVsCompBtn').on('click', function () {
    reset();
    compVsComp('w');
  });
  $('#resetBtn').on('click', function () {
    reset();
  });
  