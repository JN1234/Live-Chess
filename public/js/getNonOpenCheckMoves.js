
  function getNonOpenCheckRookMoves(piece,openCheckPiece) {
    let moves = [];
    let px = piece.x;
    let py = piece.y;
    let inside = true;

    let color = piece.color;
    //top
    let size = piece.size;
    let foundOpenChechPiece=false
    
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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

  function getNonOpenCheckBishopMoves(piece,openCheckPiece) {
    let moves = [];
    let px = piece.x;
    let py = piece.y;
    let inside = true;

    let color = piece.color;
    //top
    let size = piece.size;
    let foundOpenChechPiece=false

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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
  function getNonOpenCheckQueenMoves(piece,openCheckPiece) {
    let moves = [];
    let px = piece.x;
    let py = piece.y;
    let inside = true;

    let color = piece.color;
    //top
    let size = piece.size;
    let foundOpenChechPiece=false

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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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

    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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
    
    if(foundOpenChechPiece){
      return moves;
    }else{
      moves=[]
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
          if(pieces[indexOfSquare].x === openCheckPiece.x && pieces[indexOfSquare].y === openCheckPiece.y){
            
          moves.push({ x: px, y: py });
          foundOpenChechPiece=true
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

  
  export {getNonOpenCheckBishopMoves,getNonOpenCheckQueenMoves,getNonOpenCheckRookMoves}