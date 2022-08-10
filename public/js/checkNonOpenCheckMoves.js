
function getPossibleNonOpenCheckMovesOfPiece(piece,openCheckPiece) {
 
    let name = piece.name.toLowerCase();
    let color=piece.color
    let moves
    switch (name) {
      
      case "rook":
        moves = getNonOpenCheckRookMoves(piece,openCheckPiece);
        moves.forEach(move => {
          if(color ==="white"){

            forbiddenBlackKingMoves.push(move)
          }
          if(color ==="black")
          
          forbiddenWhiteKingMoves.push(move)
        });
        break;
      case "bishop":
        moves = getNonOpenCheckBishopMoves(piece,openCheckPiece);
        moves.forEach(move => {
          if(color ==="white"){

            forbiddenBlackKingMoves.push(move)
          }
          if(color ==="black")
          
          forbiddenWhiteKingMoves.push(move)
        });
        break;
      case "queen":
        moves = getNonOpenCheckQueenMoves(piece,openCheckPiece);
        moves.forEach(move => {
          if(color ==="white"){

            forbiddenBlackKingMoves.push(move)
          }
          if(color ==="black")
          
          forbiddenWhiteKingMoves.push(move)
        });
        break;
    }
}
