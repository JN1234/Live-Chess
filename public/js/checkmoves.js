function getPossibleMovesOfPiece(piece) {
    if ( whiteKingChecked || blackKingChecked) {
      let name = piece.name.toLowerCase();
      let color=piece.color
      let moves
      switch (name) {
        
        case "rook":
          moves = getRookMoves(piece);
          moves.forEach(move => {
            if(color ==="white"){

              forbiddenBlackKingMoves.push(move)
            }
            if(color ==="black")
            
            forbiddenWhiteKingMoves.push(move)
          });
          break;
        case "bishop":
          moves = getBishopMoves(piece);
          moves.forEach(move => {
            if(color ==="white"){

              forbiddenBlackKingMoves.push(move)
            }
            if(color ==="black")
            
            forbiddenWhiteKingMoves.push(move)
          });
          break;
        case "queen":
          moves = getQueenMoves(piece);
          moves.forEach(move => {
            if(color ==="white"){

              forbiddenBlackKingMoves.push(move)
            }
            if(color ==="black")
            
            forbiddenWhiteKingMoves.push(move)
          });
          break;
        case "king":
          moves = getKingMoves(piece);
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
  }
