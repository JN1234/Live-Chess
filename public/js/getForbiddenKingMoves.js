
  function getRookMoves(piece) {
    let moves = [];
    let px = piece.x;
    let py = piece.y;
    let inside = true;

    let color = piece.color;
    //top
    let size = piece.size;

    moves.push({ x: px, y: py });

    py = piece.y - size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;
        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
      
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      py -= size;
    }
    
    
    
    //right

    px = piece.x + size;
    py = piece.y;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
              
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
    }
    
    
    
    //bottom

    px = piece.x;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
              if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      py += size;
    }
    
    
    
    //left

    px = piece.x - size;
    py = piece.y;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
              
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
    }
    
    
    
    return moves;
  }

  function getBishopMoves(piece) {
    let moves = [];
    let px = piece.x;
    let py = piece.y;
    let inside = true;

    let color = piece.color;
    //top
    let size = piece.size;

    moves.push({ x: px, y: py });

    px = piece.x + size;
    py = piece.y - size;

    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;
        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }

      px += size;
      py -= size;
    }
    
    
    
    //right

    px = piece.x + size;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
      py += size;
    }
    
    
    
    //bottom

    px = piece.x - size;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py += size;
    }
    
    
    
    //left

    px = piece.x - size;
    py = piece.y - size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py -= size;
    }
    
    
    
    return moves;
  }
  function getQueenMoves(piece) {
    let moves = [];
    let px = piece.x;
    let py = piece.y;
    let inside = true;

    let color = piece.color;
    //top
    let size = piece.size;

    moves.push({ x: px, y: py });

    py = piece.y - size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;
        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      py -= size;
    }
    
    
    
    //right

    px = piece.x + size;
    py = piece.y;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
    }
    
    
    
    //bottom

    px = piece.x;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      py += size;
    }
    
    
    
    //left

    px = piece.x - size;
    py = piece.y;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
    }

    
    
    
    //diagonal
    px = piece.x + size;
    py = piece.y - size;

    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;
        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }

      px += size;
      py -= size;
    }
    
    
    
    //right

    px = piece.x + size;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
      py += size;
    }
    
    
    
    //bottom

    px = piece.x - size;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py += size;
    }
    
    
    
    //left

    px = piece.x - size;
    py = piece.y - size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py -= size;
    }
    
    
    
    return moves;
  }

  function getKingMoves(piece) {
    let moves = [];
    let px = piece.x;
    let py = piece.y;
    let inside = true;
    let checkedSquares = 1;
    let color = piece.color;
    //top
    let size = piece.size;

    moves.push({ x: px, y: py });

    py = piece.y - size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;
        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }
      py -= size;
    }
    
    
    
    //right

    checkedSquares = 1;
    px = piece.x + size;
    py = piece.y;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }
      px += size;
    }

    
    
    
    //bottom
    checkedSquares = 1;

    px = piece.x;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }
      py += size;
    }
    
    
    
    //left

    checkedSquares = 1;

    px = piece.x - size;
    py = piece.y;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }
      px -= size;
    }

    
    
    
    //top-right
    checkedSquares = 1;
    px = piece.x + size;
    py = piece.y - size;

    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;
        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }

      px += size;
      py -= size;
    }

    
    
    
    //right-btm

    checkedSquares = 1;
    px = piece.x + size;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }
      px += size;
      py += size;
    }

    
    
    
    //bottom-left
    checkedSquares = 1;

    px = piece.x - size;
    py = piece.y + size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }
      px -= size;
      py += size;
    }

    
    
    
    //left-top
    checkedSquares = 1;

    px = piece.x - size;
    py = piece.y - size;
    while (true) {
      inside = FindPoint(
        boardLength - boardLength,
        boardLength - boardLength,
        boardLength,
        boardLength,
        px,
        py
      );
      if (inside) {
        let indexOfSquare;
        let indexOfOwn;

        function checkSquare(item) {
          return item.x === px && item.y === py && item.color !== color;
        }
        indexOfSquare = pieces.findIndex(checkSquare);

        function checkForOwnPiece(item) {
          return item.x === px && item.y === py && item.color === color;
        }

        indexOfOwn = pieces.findIndex(checkForOwnPiece);
        
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
        } else if (indexOfSquare !== -1) {
          if(pieces[indexOfSquare].name.toLowerCase() ==="king"){
            
          moves.push({ x: px, y: py });
          }
          else{
              
          moves.push({ x: px, y: py });
          break;
          }
        } else {
          
          
          break;
        }
      } else {
        break;
      }
      if (checkedSquares === 1) {
        break;
      }
      px -= size;
      py -= size;
    }
      if (castlingRights !== "-") {
        if (color === "white") {
          if (castlingRights.includes("Q")) {
            moves.push({
              x: squaresToCheckQueenSideWhite[2].x,
              y: squaresToCheckQueenSideWhite[2].y,
            });
          }
          if (castlingRights.includes("K")) {
            moves.push({
              x: squaresToCheckKingSideWhite[2].x,
              y: squaresToCheckKingSideWhite[2].y,
            });
          }
        }
        if (color === "black") {
          if (castlingRights.includes("q")) {
            moves.push({
              x: squaresToCheckQueenSideBlack[2].x,
              y: squaresToCheckQueenSideBlack[2].y,
            });
          }
          if (castlingRights.includes("k")) {
            moves.push({
              x: squaresToCheckKingSideBlack[2].x,
              y: squaresToCheckKingSideBlack[2].y,
            });
          }
        }
      }
      
      
      
      return moves;
    
  }
  
  export {getBishopMoves,getQueenMoves,getRookMoves,getKingMoves}