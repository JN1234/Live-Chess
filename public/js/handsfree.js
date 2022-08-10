var handsfree
var sketchWidth=600

let none = 0;
let king = 1;
let pawn = 2;
let knight = 3;
let bishop = 4;
let rook = 5;
let queen = 6;
let white = 8;
let black = 16;
let selectedPiece = null;
let prevSelectedPiece = null;
let pieceToSwap=null
let selectedBox;
let prevSelectedBox;
let possibleMoves = [];
let checkingCastling = false;
let gettingKingCheckedStatus=false
let checkingOpenCheck = false;
let checkCastlingRights = true;
let trimingKingMoves= false
let moving = false
let dialogOpen=false
let nameEachSquare=true
let allPossibleMovesBlack = [];
let allPossibleMovesToConsiderForCastling = [];
let piecesDefended=[]
let allPossibleMovesToConsiderForChecking = [];
let allPossibleMovesWhite = [];
let forbiddenWhiteKingMoves=[]
let forbiddenBlackKingMoves=[]
let movesForWhiteOpenCheckPiece=[]

let pieces_checking_white_king=[]
let pieces_checking_black_king=[]

let threefold_repetition=["","","","","","","","","",""]

let pieces_around_white_king=[]
let pieces_around_black_king=[]


let opponent_pieces_around_white_king=[]
let opponent_pieces_around_black_king=[]


let pieces_protecting_white_king=[]
let pieces_protecting_black_king=[]

let allMovesForWhiteOpenCheck=[]

let allMovesForBlackOpenCheck=[]


let allPossibleMovesBlackWhenChecked = [];
let allPossibleMovesWhiteWhenChecked = [];

let squaresToCheckQueenSideWhite = [];

let squaresToCheckKingSideWhite = [];

let squaresToCheckQueenSideBlack = [];

let squaresToCheckKingSideBlack = [];
let boardLength = 600;
let whiteKing = null;
let blackKing = null;

let whiteKingChecked = false;
let blackKingChecked = false;
//square colors
let lightColor = "#eff";
let darkColor = "brown";
let removed = false;
//piece imgs
let white_none_img;
let white_king_img;
let white_pawn_img;
let white_knight_img;
let white_bishop_img;
let white_rook_img;
let white_queen_img;

let black_none_img;
let black_king_img;
let black_pawn_img;
let black_knight_img;
let black_bishop_img;
let black_rook_img;
let black_queen_img;

let pieces = [];

let squares = [];
let white_pieces = [];
let black_pieces = [];
let removedPieces = [];
//FEN String
let currentFEN;
let piecePlacement = "";
let activeColor = "w";
let whiteCastlingRights = "-";
let blackCastlingRights = "-";
let castlingRights = "-";
let halfMoveClock = 0;
let fullMoveNumber = 0;
let possibleEnPassantTarget = "-";

let gameState=null

var playerTurn = document.getElementById("turn")

function startHandsFree(){
   handsfree.start()
}

function stopHandsFree(){
    handsfree.stop()
 }
function resetGame(){
   none = 0;
 king = 1;
 pawn = 2;
 knight = 3;
 bishop = 4;
 rook = 5;
 queen = 6;
 white = 8;
 black = 16;
 selectedPiece = null;
 prevSelectedPiece = null;
 pieceToSwap=null
 selectedBox;
 prevSelectedBox;
 possibleMoves = [];
 checkingCastling = false;
 gettingKingCheckedStatus=false
 checkingOpenCheck = false;
 checkCastlingRights = true;
 trimingKingMoves= false
 moving = false
 dialogOpen=false
 nameEachSquare=false
 allPossibleMovesBlack = [];
 allPossibleMovesToConsiderForCastling = [];
 piecesDefended=[]
 allPossibleMovesToConsiderForChecking = [];
 allPossibleMovesWhite = [];
 forbiddenWhiteKingMoves=[]
 forbiddenBlackKingMoves=[]
 movesForWhiteOpenCheckPiece=[]

 pieces_checking_white_king=[]
 pieces_checking_black_king=[]

 threefold_repetition=["","","","","","","","","",""]

 pieces_around_white_king=[]
 pieces_around_black_king=[]


 opponent_pieces_around_white_king=[]
 opponent_pieces_around_black_king=[]


 pieces_protecting_white_king=[]
 pieces_protecting_black_king=[]

 allMovesForWhiteOpenCheck=[]

 allMovesForBlackOpenCheck=[]


 allPossibleMovesBlackWhenChecked = [];
 allPossibleMovesWhiteWhenChecked = [];

 squaresToCheckQueenSideWhite = [];

 squaresToCheckKingSideWhite = [];

 squaresToCheckQueenSideBlack = [];

 squaresToCheckKingSideBlack = [];
 boardLength = 600;
 whiteKing = null;
 blackKing = null;

 whiteKingChecked = false;
 blackKingChecked = false;
//square colors
 lightColor = "#eff";
 darkColor = "brown";
 removed = false;
//piece imgs
 white_none_img;
 white_king_img;
 white_pawn_img;
 white_knight_img;
 white_bishop_img;
 white_rook_img;
 white_queen_img;

 black_none_img;
 black_king_img;
 black_pawn_img;
 black_knight_img;
 black_bishop_img;
 black_rook_img;
 black_queen_img;

 pieces = [];

 squares = [];
 white_pieces = [];
 black_pieces = [];
 removedPieces = [];
//FEN String
 currentFEN;
 piecePlacement = "";
 activeColor = "w";
 whiteCastlingRights = "-";
 blackCastlingRights = "-";
 castlingRights = "-";
 halfMoveClock = 0;
 fullMoveNumber = 0;
 possibleEnPassantTarget = "-";

 gameState=null
loadGame(startFEN)
}
class Game {
  
  constructor(over=false,playerOne="player 1",playerTwo ="player 2"){

    this.over = over
    this.drawRequested = false
    this.players={
      "white":playerOne,
      "black":playerTwo
    }
    this.message=""

  }

}
class Square {
  constructor(x, y, length, occupied = false, color, type, name) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.name = name;
    this.color = color;
    this.length = length;
    this.brightness = 0;
    this.occupied = occupied;
  }

  changeColor(color) {
    this.color = color;
  }
  clicked(px, py) {
    let inside = this.FindPoint(
      this.x,
      this.y,
      this.x + this.length,
      this.y + this.length,
      px,
      py
    );
    if (inside) {
      return true;
    }
    return false;
  }
  FindPoint(x1, y1, x2, y2, x, y) {
    if (x >= x1 && x < x2 && y >= y1 && y < y2) return true;

    return false;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(this.color);

    square(this.x, this.y, this.length);
    fill("black")
    if(nameEachSquare){
      let x=this.name
        switch(this.name.charAt(0)){
          case "a":
            x=1
            break;
          case "b":
            x=2
            break;
          case "c":
            x=3
            break;
          case "d":
            x=4
            break;
            case "e":
            x=5
            break;
          case "f":
            x=6
            break;
          case "g":
            x=7
            break;
          case "h":
            x=8
            break;
          
        }
      text(x+this.name.charAt(1), this.x, this.y,boardLength/10);
    }
    else{
      
    
      if(this.name.charAt(0) === "a"){
        
      text(this.name.charAt(1), this.x , this.y + this.length/2,boardLength/10);
      }
      if(this.name.charAt(1) === "1"){
       
        
        text(this.name.charAt(0), this.x + this.length/2,this.y + this.length - 9 ,boardLength/10);
        }
    }
  }
}
class Piece {
  constructor(name, color, image, x, y, size, moved = false) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.x = x;
    this.y = y;
    this.moved = moved;
    this.movesMade = 0;
    this.prevMoveType = "none";
    this.size = size;
    this.legalMoves = [];
  }
  changeMoves(moves){
    this.legalMoves=moves
  }

  swapPiece(newName,pieceImg){
    let name = this.color = "white" ? newName : newName.toLowerCase()
    this.changeName(name)
    
    this.changeImage(pieceImg)
  }
  
  changeImage(imagem){
    this.image= imagem

    
  }
  changeName(pieceName){
    
    this.name= pieceName
  }
  clicked(px, py) {
    let inside = this.FindPoint(
      this.x,
      this.y,
      this.x + this.size,
      this.y + this.size,
      px,
      py
    );
    if (inside) {
      return true;
    }
    return false;
  }

  FindPoint(x1, y1, x2, y2, x, y) {
    if (x >= x1 && x < x2 && y >= y1 && y < y2) return true;

    return false;
  }
  move(px, py) {
    
    moving =true
    console.log("move - here");
    let color = this.color;
    let name = this.name.toLowerCase();
    if (color.startsWith(activeColor)) {
      
  let threefoldrecord = `${piecePlacement} ${possibleEnPassantTarget}`
  
  console.log("Three fold record",threefoldrecord)
  
  console.log("Three fold repitionnnnnn",threefold_repetition)
  checkThreeFoldRepetition( threefoldrecord)
      if (activeColor === "b") {
        fullMoveNumber++;
        console.log("fm", fullMoveNumber);
      }
      if (name === "pawn") {
        halfMoveClock = 0;
      } else {
        halfMoveClock++;
      }
      activeColor = color === "white" ? "b" : "w";

      if (name === "king") {
        if (color === "white") {
          function checkSquareForCastling(item) {
            return item.x === selectedBox.x && item.y === selectedBox.y;
          }

          let indexOfQueenSquare = squaresToCheckQueenSideWhite.findIndex(
            checkSquareForCastling
          );

          let indexOfKingSquare = squaresToCheckKingSideWhite.findIndex(
            checkSquareForCastling
          );

          if (indexOfQueenSquare === 2) {
            this.x = px;
            this.y = py;
            for (let p of pieces) {
              if (
                p.x === squaresToCheckQueenSideWhite[0].x &&
                p.y === squaresToCheckQueenSideWhite[0].y
              ) {
                p.x = squaresToCheckQueenSideWhite[3].x;
                p.y = squaresToCheckQueenSideWhite[3].y;
                p.moved = true;
                squaresToCheckQueenSideWhite[0].occupied = false;
                squaresToCheckQueenSideWhite[3].occupied = true;
              }
            }
          }
          else if (indexOfKingSquare === 2) {
            this.x = px;
            this.y = py;
            for (let p of pieces) {
              if (
                p.x ===
                  squaresToCheckKingSideWhite[
                    squaresToCheckKingSideWhite.length - 1
                  ].x &&
                p.y ===
                  squaresToCheckKingSideWhite[
                    squaresToCheckKingSideWhite.length - 1
                  ].y
              ) {
                p.x = squaresToCheckKingSideWhite[1].x;
                p.y = squaresToCheckKingSideWhite[1].y;
                p.moved = true;
                squaresToCheckKingSideWhite[
                  squaresToCheckKingSideWhite.length - 1
                ].occupied = false;
                squaresToCheckKingSideWhite[1].occupied = true;
              }
            }
          }
          else{
            this.x = px;
            this.y = py;
          }
        }
        if (color === "black") {
          function checkSquareForCastling(item) {
            return item.x === selectedBox.x && item.y === selectedBox.y;
          }

          let indexOfQueenSquare = squaresToCheckQueenSideBlack.findIndex(
            checkSquareForCastling
          );

          let indexOfKingSquare = squaresToCheckKingSideBlack.findIndex(
            checkSquareForCastling
          );

          if (indexOfQueenSquare === 2) {
            this.x = px;
            this.y = py;
            for (let p of pieces) {
              if (
                p.x === squaresToCheckQueenSideBlack[0].x &&
                p.y === squaresToCheckQueenSideBlack[0].y
              ) {
                p.x = squaresToCheckQueenSideBlack[3].x;
                p.y = squaresToCheckQueenSideBlack[3].y;
                p.moved = true;
                squaresToCheckQueenSideBlack[0].occupied = false;
                squaresToCheckQueenSideBlack[3].occupied = true;
              }
            }
          }
          else if (indexOfKingSquare === 2) {
            this.x = px;
            this.y = py;
            for (let p of pieces) {
              if (
                p.x ===
                  squaresToCheckKingSideBlack[
                    squaresToCheckKingSideBlack.length - 1
                  ].x &&
                p.y ===
                  squaresToCheckKingSideBlack[
                    squaresToCheckKingSideBlack.length - 1
                  ].y
              ) {
                p.x = squaresToCheckKingSideBlack[1].x;
                p.y = squaresToCheckKingSideBlack[1].y;
                p.moved = true;
                squaresToCheckKingSideBlack[
                  squaresToCheckKingSideBlack.length - 1
                ].occupied = false;
                squaresToCheckKingSideBlack[1].occupied = true;
              }
            }
          }
          else{
            this.x = px;
            this.y = py;
          }
        
        }
      } else if (name === "rook") {
        if (castlingRights) {
          if (color === "white") {
            function checkSquareForCastling(item) {
              return item.x === selectedBox.x && item.y === selectedBox.y;
            }

            let indexOfQueenSquare = squaresToCheckQueenSideWhite.findIndex(
              checkSquareForCastling
            );

            let indexOfKingSquare = squaresToCheckKingSideWhite.findIndex(
              checkSquareForCastling
            );

            if (castlingRights.includes("Q")) {
              if (
                this.x === squaresToCheckQueenSideWhite[0].x &&
                this.y === squaresToCheckQueenSideWhite[0].y
              ) {
                if (indexOfQueenSquare === 3) {
                  this.x = px;
                  this.y = py;
                  for (let p of pieces) {
                    if (
                      p.x === squaresToCheckQueenSideWhite[4].x &&
                      p.y === squaresToCheckQueenSideWhite[4].y
                    ) {
                      p.x = squaresToCheckQueenSideWhite[2].x;
                      p.y = squaresToCheckQueenSideWhite[2].y;
                      p.moved = true;
                      squaresToCheckQueenSideWhite[4].occupied = false;
                      squaresToCheckQueenSideWhite[2].occupied = true;
                    }
                  }
                }
              }
            }
            else if (castlingRights.includes("K")) {
              if (
                this.x === squaresToCheckKingSideWhite[3].x &&
                this.y === squaresToCheckKingSideWhite[3].y
              ) {
                if (indexOfKingSquare === 1) {
                  this.x = px;
                  this.y = py;
                  for (let p of pieces) {
                    if (
                      p.x === squaresToCheckKingSideWhite[0].x &&
                      p.y === squaresToCheckKingSideWhite[0].y
                    ) {
                      p.x = squaresToCheckKingSideWhite[2].x;
                      p.y = squaresToCheckKingSideWhite[2].y;
                      p.moved = true;
                      squaresToCheckKingSideWhite[0].occupied = false;

                      squaresToCheckKingSideWhite[2].occupied = true;
                    }
                  }
                }
              }
            }else{
              this.x = px;
              this.y = py;
            }
          } 
          if (color === "black") {
            
            function checkSquareForCastling(item) {
              return item.x === selectedBox.x && item.y === selectedBox.y;
            }

            let indexOfQueenSquare = squaresToCheckQueenSideBlack.findIndex(
              checkSquareForCastling
            );

            let indexOfKingSquare = squaresToCheckKingSideBlack.findIndex(
              checkSquareForCastling
            );

            if (castlingRights.includes("q")) {
              if (
                this.x === squaresToCheckQueenSideBlack[0].x &&
                this.y === squaresToCheckQueenSideBlack[0].y
              ) {
                if (indexOfQueenSquare === 3) {
                  this.x = px;
                  this.y = py;
                  for (let p of pieces) {
                    if (
                      p.x === squaresToCheckQueenSideBlack[4].x &&
                      p.y === squaresToCheckQueenSideBlack[4].y
                    ) {
                      p.x = squaresToCheckQueenSideBlack[2].x;
                      p.y = squaresToCheckQueenSideBlack[2].y;
                      p.moved = true;
                      squaresToCheckQueenSideBlack[4].occupied = false;
                      squaresToCheckQueenSideBlack[2].occupied = true;
                    }
                  }
                }
              }
            }
            else if (castlingRights.includes("k")) {
              if (
                this.x === squaresToCheckKingSideBlack[3].x &&
                this.y === squaresToCheckKingSideBlack[3].y
              ) {
                if (indexOfKingSquare === 1) {
                  this.x = px;
                  this.y = py;
                  for (let p of pieces) {
                    if (
                      p.x === squaresToCheckKingSideBlack[0].x &&
                      p.y === squaresToCheckKingSideBlack[0].y
                    ) {
                      p.x = squaresToCheckKingSideBlack[2].x;
                      p.y = squaresToCheckKingSideBlack[2].y;
                      p.moved = true;
                      squaresToCheckKingSideBlack[0].occupied = false;

                      squaresToCheckKingSideBlack[2].occupied = true;
                    }
                  }
                }
              }
            }else{
              this.x = px;
              this.y = py;
            }
          } 
        } 
      } else {
        this.x = px;
        this.y = py;
      }

      this.moved = true;
      this.movesMade++;
      possibleMoves = [];
      prevSelectedBox.occupied = false;
      selectedBox.occupied = true;
      selectedPiece = null;
      prevSelectedPiece = null;
      selectedBox = null;
      prevSelectedBox = null;
      pieces.forEach((item) => {
        if (item.color !== color && item.name.toLowerCase() === "pawn") {
          item.prevMoveType = "normal";
        }
      });
    }
    if(name === "pawn"){
      if(color ==="white" && this.y === 0){
        requestPieceSwap(this)
      }
      if(color === "black" && this.y === (boardLength - this.size)){
        requestPieceSwap(this)
      }
    }
    moving =false
  }
  show() {
    if (this.image) {
      image(this.image, this.x, this.y, this.size, this.size);
    } else {
      stroke(255);
      strokeWeight(2);
      fill(0);

      square(this.x, this.y, this.size);
    }
  }

  getPossibleMoves() {
    if (this.color.startsWith(activeColor) || checkingCastling || whiteKingChecked || blackKingChecked || gettingKingCheckedStatus || checkingOpenCheck || trimingKingMoves) {
      let name = this.name.toLowerCase();
      switch (name) {
        case "pawn":
          this.getPawnMoves();
          break;
        case "knight":
          this.getKnightMoves();
          break;
        case "rook":
          this.getRookMoves();
          break;
        case "bishop":
          this.getBishopMoves();
          break;
        case "queen":
          this.getQueenMoves();
          break;
        case "king":
          this.getKingMoves();
          break;
      }
    }
  }

  getPawnMoves() {
    let moves = [];
    let kingCheckingMoves=[]
    let piecesGuardedByPiece=[]
    let px = this.x;
    let py = this.y;
    let inside = true;
    let color = this.color;

    let size = this.size;
    let movesMade = this.movesMade;
    let indexOfBlackKing= -1
    let indexOfWhiteKing=-1
    if (color === "white") {
      if (this.moved) {
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside && px === this.x && py >= this.y - size) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              function checkSquare(item) {
                return item.x === px && item.y === py;
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare === -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
              } else {
                break;
              }
            }
          } else {
            break;
          }

          py -= size;
        }
        
          
          function checkForBlackKingSquare(item) {
            return item.x === blackKing.x && item.y === blackKing.y;
          }

           indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

          if(blackKingChecked && indexOfBlackKing  !== -1){
             
              kingCheckingMoves.forEach(move=>{
                
              allPossibleMovesBlackWhenChecked.push(move)
              })
          }

          kingCheckingMoves= []

        px = this.x + size;
        py = this.y - size;
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              function checkSquare(item) {
                return (
                  (item.x === px && item.y === py && item.color !== color) ||
                  (item.x === px &&
                    item.y - size === py &&
                    item.color !== color &&
                    item.name.toLowerCase() === "pawn" &&
                    item.prevMoveType === "en passant" &&
                    movesMade === 3)
                );
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare !== -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
                  kingCheckingMoves.push({x: px, y: py})
                  }
                }

              function checkSquareForOwnPiece(item) {
                return (item.x === px && item.y === py && item.color === color)
              }
              let indexOfProtectedPiece = pieces.findIndex(checkSquareForOwnPiece);
              if (indexOfProtectedPiece !== -1) {
                piecesGuardedByPiece.push(pieces[indexOfProtectedPiece]);
              }
            }
          }
          if (px === this.x - size && py === this.y - size) {
            break;
          }
          px = this.x - size;
          py = this.y - size;
        }
        indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

        if(blackKingChecked && indexOfBlackKing  !== -1){
           
            kingCheckingMoves.forEach(move=>{
              
            allPossibleMovesBlackWhenChecked.push(move)
            })
        }
        
        kingCheckingMoves= []
        this.legalMoves = moves;

        if(gettingKingCheckedStatus){
          allPossibleMovesToConsiderForChecking=moves
        }
        if (checkingCastling) {
          allPossibleMovesToConsiderForCastling = moves;
        } else {
          possibleMoves = moves;
        }
      } else {
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside && px === this.x && py >= this.y - size * 2) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              let color = this.color;
              function checkSquare(item) {
                return item.x === px && item.y === py;
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare === -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
              } else {
                break;
              }
            }
          } else {
            break;
          }

          py -= size;
        }
        function checkForBlackKingSquare(item) {
          return item.x === blackKing.x && item.y === blackKing.y;
        }

         indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

        if(blackKingChecked && indexOfBlackKing  !== -1){
           
            kingCheckingMoves.forEach(move=>{
              
            allPossibleMovesBlackWhenChecked.push(move)
            })
        }
        
        kingCheckingMoves= []
        px = this.x + size;
        py = this.y - size;
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              function checkSquare(item) {
                return (
                  (item.x === px && item.y === py && item.color !== color) ||
                  (item.x === px &&
                    item.y - size === py &&
                    item.color !== color &&
                    item.name.toLowerCase() === "pawn" &&
                    item.prevMoveType === "en passant" &&
                    movesMade === 3)
                );
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare !== -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
                }
              }

              function checkSquareForOwnPiece(item) {
                return (item.x === px && item.y === py && item.color === color)
              }
              let indexOfProtectedPiece = pieces.findIndex(checkSquareForOwnPiece);
              if (indexOfProtectedPiece !== -1) {
                piecesGuardedByPiece.push(pieces[indexOfProtectedPiece]);
              }
            }
          }
          if (px === this.x - size && py === this.y - size) {
            break;
          }
          px = this.x - size;
          py = this.y - size;
        }
        indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

        if(blackKingChecked && indexOfBlackKing  !== -1){
           
            kingCheckingMoves.forEach(move=>{
              
            allPossibleMovesBlackWhenChecked.push(move)
            })
        }
        
        kingCheckingMoves= []
        this.legalMoves = moves;

        if(gettingKingCheckedStatus){
          allPossibleMovesToConsiderForChecking=moves
        }
        if (checkingCastling) {
          allPossibleMovesToConsiderForCastling = moves;
        } else {
          possibleMoves = moves;
        }
      }
    } else {
      if (this.moved) {
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside && px === this.x && py <= this.y + size) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              let color = this.color;
              function checkSquare(item) {
                return item.x === px && item.y === py;
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare === -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
              } else {
                break;
              }
            }
          } else {
            break;
          }

          py += size;
        }
        function checkForWhiteKingSquare(item) {
          return item.x === whiteKing.x && item.y === whiteKing.y;
        }

        let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

        if(whiteKingChecked && indexOfWhiteKing  !== -1){
           
            kingCheckingMoves.forEach(move=>{
              
            allPossibleMovesWhiteWhenChecked.push(move)
            })
        }
        
        kingCheckingMoves= []
        px = this.x + size;
        py = this.y + size;
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              function checkSquare(item) {
                return (
                  (item.x === px && item.y === py && item.color !== color) ||
                  (item.x === px &&
                    item.y + size === py &&
                    item.color !== color &&
                    item.name.toLowerCase() === "pawn" &&
                    item.prevMoveType === "en passant" &&
                    movesMade === 3)
                );
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare !== -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
                }
              }

              function checkSquareForOwnPiece(item) {
                return (item.x === px && item.y === py && item.color === color)
              }
              let indexOfProtectedPiece = pieces.findIndex(checkSquareForOwnPiece);
              if (indexOfProtectedPiece !== -1) {
                piecesGuardedByPiece.push(pieces[indexOfProtectedPiece]);
              }
            }
          }
          if (px === this.x - size && py === this.y + size) {
            break;
          }
          px = this.x - size;
          py = this.y + size;
        }
         indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

        if(whiteKingChecked && indexOfWhiteKing  !== -1){
           
            kingCheckingMoves.forEach(move=>{
              
            allPossibleMovesWhiteWhenChecked.push(move)
            })
        }
        
        kingCheckingMoves= []
        this.legalMoves = moves;

        if(gettingKingCheckedStatus){
          allPossibleMovesToConsiderForChecking=moves
        }
        if (checkingCastling) {
          allPossibleMovesToConsiderForCastling = moves;
        } else {
          possibleMoves = moves;
        }
      } else {
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside && px === this.x && py <= this.y + size * 2) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              function checkSquare(item) {
                return item.x === px && item.y === py;
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare === -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
              } else {
                break;
              }
            }
          } else {
            break;
          }

          py += size;
        }
        
        function checkForWhiteKingSquare(item) {
          return item.x === whiteKing.x && item.y === whiteKing.y;
        }

        indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

        if(whiteKingChecked && indexOfWhiteKing  !== -1){
           
            kingCheckingMoves.forEach(move=>{
              
            allPossibleMovesWhiteWhenChecked.push(move)
            })
        }
        
        kingCheckingMoves= []
        px = this.x + size;
        py = this.y + size;
        while (true) {
          inside = this.FindPoint(
            boardLength - boardLength,
            boardLength - boardLength,
            boardLength,
            boardLength,
            px,
            py
          );
          if (inside) {
            if (px === this.x && py === this.y) {
              moves.push({ x: px, y: py });
            } else {
              function checkSquare(item) {
                return (
                  (item.x === px && item.y === py && item.color !== color) ||
                  (item.x === px &&
                    item.y + size === py &&
                    item.color !== color &&
                    item.name.toLowerCase() === "pawn" &&
                    item.prevMoveType === "en passant" &&
                    movesMade === 3)
                );
              }
              let indexOfSquare = pieces.findIndex(checkSquare);
              if (indexOfSquare !== -1) {
                moves.push({ x: px, y: py });
                if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
                }
              }

              function checkSquareForOwnPiece(item) {
                return (item.x === px && item.y === py && item.color === color)
              }
              let indexOfProtectedPiece = pieces.findIndex(checkSquareForOwnPiece);
              if (indexOfProtectedPiece !== -1) {
                piecesGuardedByPiece.push(pieces[indexOfProtectedPiece]);
              }
            }
          }
          if (px === this.x - size && py === this.y + size) {
            break;
          }
          px = this.x - size;
          py = this.y + size;
        }
      
         indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

        if(whiteKingChecked && indexOfWhiteKing  !== -1){
           
            kingCheckingMoves.forEach(move=>{
              
            allPossibleMovesWhiteWhenChecked.push(move)
            })
        }
        piecesGuardedByPiece.forEach(piece=>{
          piecesDefended.push(piece)
        })
        kingCheckingMoves= []
        this.legalMoves = moves;

        if(gettingKingCheckedStatus){
          allPossibleMovesToConsiderForChecking=moves
        }
        if (checkingCastling) {
          allPossibleMovesToConsiderForCastling = moves;
        } else {
          possibleMoves = moves;
        }
      }
    }
  }

  getKnightMoves() {
    let moves = [];
    let kingCheckingMoves=[]
    let piecesGuardedByPiece=[]
    let px = this.x;
    let py = this.y;
    let inside = true;
    let checkedSquares = 1;
    let color = this.color;
    //top
    let size = this.size;

    moves.push({ x: px, y: py });
    px = this.x + size;
    py = this.y - size * 2;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (
          (indexOfSquare === -1 && indexOfOwn === -1) ||
          indexOfSquare !== -1
        ) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        }
      }
      
      if (checkedSquares === 2) {
        break;
      }
      checkedSquares++;
      px = this.x - size;
    }
   if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        
          
        allPossibleMovesBlackWhenChecked.push({x:this.x,y:this.y})
        
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        
          
        allPossibleMovesWhiteWhenChecked.push({x:this.x,y:this.y})
        
    }}
    
    kingCheckingMoves= []
    //right
    checkedSquares = 1;

    px = this.x + size * 2;
    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (
          (indexOfSquare === -1 && indexOfOwn === -1) ||
          indexOfSquare !== -1
        ) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        }
      }
      
      
      if (checkedSquares === 2) {
        break;
      }
      checkedSquares++;
      py = this.y + size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        
          
        allPossibleMovesBlackWhenChecked.push({x:this.x,y:this.y})
        
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        
          
        allPossibleMovesWhiteWhenChecked.push({x:this.x,y:this.y})
        
    }}
    
    kingCheckingMoves= []
    //bottom
    checkedSquares = 1;

    px = this.x + size;
    py = this.y + size * 2;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (
          (indexOfSquare === -1 && indexOfOwn === -1) ||
          indexOfSquare !== -1
        ) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        }
      }
      
      
      if (checkedSquares === 2) {
        break;
      }
      checkedSquares++;
      px = this.x - size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        
          
        allPossibleMovesBlackWhenChecked.push({x:this.x,y:this.y})
        
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        
          
        allPossibleMovesWhiteWhenChecked.push({x:this.x,y:this.y})
        
    }}
    
    kingCheckingMoves= []
    //left
    checkedSquares = 1;

    px = this.x - size * 2;
    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (
          (indexOfSquare === -1 && indexOfOwn === -1) ||
          indexOfSquare !== -1
        ) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        }
      }
      
      
      if (checkedSquares === 2) {
        break;
      }
      checkedSquares++;
      py = this.y + size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        
          
        allPossibleMovesBlackWhenChecked.push({x:this.x,y:this.y})
        
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        
          
        allPossibleMovesWhiteWhenChecked.push({x:this.x,y:this.y})
        
    }}
    
    kingCheckingMoves= []
    this.legalMoves = moves;
    piecesGuardedByPiece.forEach(piece=>{
      piecesDefended.push(piece)
    })
    if(gettingKingCheckedStatus){
      allPossibleMovesToConsiderForChecking=moves
    }
    if (checkingCastling) {
      allPossibleMovesToConsiderForCastling = moves;
    } else {
      possibleMoves = moves;
    }
  }

  getRookMoves() {
    let moves = [];
    let kingCheckingMoves=[]
    let piecesGuardedByPiece=[]
    let px = this.x;
    let py = this.y;
    let inside = true;

    let color = this.color;
    //top
    let size = this.size;

    moves.push({ x: px, y: py });

    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        
      if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      py -= size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //right

    px = this.x + size;
    py = this.y;
    while (true) {
      inside = this.FindPoint(
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
        
      if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }
        if(indexOfOwn !== -1){
          piecesGuardedByPiece.push(pieces[indexOfOwn])
        }
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //bottom

    px = this.x;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        
      if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      py += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //left

    px = this.x - size;
    py = this.y;
    while (true) {
      inside = this.FindPoint(
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
        
      if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }
        if(indexOfOwn !== -1){
          piecesGuardedByPiece.push(pieces[indexOfOwn])
        }
        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    this.legalMoves = moves;
    piecesGuardedByPiece.forEach(piece=>{
      piecesDefended.push(piece)
    })
    if(gettingKingCheckedStatus){
      allPossibleMovesToConsiderForChecking=moves
    }
    if (checkingCastling) {
      allPossibleMovesToConsiderForCastling = moves;
    } else {
      possibleMoves = moves;

      
    }
  }

  getBishopMoves() {
    let moves = [];
    let kingCheckingMoves=[]
    let piecesGuardedByPiece=[]
    let px = this.x;
    let py = this.y;
    let inside = true;

    let color = this.color;
    //top
    let size = this.size;

    moves.push({ x: px, y: py });

    px = this.x + size;
    py = this.y - size;

    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }

      px += size;
      py -= size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //right

    px = this.x + size;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
      py += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //bottom

    px = this.x - size;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //left

    px = this.x - size;
    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py -= size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    this.legalMoves = moves;
    piecesGuardedByPiece.forEach(piece=>{
      piecesDefended.push(piece)
    })
    if(gettingKingCheckedStatus){
      allPossibleMovesToConsiderForChecking=moves
    }
    if (checkingCastling) {
      allPossibleMovesToConsiderForCastling = moves;
    } else {
      possibleMoves = moves;
      
    }
  }
  getQueenMoves() {
    let moves = [];
    let kingCheckingMoves=[]
    let piecesGuardedByPiece=[]
    let px = this.x;
    let py = this.y;
    let inside = true;

    let color = this.color;
    //top
    let size = this.size;

    moves.push({ x: px, y: py });

    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      py -= size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //right

    px = this.x + size;
    py = this.y;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //bottom

    px = this.x;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      py += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //left

    px = this.x - size;
    py = this.y;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
    }

    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //diagonal
    px = this.x + size;
    py = this.y - size;

    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }

      px += size;
      py -= size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //right

    px = this.x + size;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px += size;
      py += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //bottom

    px = this.x - size;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py += size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //left

    px = this.x - size;
    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
        } else {
          break;
        }
      } else {
        break;
      }
      px -= size;
      py -= size;
    }
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    this.legalMoves = moves;
    piecesGuardedByPiece.forEach(piece=>{
      piecesDefended.push(piece)
    })
    if(gettingKingCheckedStatus){
      allPossibleMovesToConsiderForChecking=moves
    }
    if (checkingCastling) {
      allPossibleMovesToConsiderForCastling = moves;
    } else {
      possibleMoves = moves;
      
    }
  }

  getKingMoves() {
    let moves = [];
    let kingCheckingMoves=[]
    let piecesGuardedByPiece=[]
    let px = this.x;
    let py = this.y;
    let inside = true;
    let checkedSquares = 1;
    let color = this.color;
    //top
    let size = this.size;

    moves.push({ x: px, y: py });

    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //right

    checkedSquares = 1;
    px = this.x + size;
    py = this.y;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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

    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //bottom
    checkedSquares = 1;

    px = this.x;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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
    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //left

    checkedSquares = 1;

    px = this.x - size;
    py = this.y;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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

    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //top-right
    checkedSquares = 1;
    px = this.x + size;
    py = this.y - size;

    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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

    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //right-btm

    checkedSquares = 1;
    px = this.x + size;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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

    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //bottom-left
    checkedSquares = 1;

    px = this.x - size;
    py = this.y + size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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

    if(color==="white"){ function checkForBlackKingSquare(item) {
      return item.x === blackKing.x && item.y === blackKing.y;
    }

    let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)

    if(blackKingChecked && indexOfBlackKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesBlackWhenChecked.push(move)
        })
    }}
    if(color === "black"){function checkForWhiteKingSquare(item) {
      return item.x === whiteKing.x && item.y === whiteKing.y;
    }

    let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)

    if(whiteKingChecked && indexOfWhiteKing  !== -1){
       
        kingCheckingMoves.forEach(move=>{
          
        allPossibleMovesWhiteWhenChecked.push(move)
        })
    }}
    
    kingCheckingMoves= []
    //left-top
    checkedSquares = 1;

    px = this.x - size;
    py = this.y - size;
    while (true) {
      inside = this.FindPoint(
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
        if(indexOfOwn !== -1){
        piecesGuardedByPiece.push(pieces[indexOfOwn])
      }

        if (indexOfSquare === -1 && indexOfOwn === -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
        } else if (indexOfSquare !== -1) {
          moves.push({ x: px, y: py });
          if(blackKingChecked || whiteKingChecked){
              kingCheckingMoves.push({x: px, y: py})
            }
          break;
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

    if(gettingKingCheckedStatus){
      allPossibleMovesToConsiderForChecking=moves
    }
    if (checkingCastling) {
      allPossibleMovesToConsiderForCastling = moves;
    } else {
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
      if(color==="white"){ function checkForBlackKingSquare(item) {
        return item.x === blackKing.x && item.y === blackKing.y;
      }
  
      let indexOfBlackKing = kingCheckingMoves.findIndex(checkForBlackKingSquare)
  
      if(blackKingChecked && indexOfBlackKing  !== -1){
         
          kingCheckingMoves.forEach(move=>{
            
          allPossibleMovesBlackWhenChecked.push(move)
          })
      }}
      if(color === "black"){function checkForWhiteKingSquare(item) {
        return item.x === whiteKing.x && item.y === whiteKing.y;
      }
  
      let indexOfWhiteKing = kingCheckingMoves.findIndex(checkForWhiteKingSquare)
  
      if(whiteKingChecked && indexOfWhiteKing  !== -1){
         
          kingCheckingMoves.forEach(move=>{
            
          allPossibleMovesWhiteWhenChecked.push(move)
          })
      }}
      
      kingCheckingMoves= []
      piecesGuardedByPiece.forEach(piece=>{
        piecesDefended.push(piece)
      })
      this.legalMoves = moves;
      possibleMoves = moves;
    }
  }
}
function FindPoint(x1, y1, x2, y2, x, y) {
  if (x >= x1 && x < x2 && y >= y1 && y < y2) return true;

  return false;
}
function preload() {
  white_king_img = loadImage(
    "http://localhost:3001/assets/sprites/tile000.png"
  );

  white_queen_img = loadImage(
    "http://localhost:3001/assets/sprites/tile001.png"
  );

  white_bishop_img = loadImage(
    "http://localhost:3001/assets/sprites/tile002.png"
  );

  white_knight_img = loadImage(
    "http://localhost:3001/assets/sprites/tile003.png"
  );

  white_rook_img = loadImage(
    "http://localhost:3001/assets/sprites/tile004.png"
  );

  white_pawn_img = loadImage(
    "http://localhost:3001/assets/sprites/tile005.png"
  );

  black_king_img = loadImage(
    "http://localhost:3001/assets/sprites/tile007.png"
  );

  black_queen_img = loadImage(
    "http://localhost:3001/assets/sprites/tile008.png"
  );

  black_bishop_img = loadImage(
    "http://localhost:3001/assets/sprites/tile009.png"
  );

  black_knight_img = loadImage(
    "http://localhost:3001/assets/sprites/tile010.png"
  );

  black_rook_img = loadImage(
    "http://localhost:3001/assets/sprites/tile011.png"
  );

  black_pawn_img = loadImage(
    "http://localhost:3001/assets/sprites/tile012.png"
  );
}

let startFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
let startFENCastle = "r3kbnr/2p1pp1p/p1nq2p1/1p1p1b2/P3P3/RPN2Q2/1BPP1PPP/4KBNR w q - 4 7";
let startFENSwap = "rnbqkb1r/pp1pp1Pp/7n/5p2/3P4/2p1Q3/PPP1PP1P/RNB1KBNR w KQkq - 0 1";
let FEN2 = "7k/3N2qp/b5r1/2p1Q1N1/Pp4PK/7P/1P3p2/6r1 w KQkq - 0 1";
function loadGame(fen_string) {
  let chess_pieces = {
    R: {
      color: "white",
      image: white_rook_img,
      name: "Rook",
    },
    N: {
      color: "white",
      image: white_knight_img,
      name: "Knight",
    },
    B: {
      color: "white",
      image: white_bishop_img,
      name: "Bishop",
    },
    Q: {
      color: "white",
      image: white_queen_img,
      name: "Queen",
    },
    K: {
      color: "white",
      image: white_king_img,
      name: "King",
    },
    P: {
      color: "white",
      image: white_pawn_img,
      name: "Pawn",
    },
    r: {
      color: "black",
      image: black_rook_img,
      name: "rook",
    },
    n: {
      color: "black",
      image: black_knight_img,
      name: "knight",
    },
    b: {
      color: "black",
      image: black_bishop_img,
      name: "bishop",
    },
    q: {
      color: "black",
      image: black_queen_img,
      name: "queen",
    },
    k: {
      color: "black",
      image: black_king_img,
      name: "king",
    },
    p: {
      color: "black",
      image: black_pawn_img,
      name: "pawn",
    },
  };

  let imgLength = boardLength / 8;

  let FEN = fen_string.split(" ");

  let blackFEN = "rnbqkp";
  let whiteFEN = "PRNBQK";
  let piece_positions = FEN[0].split("/");
  piece_positions.forEach((item, index) => {
    let y = index;

    let x = 0;
    let skip = 0;
    item.split("").forEach((value, index) => {
      let num = parseInt(value);
      if (!isNaN(num)) {
        skip += num;
        x += imgLength * skip;
      } else {
        x = 0;
        x += imgLength * skip;

        skip++;
      }
      if (whiteFEN.includes(value)) {
        function checkSquare(item) {
          return item.x === x && item.y === y * imgLength;
        }
        let indexOfSquare = squares.findIndex(checkSquare);
        
        pieces.push(
          new Piece(
            chess_pieces[value].name,
            chess_pieces[value].color,
            chess_pieces[value].image,

            x,
            y * imgLength,

            imgLength
          )
        );
        white_pieces.push(
          new Piece(
            chess_pieces[value].name,
            chess_pieces[value].color,
            chess_pieces[value].image,

            x,
            y * imgLength,

            imgLength
          )
        );
        if (indexOfSquare > -1) {
          squares[indexOfSquare].occupied = true;
        }
      }
      if (blackFEN.includes(value)) {
        function checkSquare(item) {
          return item.x === x && item.y === y * imgLength;
        }
        let indexOfSquare = squares.findIndex(checkSquare);
        
        pieces.push(
          new Piece(
            chess_pieces[value].name,
            chess_pieces[value].color,
            chess_pieces[value].image,

            x,
            y * imgLength,

            imgLength
          )
        );
        black_pieces.push(
          new Piece(
            chess_pieces[value].name,
            chess_pieces[value].color,
            chess_pieces[value].image,

            x,
            y * imgLength,

            imgLength
          )
        );
        if (indexOfSquare > -1) {
          squares[indexOfSquare].occupied = true;
        }
      }
    });
  });

  gameState = new Game(false,"jay","ndalamei")
}
function drawSquare(color, x, y, size) {
  fill(color);
  square(x, y, size);
}
function drawPiece(img, position, size) {
  image(img, position.x, position.y, size, size);
}
function drawBoard() {
  let width = boardLength / 8;
  let name;
  let rankNo;
  let fileNo;
  let rankName;
  let fileName;
  name = rankName + fileName;
  function getFileName(column) {
    let fileName = "";
    switch (column) {
      case 1:
        fileName = "a";
        break;
      case 2:
        fileName = "b";
        break;
      case 3:
        fileName = "c";
        break;
      case 4:
        fileName = "d";
        break;
      case 5:
        fileName = "e";
        break;
      case 6:
        fileName = "f";
        break;
      case 7:
        fileName = "g";
        break;
      case 8:
        fileName = "h";
        break;
    }
    return fileName;
  }
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      let isLightSquare = (file + rank) % 2 !== 0;
      var squareColor = isLightSquare ? darkColor : lightColor;

      var squareType = isLightSquare ? 0 : 1;
      var y = rank * width;
      var x = file * width;
      rankNo = 8 - rank;
      fileNo = file + 1;
      rankName = rankNo.toString();
      fileName = getFileName(fileNo);
      name = fileName + rankName;
      squares.push(
        new Square(x, y, boardLength / 8, false, squareColor, squareType, name)
      );
    }
    height += 8;
  }
}

function setup() {
    
  let board = createCanvas(boardLength, boardLength);

  board.style("display", "block");

  board.style("margin", "auto");

  drawBoard();
  loadGame(startFEN);
  loadSquaresToCheck();
  
  
  colorMap = [
    // Left fingertips
    [color(0, 0, 0), color(255, 0, 255), color(0, 0, 255), color(255, 255, 255)],
    // Right fingertips
    [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)]
  ]
  
  handsfree = new Handsfree({
    hands: true,
    maxNumHands: 2
  })
  handsfree.enablePlugins('browser')
  
  handsfree.plugin.pinchScroll.disable()
  setInterval(()=>{
    if(!gameState.over){
      
    generateFEN()
    if (
      selectedPiece &&
      prevSelectedPiece !== selectedPiece &&
      selectedPiece.color.startsWith(activeColor) 
    ) {
      selectedPiece.getPossibleMoves();
    }
    }
  },3000)
}

function drawHands () {
    const hands = handsfree.data?.hands
    
    if (!hands?.landmarks) return
    
    hands.landmarks.forEach((hand, handIndex) => {
      hand.forEach((landmark, landmarkIndex) => {
        if (colorMap[handIndex]) {
          switch (landmarkIndex) {
            case 8: fill(colorMap[handIndex][0]); break
            case 12: fill(colorMap[handIndex][1]); break
            case 16: fill(colorMap[handIndex][2]); break
            case 20: fill(colorMap[handIndex][3]); break
            default:
              fill(color(255, 255, 255))
          }                
        }
        
      let x = landmark.x
      let y = landmark.y
        // Set stroke
          let px = map(x, 0, 1, width, 0);
          let py = map(y, 0, 1, 0, height);
        if (handIndex === 1 && landmarkIndex === 8) {
          stroke(color(0, 255, 0))
          strokeWeight(5)
          circleSize = 10
          
          circle(
            // Flip horizontally
            px,
            py,
            circleSize
          )
        } 
        
        
      })
    })
  }
function fingerClick () {
    // Canvas bounds to make drawing easier
    // Since the canvas is inside an Iframe, we reach out and get it's containing iframe's bounding rect
    let bounds = document.querySelector('canvas').getClientRects()[0]
    // Check for pinches and create dots if something is pinched
    const hands = handsfree.data?.hands
  
    // Paint with fingers
    if (hands?.pinchState) {
      // Loop through each hand
      let state =hands.pinchState[1][0]
    
  
      let x = hands.origPinch[1][0].x
      let y = hands.origPinch[1][0].y
      
            // Start line on the spot that we pinched
           
              if (state === 'start') {
  
                
                  // Add a line to the paint array
                  } 
                  else if (state === 'released') {
                    console.log("released",{x,y})
                    
                
                    let px = map(x, 0, 1, width, 0);
                    let py = map(y, 0, 1, 0, height);
                    
                    console.log("released",{px,py})
                              movePiece(px,py)
                }
           
          
          
    } 
    
    // Clear everything if the left [0] pinky [3] is pinched
    if (hands?.pinchState && hands.pinchState[0][3] === 'released') {
      
      console.log("undo")
    }
    
  }
  
  
function draw() {
    fingerClick()
  for (let s of squares) {
    if (s.type === 1) {
      s.changeColor(lightColor);
    } else {
      s.changeColor(darkColor);
    }
    s.show();
  }
  if (possibleMoves.length > 0 && !whiteKingChecked && !blackKingChecked) {
    for (let i = 0; i < possibleMoves.length; i++) {
      function checkSquare(item) {
        return item.x === possibleMoves[i].x && item.y === possibleMoves[i].y;
      }
      let indexOfSquare = pieces.findIndex(checkSquare);
      if (indexOfSquare > -1) {
        if (i === 0) {
          drawSquare(
            "rgba(238, 100, 100, 0.5)",
            possibleMoves[i].x,
            possibleMoves[i].y,
            boardLength / 8
          );
        } else {
          drawSquare(
            "rgba(255,0,0,0.9)",
            possibleMoves[i].x,
            possibleMoves[i].y,
            boardLength / 8
          );
        }
      } else {
        drawSquare(
          "rgba(238, 135, 51, 0.5)",
          possibleMoves[i].x,
          possibleMoves[i].y,
          boardLength / 8
        );
      }
    }
  }
  else{
    if(whiteKingChecked || blackKingChecked){

      if(whiteKingChecked && activeColor.startsWith("w") && allPossibleMovesWhiteWhenChecked.length > 0){
        for (let i = 0; i < allPossibleMovesWhiteWhenChecked.length; i++) {
          function checkSquare(item) {
            return item.x === allPossibleMovesWhiteWhenChecked[i].x && item.y === allPossibleMovesWhiteWhenChecked[i].y;
          }
          let indexOfSquare = pieces.findIndex(checkSquare);
          if (indexOfSquare > -1) {
            if (i === 0) {
              drawSquare(
                "maroon",
                allPossibleMovesWhiteWhenChecked[i].x,
                allPossibleMovesWhiteWhenChecked[i].y,
                boardLength / 8
              );
            } else {
              drawSquare(
                "rgba(255,0,0,0.9)",
                allPossibleMovesWhiteWhenChecked[i].x,
                allPossibleMovesWhiteWhenChecked[i].y,
                boardLength / 8
              );
            }
          } else {
            drawSquare(
              "rgba(238, 135, 51, 0.5)",
              allPossibleMovesWhiteWhenChecked[i].x,
              allPossibleMovesWhiteWhenChecked[i].y,
              boardLength / 8
            );
          }
        }
    
      }
      else if(blackKingChecked && activeColor.startsWith("b") && allPossibleMovesBlackWhenChecked.length > 0){
        for (let i = 0; i < allPossibleMovesBlackWhenChecked.length; i++) {
          function checkSquare(item) {
            return item.x === allPossibleMovesBlackWhenChecked[i].x && item.y === allPossibleMovesBlackWhenChecked[i].y;
          }
          let indexOfSquare = pieces.findIndex(checkSquare);
          if (indexOfSquare > -1) {
            if (i === 0) {
              drawSquare(
                "maroon",
                allPossibleMovesBlackWhenChecked[i].x,
                allPossibleMovesBlackWhenChecked[i].y,
                boardLength / 8
              );
            } else {
              drawSquare(
                "rgba(255,0,0,0.9)",
                allPossibleMovesBlackWhenChecked[i].x,
                allPossibleMovesBlackWhenChecked[i].y,
                boardLength / 8
              );
            }
          } else {
            drawSquare(
              "rgba(238, 135, 51, 0.5)",
              allPossibleMovesBlackWhenChecked[i].x,
              allPossibleMovesBlackWhenChecked[i].y,
              boardLength / 8
            );
          }
        }
    
      }
    }
  }

  for (let p of pieces) {
    p.show();
  }
  if(gameState.over){
    
    endGame()
  
  }
  
  drawHands()
  if (
    selectedPiece &&
    prevSelectedPiece !== selectedPiece &&
    selectedPiece.color.startsWith(activeColor) 
  ) {
    noFill();
    strokeWeight(2);
    stroke('rgba(0,255,0,0.25)');
    square(selectedPiece.x,selectedPiece.y,selectedPiece.size)
  }
}
function setMoveType(prevSelectedPiece, pieceX, pieceY) {
  let name = prevSelectedPiece.name.toLowerCase();
  switch (name) {
    case "pawn":
      if (!prevSelectedPiece.moved && prevSelectedPiece.color === "white") {
        if (
          !prevSelectedPiece.moved &&
          pieceX === prevSelectedPiece.x &&
          pieceY === prevSelectedPiece.y - prevSelectedPiece.size * 2
        ) {
          prevSelectedPiece.prevMoveType = "en passant";
          for (s of squares) {
            if (
              s.x === pieceX &&
              s.y === prevSelectedPiece.y - prevSelectedPiece.size
            ) {
              possibleEnPassantTarget = s.name;
            }
          }
        } else {
          prevSelectedPiece.prevMoveType = "normal";
          possibleEnPassantTarget = "-";
        }
      }
      if (!prevSelectedPiece.moved && prevSelectedPiece.color === "black") {
        if (
          !prevSelectedPiece.moved &&
          pieceX === prevSelectedPiece.x &&
          pieceY === prevSelectedPiece.y + prevSelectedPiece.size * 2
        ) {
          prevSelectedPiece.prevMoveType = "en passant";
          for (s of squares) {
            if (
              s.x === pieceX &&
              s.y === prevSelectedPiece.y + prevSelectedPiece.size
            ) {
              possibleEnPassantTarget = s.name;
            }
          }
        } else {
          prevSelectedPiece.prevMoveType = "normal";
          possibleEnPassantTarget = "-";
        }
      }
      if (prevSelectedPiece.moved) {
        prevSelectedPiece.prevMoveType = "normal";
        possibleEnPassantTarget = "-";
      }
      break;

    default:
      prevSelectedPiece.prevMoveType = "normal";
      possibleEnPassantTarget = "-";
      break;
  }
}
function isEnPassantValid(prevSelectedPiece, pieceX, pieceY) {
  let name = prevSelectedPiece.name.toLowerCase();
  if (name === "pawn") {
    if (prevSelectedPiece.color === "white") {
      let color = prevSelectedPiece.color;
      let size = prevSelectedPiece.size;
      function checkSquarePiece(item) {
        return (
          item.x === pieceX &&
          item.y - size === pieceY &&
          item.color !== color &&
          item.prevMoveType === "en passant"
        );
      }

      let indexOfSquare = pieces.findIndex(checkSquarePiece);
      if (indexOfSquare !== -1) {
        for (let s of squares) {
          if (
            s.x === pieces[indexOfSquare].x &&
            s.y === pieces[indexOfSquare].y
          ) {
            s.occupied = false;
          }
        }
        if (prevSelectedPiece !== pieces[indexOfSquare]) {
          function checkPiece(item) {
            return (
              item.x === pieces[indexOfSquare].x &&
              item.y - size === pieces[indexOfSquare].y
            );
          }
          
      let indexOfRemovedPiece = pieces.findIndex(checkPiece);
          pieces.splice(indexOfSquare, 1);

          
            setTimeout(() => {
              
            removedPieces.push(black_pieces[indexOfRemovedPiece]);
            halfMoveClock = 0;

            possibleMoves = [];
            selectedBox.occupied = true;
                console.log("en ph")
            }, 1000);
        } else {
          console.log("equal");
        }
        return true;
      }
    } else {
      let color = prevSelectedPiece.color;
      let size = prevSelectedPiece.size;
      function checkSquarePiece(item) {
        return (
          item.x === pieceX &&
          item.y + size === pieceY &&
          item.color !== color &&
          item.prevMoveType === "en passant"
        );
      }
      let indexOfSquare = pieces.findIndex(checkSquarePiece);
      if (indexOfSquare !== -1) {
        for (let s of squares) {
          if (
            s.x === pieces[indexOfSquare].x &&
            s.y === pieces[indexOfSquare].y
          ) {
            s.occupied = false;
          }
        }
        if (prevSelectedPiece !== pieces[indexOfSquare]) {
          

          function checkPiece(item) {
            return (
              item.x === pieces[indexOfSquare].x &&
              item.y - size === pieces[indexOfSquare].y
            );
          }
          
      let indexOfRemovedPiece = pieces.findIndex(checkPiece);
          pieces.splice(indexOfSquare, 1);

          
            setTimeout(() => {
              
            removedPieces.push(white_pieces[indexOfRemovedPiece]);
            
          halfMoveClock = 0;

          possibleMoves = [];
          console.log("en ph");
          selectedBox.occupied = true;
            }, 1000);
        } else {
          console.log("equal");
        }
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}
function loadSquaresToCheck() {
  let squaresToCheckQueenSideWhiteNames = ["a1", "b1", "c1", "d1", "e1"];

  let squaresToCheckKingSideWhiteNames = ["e1", "f1", "g1", "h1"];

  let squaresToCheckQueenSideBlackNames = ["a8", "b8", "c8", "d8", "e8"];

  let squaresToCheckKingSideBlackNames = ["e8", "f8", "g8", "h8"];
  let whiteKingName = "King";
  let blackKingName = "king";

  //load kings
  for (let p of pieces) {
    if (p.name === whiteKingName) {
      whiteKing = p;
    }
    if (p.name === blackKingName) {
      blackKing = p;
    }
  }

  //load squares to check
  for (let squaresToCheck of squaresToCheckQueenSideWhiteNames) {
    for (let s of squares) {
      if (s.name === squaresToCheck) {
        squaresToCheckQueenSideWhite.push(s);
      }
    }
  }

  for (let squaresToCheck of squaresToCheckKingSideWhiteNames) {
    for (let s of squares) {
      if (s.name === squaresToCheck) {
        squaresToCheckKingSideWhite.push(s);
      }
    }
  }
  for (let squaresToCheck of squaresToCheckQueenSideBlackNames) {
    for (let s of squares) {
      if (s.name === squaresToCheck) {
        squaresToCheckQueenSideBlack.push(s);
      }
    }
  }

  for (let squaresToCheck of squaresToCheckKingSideBlackNames) {
    for (let s of squares) {
      if (s.name === squaresToCheck) {
        squaresToCheckKingSideBlack.push(s);
      }
    }
  }
}

function checkStaleMate(){

  if(!whiteKingChecked){
      
  let whiteMoves=0
  
  for(let p of pieces){
    
    if(p.color === "white" && p.name.toLowerCase() !== "king"){
      let movesTocheck =p.legalMoves.slice(1)
      movesTocheck.forEach(move=>{
       
          whiteMoves ++
      })
    }
  }
  whiteKing.legalMoves.forEach(move=>{
   
      whiteMoves ++
  })

  if(whiteMoves === 0){
    
    gameState.over = true
    gameState.message=`draw! ${gameState.players["white"]} hit stalemate `
  }
  }

  
  if(!blackKingChecked){
      
    let blackMoves=0
    
    for(let p of pieces){
      
      if(p.color === "black" && p.name.toLowerCase() !== "king"){
  
        let movesTocheck =p.legalMoves.slice(1)
        movesTocheck.forEach(move=>{
         
            blackMoves ++
        })
      }
    }
    blackKing.legalMoves.forEach(move=>{
     
        blackMoves ++
    })
  
    if(blackMoves === 0){
      
      gameState.over = true
      gameState.message=`draw! ${gameState.players["black"]} hit stalemate `
    }
    }

}
function checkFiftyMoveRule(){
  
  if(halfMoveClock === 100){
      gameState.over = true
      gameState.message=`draw! ${gameState.players["white"]} by 50 move rule `
    
  }
}
function requestDraw(){
 console.log("give a draw?")
 gameState.drawRequested = true
 var message =document.getElementById("draw-req-message")
 message.innerText="Oponent requested a draw. Aceept Draw?"
 var dialog  = $( "#dialog-confirm-draw" ).dialog({
   resizable: false,
   height: "auto",
   width: 400,
   modal: true,
   open:function () { $(".ui-dialog-titlebar-close").hide()},
   closeOnEscape: false,
   buttons: {
     "Accept": function() {
       acceptDraw()
       $( this ).dialog( "close" );
     },
     Cancel: function() {
       denyDraw()
       $( this ).dialog( "close" );
     }
   }
 });
}
function endGame(){
  var message =document.getElementById("game-over-message")
  message.innerText=`${gameState.message}`
  var dialog  = $( "#dialog-game-over" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    open:function () { $(".ui-dialog-titlebar-close").hide()},
    closeOnEscape: false
    
  });
 }
 function requestPieceSwap(piece){
   
  dialogOpen=true
  var message =document.getElementById("swap-piece-message")
  message.innerText=`${gameState.message}`
  var dialog  = $( "#dialog-swap-piece" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    open:function () { $(".ui-dialog-titlebar-close").hide()},
    closeText: "hide",
    closeOnEscape: false
    
  });
  console.log(piece)
  pieceToSwap=piece
 }
 function swapOutPiece(newPiece){
  let chess_pieces = {
    R: {
      color: "white",
      image: white_rook_img,
      name: "Rook",
    },
    N: {
      color: "white",
      image: white_knight_img,
      name: "Knight",
    },
    B: {
      color: "white",
      image: white_bishop_img,
      name: "Bishop",
    },
    Q: {
      color: "white",
      image: white_queen_img,
      name: "Queen",
    },
    K: {
      color: "white",
      image: white_king_img,
      name: "King",
    },
    P: {
      color: "white",
      image: white_pawn_img,
      name: "Pawn",
    },
    r: {
      color: "black",
      image: black_rook_img,
      name: "rook",
    },
  
    n: {
      color: "black",
      image: black_knight_img,
      name: "knight",
    },
    b: {
      color: "black",
      image: black_bishop_img,
      name: "bishop",
    },
    q: {
      color: "black",
      image: black_queen_img,
      name: "queen",
    },
    k: {
      color: "black",
      image: black_king_img,
      name: "king",
    },
    p: {
      color: "black",
      image: black_pawn_img,
      name: "pawn",
    },
  };
  
   if(pieceToSwap){
     let name=newPiece
     let imageKey
    if(pieceToSwap.color === "white"){
      name=name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      if(name ==="Knight"){
        imageKey ="N"
      }else{
        imageKey =name.charAt(0)
      }
    }
    if(pieceToSwap.color === "black"){
      name=name.toLowerCase()
      if(name ==="knight"){
        imageKey ="n"
      }else{
        imageKey =name.charAt(0)
      }
    }
    
    let image = chess_pieces[imageKey].image
     pieceToSwap.swapPiece(newPiece,image)
     pieceToSwap=null;
     var dialog  = $( "#dialog-swap-piece" )
     dialog.dialog("close");
     
  dialogOpen=false
   }
 }
function quitGame(){
  dialogOpen=true
  console.log("quit?")
  var message =document.getElementById("game-quit-message")
  message.innerText="Are you sure you want to quit game?"
  var dialog  = $( "#dialog-game-quit" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    open:function () { $(".ui-dialog-titlebar-close").hide()},
    closeOnEscape: false,
    buttons: {
      "Quit": function() {
        gameState.over=true
        window.location.replace(window.location.origin)
        
        $( this ).dialog( "close" );
        dialogOpen=false
      },
      Cancel: function() {
        $( this ).dialog( "close" );
        dialogOpen=false
      }
    }
  });
 }

 function restartGame(){
  dialogOpen=true
  var message =document.getElementById("game-restart-message")
  message.innerText="Are you sure you want to restart game?"
  var dialog  = $( "#dialog-game-restart" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    open:function () { $(".ui-dialog-titlebar-close").hide()},
    closeOnEscape: false,
    buttons: {
      "Restart": function() {
        resetGame()
        $( this ).dialog( "close" );
        dialogOpen=false
      },
      Cancel: function() {
        $( this ).dialog( "close" );
        dialogOpen=false
      }
    }
  });
 }

function acceptDraw(){
  gameState.drawRequested=false
  gameState.over = true
  gameState.message=`draw! ${gameState.players["white"]} by mutual agreement `

}
function denyDraw(){
  gameState.drawRequested = false

}
function checkThreeFoldRepetition(newFEN){
  let count=0
  for(let FEN of threefold_repetition){
    if(newFEN === FEN){
      count ++
    }
  }
  if(count === 2){
    gameState.over= true
    gameState.message=`draw! by threefold repetition `
  }else{

    let current ;
    let next ;
    for(let i = 0;i < threefold_repetition.length;i++){
      
      if(i === 0){
         current = newFEN
       next =threefold_repetition[i]
        
      }
      else if(i < threefold_repetition.length - 1){
         current = next
         next = threefold_repetition[i]
      }
      else{
        
        current = next
      }
      threefold_repetition[i]= current
    }
  }

}
function openCheck(){
  getPiecesAroundKings(whiteKing.x,whiteKing.y,whiteKing.color,whiteKing.size)
  
  getPiecesAroundKings(blackKing.x,blackKing.y,blackKing.color,blackKing.size)
  
  getPiecesProtectingKings()
}

function getPiecesAroundKings(x,y,color,size){

  
  if(color ==="white"){
    pieces_around_white_king=[]
    opponent_pieces_around_white_king=[]
  }
  if(color==="black"){
    pieces_around_black_king=[]
    opponent_pieces_around_black_king=[]
  }
  
    let px = x;
    let py = y;
    let inside = true;
    //top
    let foundOwn = false
  let opponent_pieces =[]
    py = y - size;
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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="rook" )) {
          if(indexOfOwn === -1 ){

            opponent_pieces.push(pieces[indexOfSquare])
          }
          
          

          break;
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
        }
      } else {
        break;
      }
      py -= size;
    }
   
    
    foundOwn = false
    //right

    px = x + size;
    py = y;
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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="rook")) {
          if(indexOfOwn === -1 ){
            
            opponent_pieces.push(pieces[indexOfSquare])
          }
          

          break;
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
        }
      } else {
        break;
      }
      px += size;
    }
   
    
    foundOwn = false
    //bottom

    px = x;
    py = y + size;
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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="rook")) {
          if(indexOfOwn === -1 ){
            
            opponent_pieces.push(pieces[indexOfSquare])
          }
          

          break;
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
        }
      } else {
        break;
      }
      py += size;
    }
   
    
    foundOwn = false
    //left

    px = x - size;
    py = y;
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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="rook")) {
          if(indexOfOwn === -1 ){
            
            opponent_pieces.push(pieces[indexOfSquare])
          }
          
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
        }
      } else {
        break;
      }
      px -= size;
    }

   
    
    foundOwn = false
    //diagonal
    px = x + size;
    py = y - size;

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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="bishop")) {
          if(indexOfOwn === -1 ){
            
            opponent_pieces.push(pieces[indexOfSquare])
          }
          
          break;
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
        }
      } else {
        break;
      }

      px += size;
      py -= size;
    }
   
    
    foundOwn = false
    //right

    px = x + size;
    py = y + size;
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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="bishop")) {
           if(indexOfOwn === -1 ){
            
            opponent_pieces.push(pieces[indexOfSquare])
          }
          
          break
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
        }
      } else {
        break;
      }
      px += size;
      py += size;
    }
   
    
    foundOwn = false
    //bottom

    px = x - size;
    py = y + size;
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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="bishop")) {
           if(indexOfOwn === -1 ){
            
            opponent_pieces.push(pieces[indexOfSquare])
          }
          
          break
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
          
        }
      } else {
        break;
      }
      px -= size;
      py += size;
    }
   
    
    foundOwn = false
    //left

    px = x - size;
    py = y - size;
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

        if (indexOfSquare !== -1 && (pieces[indexOfSquare].name.toLowerCase() ==="queen" || pieces[indexOfSquare].name.toLowerCase() ==="bishop")) {
           if(indexOfOwn === -1 ){
            
            opponent_pieces.push(pieces[indexOfSquare])
          }
          
          break
        } else {
          
            if(!foundOwn){
              if(indexOfOwn > -1 && color === "white"){
            pieces_around_white_king.push(pieces[indexOfOwn])
          foundOwn = true
          }
          if(indexOfOwn > -1 && color === "black"){
            
            pieces_around_black_king.push(pieces[indexOfOwn])
          
          foundOwn = true}

            }
          
          
        }
      } else {
        break;
      }
      px -= size;
      py -= size;
    }
   
   if(color ==="white"){
    opponent_pieces_around_white_king=opponent_pieces
    console.log("around WHITEKING",pieces_around_white_king)
  }
  if(color==="black"){
    opponent_pieces_around_black_king=opponent_pieces
    console.log("around BlackKING",pieces_around_black_king)
  }
}


function getPiecesProtectingKings(){
  pieces_protecting_white_king=[]
  pieces_protecting_black_king=[]
 
  opponent_pieces_around_white_king.forEach(p=>{
    
    if(p.color ==="black" ){
      p.legalMoves.forEach(move=>{
        function checkForPiece(item) {
          return item.x === move.x && item.y === move.y;
        }
        
        let indexOfPiece  = pieces_around_white_king.findIndex(checkForPiece)

        if(indexOfPiece !== -1){
          pieces_protecting_white_king.push(pieces_around_white_king[indexOfPiece])
        }
      })
    }

  })

  opponent_pieces_around_black_king.forEach(p=>{
   
    if(p.color ==="white" ){
      p.legalMoves.forEach(move=>{
        function checkForPiece(item) {
          return item.x === move.x && item.y === move.y;
        }
        
        let indexOfPiece  = pieces_around_black_king.findIndex(checkForPiece)

        if(indexOfPiece !== -1){
          pieces_protecting_black_king.push(pieces_around_black_king[indexOfPiece])
        }
      })
    }
  })
}
function getKingStatus() {
  gettingKingCheckedStatus = true;
  
  allPossibleMovesToConsiderForChecking = [];
  allPossibleMovesBlack = [];
  allPossibleMovesWhite = [];
  let collectsWhite=[]
  let collectsBlack=[]
  
  piecesDefended=[]
  for (let p of pieces) {
    allPossibleMovesToConsiderForChecking = [];
    if (p.color === "black") {
      p.getPossibleMoves();
      
      isCheckingKing= false
      if (allPossibleMovesToConsiderForChecking.length > 0) {
        allPossibleMovesToConsiderForChecking.forEach((move) => {
          if(move.x === whiteKing.x && move.y === whiteKing.y){
            
            isCheckingKing= true
            collectsWhite.push(p)
            console.log("AAAAAAAAAAAAAAAA",p)
          }
          allPossibleMovesBlack.push(move);
        });
      }

      if(!isCheckingKing){
        
        function checkForPiece(item) {
          return item.x === p.x && item.y === p.y;
        }
        let indexOfPiece = pieces_checking_white_king.findIndex(checkForPiece);
        pieces_checking_white_king.splice(indexOfPiece,1)
      }
    }

  

    if (p.color === "white") {
      
    allPossibleMovesToConsiderForChecking = [];
      p.getPossibleMoves();
      let isCheckingKing= false
      if (allPossibleMovesToConsiderForChecking.length > 0) {
        allPossibleMovesToConsiderForChecking.forEach((move) => {
          if(move.x === blackKing.x && move.y === blackKing.y){
            
            isCheckingKing= true
            collectsBlack.push(p)
            
            console.log("AAAAAAAAAAAAAAAA",p)
          }
          allPossibleMovesWhite.push(move);
        });
      }
      if(!isCheckingKing){
        
        function checkForPiece(item) {
          return item.x === p.x && item.y === p.y;
        }
        let indexOfPiece = pieces_checking_black_king.findIndex(checkForPiece);
        pieces_checking_black_king.splice(indexOfPiece,1)
      }
    }
  }
collectsWhite.forEach(item=>{
  pieces_checking_white_king.push(item)
})
  
  collectsBlack.forEach(item=>{
    pieces_checking_black_king.push(item)
  })
    
  function checkForWhiteKingSquare(item) {
    return item.x === whiteKing.x && item.y === whiteKing.y;
  }
  function checkForBlackKingSquare(item) {
    return item.x === blackKing.x && item.y === blackKing.y;
  }
  
  let indexOfWhiteKing = allPossibleMovesBlack.findIndex(checkForWhiteKingSquare);
  let indexOfBlackKing = allPossibleMovesWhite.findIndex(checkForBlackKingSquare);
  
  if(indexOfWhiteKing !== -1){

    whiteKingChecked = true
    console.log("WHITE CHECKED!!!!!!!!!!!!!!1")
  }
  else{
    whiteKingChecked=false
  }
  if(indexOfBlackKing !== -1){

    blackKingChecked = true
    console.log("BLACK CHECKED!!!!!!!!!!!!!!1")
  }
  else{
    blackKingChecked=false
  }

  console.log("allPiecesCheckingKings!!!!!!!!!!!!!!!!!!!!!!!")
  console.log(pieces_checking_white_king)
  
console.log(pieces_checking_black_king)
  allPossibleMovesToConsiderForChecking = [];
  allPossibleMovesBlack = [];
  allPossibleMovesWhite = [];

  gettingKingCheckedStatus = false;
}

function getMovesWhenChecked(){

  allPossibleMovesWhiteWhenChecked=[]
  allPossibleMovesBlackWhenChecked=[]
  
  piecesDefended=[]
  
  for(let p of pieces_checking_white_king){

    allPossibleMovesWhiteWhenChecked.push({x:p.x,y:p.y})
    p.getPossibleMoves()
    getPossibleMovesOfPiece(p)

  }

 if(pieces_checking_white_king.length > 0){
  let movesToCheckWhiteKing = whiteKing.legalMoves.slice(1)
  movesToCheckWhiteKing.forEach(move=>{
    function checkForForbiddenSquare(item) {
      return item.x === move.x && item.y === move.y;
    }
    let forbidden = forbiddenWhiteKingMoves.findIndex(checkForForbiddenSquare)
    if(forbidden === -1){
      
      allPossibleMovesWhiteWhenChecked.push(
        {x:move.x ,y:move.y}
      )
    }
    
  })
 }

  for(let p of pieces_checking_black_king){

    
    allPossibleMovesBlackWhenChecked.push({x:p.x,y:p.y})
    p.getPossibleMoves()
    
    getPossibleMovesOfPiece(p)

   
  }
  
 if(pieces_checking_black_king.length > 0){
  let movesToCheckBlackKing = blackKing.legalMoves.slice(1)
  movesToCheckBlackKing.forEach(move=>{
    function checkForForbiddenSquare(item) {
      return item.x === move.x && item.y === move.y;
    }
    let forbidden = forbiddenBlackKingMoves.findIndex(checkForForbiddenSquare)
    if(forbidden === -1){
      
    allPossibleMovesBlackWhenChecked.push(
      {x:move.x ,y:move.y}
    )
    }
  })
}
  console.log("allPossibleMovesWhenChecked!!!!!!!!!!!!!!!!!!!!!!!")
  console.log(allPossibleMovesWhiteWhenChecked)
    
  console.log(allPossibleMovesBlackWhenChecked)
}
function getGameStatus(){

  piecesDefended=[]
  if(blackKingChecked || whiteKingChecked){
      for(let p of pieces){
        if(p.name.toLowerCase() !== "king"){
            
        p.getPossibleMoves()
        }
      }
    if(whiteKingChecked){
      
      let whiteMoves=0
      for(let p of pieces){
        
        if(p.color === "white" && p.name.toLowerCase() !== "king"){
          let movesTocheck = p.legalMoves.slice(1)
          movesTocheck.forEach(move=>{
            function checkSquare(item) {
              return (
                item.x === move.x &&
                item.y === move.y
              );
            }

            let indexOfMove = allPossibleMovesWhiteWhenChecked.findIndex(checkSquare)

            if(indexOfMove !== -1){
              whiteMoves ++
            }


          })
        }
      }
      let whiteKingMoves = whiteKing.legalMoves.slice(1)
      whiteKingMoves.forEach(move=>{
        function checkSquare(item) {
          return (
            item.x === move.x &&
            item.y === move.y
          );
        }

        let indexOfMove = pieces_checking_white_king.findIndex(checkSquare)

        if(indexOfMove !== -1){
          whiteMoves ++
        }
      })

      if(whiteMoves === 0){
        
        gameState.over = true
        gameState.message=`check mate! ${gameState.players["black"]} wins`
        
      }
    }
    if(blackKingChecked){
        
      let blackMoves=0
      for(let p of pieces){
        
        if(p.color === "black" && p.name.toLowerCase() !== "king"){
          let movesTocheck = p.legalMoves.slice(1)
          movesTocheck.forEach(move=>{
            function checkSquare(item) {
              return (
                item.x === move.x &&
                item.y === move.y
              );
            }

            let indexOfMove = allPossibleMovesBlackWhenChecked.findIndex(checkSquare)

            if(indexOfMove !== -1){
              blackMoves ++
            }


          })
        }
      }
      let blackKingMoves = blackKing.legalMoves.slice(1)
      blackKingMoves.forEach(move=>{
        function checkSquare(item) {
          return (
            item.x === move.x &&
            item.y === move.y
          );
        }

        let indexOfMove = pieces_checking_black_king.findIndex(checkSquare)

        if(indexOfMove !== -1){
          blackMoves ++
        }
      })

      if(blackMoves === 0){
        
        gameState.over = true
        gameState.message=`check mate! ${gameState.players["white"]} wins`
      }
    }
  }
  else{
    checkStaleMate()
    checkFiftyMoveRule()
  }

}

function trimKingMoves(){
  let whiteKingValidMoves=[]
  
  let blackKingValidMoves=[]
  
  let whitePieces=[]
  
  let blackPieces=[]
  
  possibleMoves=[]
  piecesDefended=[]
  trimingKingMoves=true
  whiteKing.getPossibleMoves()
  blackKing.getPossibleMoves()
  trimingKingMoves=false

  for(let p of pieces){
    if(p.color==="white" && p.name.toLowerCase !=="king"){
     
      whitePieces.push(p)
      
    p.getPossibleMoves()
    }
    if(p.color==="black" && p.name.toLowerCase !=="king"){
      
      blackPieces.push(p)
      
    p.getPossibleMoves()
    }
  }
  console.log("DEFENDED",piecesDefended)
whiteKing.legalMoves.forEach(move => {

  let x = move.x
  let y = move.y
  if(x === whiteKing.x && y === whiteKing.y){
    whiteKingValidMoves.push(move)
  }
  else{
    
  let counter=0
  for (let p of blackPieces){
      
    p.getPossibleMoves()
    

    possibleMoves=[]
        function checkPiece(item) {
          return (
            item.x === x &&
            item.y === y
          );
        }
        let movesTocheck = p.legalMoves.slice(1)
        let indexOfMove = movesTocheck.findIndex(checkPiece);
        
        let indexOfGuardedMove = piecesDefended.findIndex(checkPiece);
        
        if(indexOfMove !== -1 || indexOfGuardedMove !== -1){
          counter ++
        }
    

  }
  if(counter === 0){
      whiteKingValidMoves.push(move)
  }

  }


})

blackKing.legalMoves.forEach(move => {

  let x = move.x
  let y = move.y
  if(x === blackKing.x && y === blackKing.y){
    blackKingValidMoves.push(move)
  }
  else{
    
  let counter=0
  for (let p of whitePieces){
          
          p.getPossibleMoves()
          
      
possibleMoves=[]
        function checkPiece(item) {
          return (
            item.x === x &&
            item.y === y
          );
        }
        let movesTocheck = p.legalMoves.slice(1)
        let indexOfMove = movesTocheck.findIndex(checkPiece);
        
        let indexOfGuardedMove = piecesDefended.findIndex(checkPiece);
        
        if(indexOfMove !== -1 || indexOfGuardedMove !== -1){
          counter ++
        }
    

  }
  if(counter === 0){
      blackKingValidMoves.push(move)
  }

  }


})

whiteKing.changeMoves(whiteKingValidMoves)
console.log("validWhiteKing",whiteKingValidMoves)
blackKing.changeMoves(blackKingValidMoves)
console.log("validBlackKing",blackKingValidMoves)

trimingKingMoves=false
possibleMoves=[]
}
function getCastlingRights() {
  allPossibleMovesBlack = [];
  allPossibleMovesWhite = [];

  piecesDefended=[]
  allPossibleMovesToConsiderForCastling = [];

  //check if squares not in check and not occupied

  let whiteQueenSideCounter = 0;
  let blackQueenSideCounter = 0;

  let whiteKingSideCounter = 0;
  let blackKingSideCounter = 0;
  whiteCastlingRights = "";
  blackCastlingRights = "";
  castlingRights = "";
  if (!whiteKing.moved) {
    checkingCastling = true;
    for (let p of pieces) {
      if (p.color === "black") {
        p.getPossibleMoves();
        if (allPossibleMovesToConsiderForCastling.length > 0) {
          allPossibleMovesToConsiderForCastling.forEach((move) => {
            allPossibleMovesBlack.push(move);
          });
        }
      }
    }

    checkingCastling = false;
    allPossibleMovesToConsiderForCastling = [];
    //white side castling
    for (let i = 0; i < squaresToCheckQueenSideWhite.length; i++) {
      if (i === 0) {
        function checkPiece(item) {
          return (
            item.x === squaresToCheckQueenSideWhite[i].x &&
            item.y === squaresToCheckQueenSideWhite[i].y &&
            item.name === "Rook" &&
            item.moved === false
          );
        }

        let indexOfPiece = pieces.findIndex(checkPiece);
        if (indexOfPiece === -1) {
          whiteQueenSideCounter++;
        }
      } else if (i === 1) {
        if (squaresToCheckQueenSideWhite[i].occupied === true) {
          whiteQueenSideCounter++;
        }
      } else {
        function checkSquare(item) {
          return (
            item.x === squaresToCheckQueenSideWhite[i].x &&
            item.y === squaresToCheckQueenSideWhite[i].y
          );
        }

        let indexOfSquare = allPossibleMovesBlack.findIndex(checkSquare);
        if (i === 4) {
          if (indexOfSquare > -1) {
            whiteQueenSideCounter++;
          }
        } else {
          if (
            squaresToCheckQueenSideWhite[i].occupied === true ||
            indexOfSquare > -1
          ) {
            whiteQueenSideCounter++;
          }
        }
      }
    }
    if (whiteQueenSideCounter === 0) {
      whiteCastlingRights = "Q";
    }

    //check kingcastlingwhite

    for (let i = 0; i < squaresToCheckKingSideWhite.length; i++) {
      if (i === squaresToCheckKingSideWhite.length - 1) {
        function checkPiece(item) {
          return (
            item.x === squaresToCheckKingSideWhite[i].x &&
            item.y === squaresToCheckKingSideWhite[i].y &&
            item.name === "Rook" &&
            item.moved === false
          );
        }

        let indexOfPiece = pieces.findIndex(checkPiece);
        if (indexOfPiece === -1) {
          whiteKingSideCounter++;
        }
      } else {
        function checkSquare(item) {
          return (
            item.x === squaresToCheckKingSideWhite[i].x &&
            item.y === squaresToCheckKingSideWhite[i].y
          );
        }

        let indexOfSquare = allPossibleMovesBlack.findIndex(checkSquare);
        if (i === 0) {
          if (indexOfSquare > -1) {
            whiteKingSideCounter++;
          }
        } else {
          if (
            squaresToCheckKingSideWhite[i].occupied === true ||
            indexOfSquare > -1
          ) {
            whiteKingSideCounter++;
          }
        }
      }
    }
    if (whiteKingSideCounter === 0) {
      whiteCastlingRights += "K";
    }
  }
  if (!blackKing.moved) {
    checkingCastling = true;
    for (let p of pieces) {
      if (p.color === "white") {
        p.getPossibleMoves();
        if (allPossibleMovesToConsiderForCastling.length > 0) {
          allPossibleMovesToConsiderForCastling.forEach((move) => {
            allPossibleMovesWhite.push(move);
          });
        }
      }
    }
    checkingCastling = false;

    allPossibleMovesToConsiderForCastling = [];
    //Black side castling

    for (let i = 0; i < squaresToCheckQueenSideBlack.length; i++) {
      if (i === 0) {
        function checkPiece(item) {
          return (
            item.x === squaresToCheckQueenSideBlack[i].x &&
            item.y === squaresToCheckQueenSideBlack[i].y &&
            item.name === "rook" &&
            item.moved === false
          );
        }

        let indexOfPiece = pieces.findIndex(checkPiece);
        if (indexOfPiece === -1) {
          blackQueenSideCounter++;
        }
      } else if (i === 1) {
        if (squaresToCheckQueenSideBlack[i].occupied === true) {
          blackQueenSideCounter++;
        }
      } else {
        function checkSquare(item) {
          return (
            item.x === squaresToCheckQueenSideBlack[i].x &&
            item.y === squaresToCheckQueenSideBlack[i].y
          );
        }

        let indexOfSquare = allPossibleMovesWhite.findIndex(checkSquare);
        if (i === squaresToCheckQueenSideBlack.length - 1) {
          if (indexOfSquare > -1) {
            blackQueenSideCounter++;
          }
        } else {
          if (
            squaresToCheckQueenSideBlack[i].occupied === true ||
            indexOfSquare > -1
          ) {
            blackQueenSideCounter++;
          }
        }
      }
    }
    if (blackQueenSideCounter === 0) {
      blackCastlingRights = "q";
    }

    //check kingcastlingBlack

    for (let i = 0; i < squaresToCheckKingSideBlack.length; i++) {
      if (i === squaresToCheckKingSideBlack.length - 1) {
        function checkPiece(item) {
          return (
            item.x === squaresToCheckKingSideBlack[i].x &&
            item.y === squaresToCheckKingSideBlack[i].y &&
            item.name === "rook" &&
            item.moved === false
          );
        }

        let indexOfPiece = pieces.findIndex(checkPiece);
        if (indexOfPiece === -1) {
          blackKingSideCounter++;
        }
      } else {
        function checkSquare(item) {
          return (
            item.x === squaresToCheckKingSideBlack[i].x &&
            item.y === squaresToCheckKingSideBlack[i].y
          );
        }

        let indexOfSquare = allPossibleMovesWhite.findIndex(checkSquare);
        if (i === 0) {
          if (indexOfSquare > -1) {
            blackKingSideCounter++;
          }
        } else {
          if (
            squaresToCheckKingSideBlack[i].occupied === true ||
            indexOfSquare > -1
          ) {
            blackKingSideCounter++;
          }
        }
      }
    }
    if (blackKingSideCounter === 0) {
      blackCastlingRights += "k";
    }
  }
  if (whiteCastlingRights) {
    castlingRights = whiteCastlingRights;
  }
  if (blackCastlingRights) {
    castlingRights += blackCastlingRights;
  }
  if (!castlingRights) {
    castlingRights = "-";
  }
  allPossibleMovesBlack = [];
  allPossibleMovesWhite = [];
  allPossibleMovesToConsiderForCastling = [];
}
function generateFEN() {
  let x = 0;
  let y = 0;
  let width = boardLength / 8;
  piecePlacement = "";
  
  for (let rank = 0; rank < 8; rank++) {
    let freeBoxes = 0;
    for (let file = 0; file < 8; file++) {
      for (s of squares) {
        if (s.x === x && s.y === y && s.occupied) {
          for (p of pieces) {
            if (p.x === x && p.y === y) {
              if (freeBoxes > 0) {
                piecePlacement += freeBoxes.toString();
              }
              if (p.name === "knight") {
                piecePlacement += "n";
              } else if (p.name.toLowerCase() === "knight") {
                piecePlacement += "N";
              } else {
                piecePlacement += p.name.charAt(0);
              }
              freeBoxes = 0;
            }
          }
        } else if (s.x === x && s.y === y && !s.occupied) {
          freeBoxes++;
        }
      }

      x += width;
    }
    if (freeBoxes > 0) {
      piecePlacement += freeBoxes.toString();
    }
    if (rank < 7) {
      piecePlacement += "/";
    }
    x = 0;
    y += width;
  }
  piecesDefended=[]
  getCastlingRights();
  getKingStatus()
  getMovesWhenChecked()
  openCheck()
  trimKingMoves()
  getGameStatus()

  console.log("Game",gameState)
  currentFEN = `${piecePlacement} ${activeColor} ${castlingRights} ${possibleEnPassantTarget} ${halfMoveClock} ${fullMoveNumber}`;
  console.log("target", currentFEN);
  
var playerTurn = document.getElementById("turn")
  activeColor === "w" ? playerTurn.textContent = "(Whites Turn)" : playerTurn.textContent = "(Blacks Turn)"
}
function movePiece(pinchX,pinchY) {
  if(gameState){
    
  if(!moving && !gameState.drawRequested && !gameState.over && !dialogOpen){
    
    let pieceX=pinchX;
    let pieceY=pinchY;
    let index = -1;
    let occupied = false;
    
    let inside = FindPoint(
      boardLength - boardLength,
      boardLength - boardLength,
      boardLength,
      boardLength,
      pieceX,
      pieceY
    );
    
    if (inside) {
      
    generateFEN();
      if (selectedBox && !moving) {
        prevSelectedBox = selectedBox;
      }
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].clicked(pieceX, pieceY) ) {
          selectedBox = squares[i];
          pieceX = selectedBox.x;
          pieceY = selectedBox.y;
        }
      }
      console.log("seletedB", selectedBox);
      if (selectedPiece) {
        prevSelectedPiece = selectedPiece;
      }
      occupied = selectedBox.occupied;
      for (let j = 0; j < pieces.length; j++) {
        if (pieces[j].clicked(pieceX, pieceY)  && !moving) {
          index = j;
    
          selectedPiece = pieces[index];
          selctedBox = squares[index];
        }
      }
      console.log("s", selectedPiece);
      console.log("ps", prevSelectedPiece);
    
      function checkIfOpenCheckPiece(item) {
        return (
          item.x === prevSelectedPiece.x &&
          item.y === prevSelectedPiece.y
        );
      }
      let protectingPieceIndex = 1
      
      console.log("alloewdWhiteopen",allMovesForWhiteOpenCheck)
      console.log("all allowed blavkopoen",allMovesForBlackOpenCheck)
      if(prevSelectedPiece){
        function checkIfAllowedOpenCheckMove(item) {
          return (
            item.x === selectedBox.x &&
            item.y === selectedBox.y
          );
        }
        
        if(prevSelectedPiece.color ==="white"){
        
          let piecesBlocked=[]
          protectingPieceIndex = pieces_protecting_white_king.findIndex(checkIfOpenCheckPiece)
          
          console.log("index wite", protectingPieceIndex)
          if(protectingPieceIndex > -1){
            let count = 0
            for(let p of opponent_pieces_around_white_king){
              p.legalMoves.forEach(move =>{
                if(prevSelectedPiece.x === move.x && prevSelectedPiece.y ===move.y ){
                  count ++
                  piecesBlocked.push(p)
                }
              })
            }
            
            console.log("blockedpppppppp",piecesBlocked)
            if(count >= 1){
              if(piecesBlocked.length === 1){
                getPossibleNonOpenCheckMoves(piecesBlocked[0],prevSelectedPiece)
                let allowed = allMovesForWhiteOpenCheck.findIndex(checkIfAllowedOpenCheckMove)
                if(allowed !== -1){
                  
                protectingPieceIndex = -1
                console.log("wertyuiop[")
                }
                else{
                  
              protectingPieceIndex = 1
                }
              }
              else{
                
              protectingPieceIndex = 1
              }
            }
            else{
              
              protectingPieceIndex = -1
            }
          }
         }
    
         if(prevSelectedPiece.color ==="black"){
           
        let piecesBlocked=[]
            protectingPieceIndex = pieces_protecting_black_king.findIndex(checkIfOpenCheckPiece)
            console.log("index", protectingPieceIndex)
            if(protectingPieceIndex > -1){
              let count = 0
              for(let p of opponent_pieces_around_black_king){
                p.legalMoves.forEach(move =>{
                  if(prevSelectedPiece.x === move.x && prevSelectedPiece.y === move.y ){
                    count ++
                    piecesBlocked.push(p)
                  }
                })
              }
              console.log("blockedpppppppp",piecesBlocked)
              if(count >= 1){
                
                if(piecesBlocked.length === 1){
                getPossibleNonOpenCheckMoves(piecesBlocked[0],prevSelectedPiece)
                let allowed = allMovesForBlackOpenCheck.findIndex(checkIfAllowedOpenCheckMove)
                if(allowed !== -1){
                  
                protectingPieceIndex = -1
                console.log("wertyuiop[")
                }
                else{
                  
              protectingPieceIndex = 1
                }
              }
              else{
                
              protectingPieceIndex = 1
              }
              }
              else{
              
                protectingPieceIndex = -1
              }
            }
            
           }
           
      }
      
      if (
        selectedPiece &&
        prevSelectedPiece !== selectedPiece &&
        selectedPiece.color.startsWith(activeColor) 
      ) {
        selectedPiece.getPossibleMoves();
      }
    console.log(protectingPieceIndex,"EWTEEEEeTz")
      if (occupied) {
        if (index > -1 && prevSelectedPiece !== selectedPiece) {
          if (prevSelectedPiece !== null) {
            if (
              prevSelectedPiece.x !== pieces[index].x ||
              prevSelectedPiece.y !== pieces[index].y
            ) {
              function checkSquare(item) {
                return item.x === selectedBox.x && item.y === selectedBox.y;
              }
              let indexOfSquare =
                prevSelectedPiece.legalMoves.findIndex(checkSquare);
    
              if(whiteKingChecked || blackKingChecked){
    
                if(whiteKingChecked && activeColor.startsWith("w") && allPossibleMovesWhiteWhenChecked.length > 0){
                  
                  let indexOfCheckingPiece =
                    allPossibleMovesWhiteWhenChecked.findIndex(checkSquare);
                    if (indexOfCheckingPiece !== -1 && indexOfSquare !== -1 && protectingPieceIndex === -1) {
                      console.log("move-1=checked");
                      setMoveType(prevSelectedPiece, pieceX, pieceY);
                      if (prevSelectedPiece !== pieces[index]) {
                        let pieceToRemoveX = pieces[index].x 
                        let pieceToRemoveY = pieces[index].y
                        let size = pieces[index].size
                        let pieceToRemoveColor=pieces[index].color
                        function checkPiece(item) {
                          return (
                            item.x === pieceToRemoveX &&
                            item.y - size === pieceToRemoveY
                          );
                        }
                        if(prevSelectedPiece){
                          if(prevSelectedPiece.color !== selectedPiece.color && prevSelectedPiece.color.indexOf(activeColor) > -1){
                          
                            moving= true
                            pieces.splice(index, 1);
                            setTimeout(() => {
                          
                              prevSelectedPiece.move(pieceX, pieceY);
                              halfMoveClock = 0;
                                console.log("done deleting")
                                
                              if(pieceToRemoveColor === "white"){
                                  
                                let indexOfRemovedPiece = white_pieces.findIndex(checkPiece);
                                          removedPieces.push(white_pieces[indexOfRemovedPiece]);
                                          }
                                          else if(pieceToRemoveColor === "black"){
                                            
                                let indexOfRemovedPiece = black_pieces.findIndex(checkPiece);
                                          removedPieces.push(black_pieces[indexOfRemovedPiece]);
                                          }
                              }, 1000);
    
                            }
                        }
                        
                      } else {
                        console.log("equal");
                      }
        
                      removed = true;
                    }
                }
                else if(blackKingChecked && activeColor.startsWith("b") && allPossibleMovesBlackWhenChecked.length > 0){
                 
                  let indexOfCheckingPiece =
                    allPossibleMovesBlackWhenChecked.findIndex(checkSquare);
                    if (indexOfCheckingPiece !== -1 && indexOfSquare !== -1 && protectingPieceIndex === -1) {
                      console.log("move-1=checked");
                      setMoveType(prevSelectedPiece, pieceX, pieceY);
                      if (prevSelectedPiece !== pieces[index]) {
                        let pieceToRemoveX = pieces[index].x 
                        let pieceToRemoveY = pieces[index].y
                        let size = pieces[index].size
                        let pieceToRemoveColor=pieces[index].color
                        function checkPiece(item) {
                          return (
                            item.x === pieceToRemoveX &&
                            item.y - size === pieceToRemoveY
                          );
                        }
                        
                        if(prevSelectedPiece){
                          if(prevSelectedPiece.color !== selectedPiece.color && prevSelectedPiece.color.indexOf(activeColor) > -1){
                          
                            moving= true
                            pieces.splice(index, 1);
                            
                        setTimeout(() => {
                          
                          prevSelectedPiece.move(pieceX, pieceY);
                          halfMoveClock = 0;
                            console.log("done deleting")
                            
                          if(pieceToRemoveColor === "white"){
                              
                            let indexOfRemovedPiece = white_pieces.findIndex(checkPiece);
                                      removedPieces.push(white_pieces[indexOfRemovedPiece]);
                                      }
                                      else if(pieceToRemoveColor === "black"){
                                        
                            let indexOfRemovedPiece = black_pieces.findIndex(checkPiece);
                                      removedPieces.push(black_pieces[indexOfRemovedPiece]);
                                      }
                          }, 1000);
                            }
                        }
                      } else {
                        console.log("equal");
                      }
        
                      removed = true;
                    }
                }
              }
              else{
                if (indexOfSquare !== -1 && protectingPieceIndex === -1) {
                  console.log("move-1");
                  setMoveType(prevSelectedPiece, pieceX, pieceY);
                  if (prevSelectedPiece !== pieces[index]) {
                    let pieceToRemoveX = pieces[index].x 
                    let pieceToRemoveY = pieces[index].y
                    let size = pieces[index].size
                    let pieceToRemoveColor=pieces[index].color
                    function checkPiece(item) {
                      return (
                        item.x === pieceToRemoveX &&
                        item.y - size === pieceToRemoveY
                      );
                    }
              
                    if(prevSelectedPiece.color !== selectedPiece.color && prevSelectedPiece.color.indexOf(activeColor) > -1){
                          
                      moving= true
                      pieces.splice(index, 1);
                      setTimeout(() => {
                      
                        prevSelectedPiece.move(pieceX, pieceY);
                        halfMoveClock = 0;
                          console.log("done deleting")
                          
                        if(pieceToRemoveColor === "white"){
                            
                          let indexOfRemovedPiece = white_pieces.findIndex(checkPiece);
                                    removedPieces.push(white_pieces[indexOfRemovedPiece]);
                                    }
                                    else if(pieceToRemoveColor === "black"){
                                      
                          let indexOfRemovedPiece = black_pieces.findIndex(checkPiece);
                                    removedPieces.push(black_pieces[indexOfRemovedPiece]);
                                    }
                        }, 1000);
                      }
                  
                  } else {
                    console.log("equal");
                  }
    
                  removed = true;
                }
              }
            }
          }
        }
      } else {
        
        if (prevSelectedPiece && protectingPieceIndex === -1) {
          function checkSquare(item) {
            return item.x === selectedBox.x && item.y === selectedBox.y;
          }
          let indexOfSquare = prevSelectedPiece.legalMoves.findIndex(checkSquare);
    
          if(whiteKingChecked || blackKingChecked){
    
            if(whiteKingChecked && activeColor.startsWith("w") && allPossibleMovesWhiteWhenChecked.length > 0){
             
              let indexOfCheckingPiece =
                allPossibleMovesWhiteWhenChecked.findIndex(checkSquare);
                if (indexOfCheckingPiece !== -1 && indexOfSquare !== -1 && protectingPieceIndex === -1) {
                  if (isEnPassantValid(prevSelectedPiece, pieceX, pieceY)) {
                    if (
                      prevSelectedPiece.x !== pieceX ||
                      prevSelectedPiece.y !== pieceY
                    ) {
                      
              moving = true
                      setMoveType(prevSelectedPiece, pieceX, pieceY);
                      console.log("move-2a=checked");
                      setTimeout(()=>{
        
                        prevSelectedPiece.move(pieceX, pieceY);
                      },1000)
                    }
                  } else {
                    if (
                      prevSelectedPiece.x !== pieceX ||
                      prevSelectedPiece.y !== pieceY
                    ) {
                      
              moving = true
                      setMoveType(prevSelectedPiece, pieceX, pieceY);
                      console.log("move-2b=checked");
                      prevSelectedPiece.move(pieceX, pieceY);
                     
                    }
                  }
                } else {
                  selectedPiece = null;
                  prevSelectedPiece = null;
                  selectedBox = null;
                  prevSelectedBox = null;
                  possibleMoves = [];
                }
          
            }
            else if(blackKingChecked && activeColor.startsWith("b") && allPossibleMovesBlackWhenChecked.length > 0){
             
              let indexOfCheckingPiece =
                allPossibleMovesBlackWhenChecked.findIndex(checkSquare);
                if (indexOfCheckingPiece !== -1 && indexOfSquare !== -1 && protectingPieceIndex === -1) {
                  if (isEnPassantValid(prevSelectedPiece, pieceX, pieceY)) {
                    if (
                      prevSelectedPiece.x !== pieceX ||
                      prevSelectedPiece.y !== pieceY
                    ) {
                      
              moving = true
                      setMoveType(prevSelectedPiece, pieceX, pieceY);
                      console.log("move-2a=checked");
                      setTimeout(()=>{
        
                        prevSelectedPiece.move(pieceX, pieceY);
                      },1000)
                    }
                  } else {
                    if (
                      prevSelectedPiece.x !== pieceX ||
                      prevSelectedPiece.y !== pieceY
                    ) {
                      
              moving = true
                      setMoveType(prevSelectedPiece, pieceX, pieceY);
                      console.log("move-2b=checked");
                      prevSelectedPiece.move(pieceX, pieceY);
                     
                    }
                  }
                } else {
                  selectedPiece = null;
                  prevSelectedPiece = null;
                  selectedBox = null;
                  prevSelectedBox = null;
                  possibleMoves = [];
                }
            }
          }
          else{
            if (indexOfSquare !== -1 && protectingPieceIndex === -1) {
              if (isEnPassantValid(prevSelectedPiece, pieceX, pieceY)) {
                if (
                  prevSelectedPiece.x !== pieceX ||
                  prevSelectedPiece.y !== pieceY
                ) {
                  
              moving = true
                  setMoveType(prevSelectedPiece, pieceX, pieceY);
                  console.log("move-2a");
                  setTimeout(()=>{
    
                    prevSelectedPiece.move(pieceX, pieceY);
                  },1000)
                }
              } else {
                if (
                  prevSelectedPiece.x !== pieceX ||
                  prevSelectedPiece.y !== pieceY
                ) {
                  
              moving = true
                  setMoveType(prevSelectedPiece, pieceX, pieceY);
                  console.log("move-2b");
                  prevSelectedPiece.move(pieceX, pieceY);
                 
                }
              }
            } else {
              selectedPiece = null;
              prevSelectedPiece = null;
              selectedBox = null;
              prevSelectedBox = null;
              possibleMoves = [];
              
              moving =false
            }
          }        
          
        }
      }
    } else {
      console.log("out");
      selectedPiece = null;
      prevSelectedPiece = null;
      selectedBox = null;
      prevSelectedBox = null;
      possibleMoves = [];
    }
      }
  }
}


///king stuff

function getPossibleMovesOfPiece(piece) {
  if ( whiteKingChecked || blackKingChecked) {
    forbiddenBlackKingMoves=[]
    forbiddenWhiteKingMoves=[]
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

function getPossibleNonOpenCheckMoves(piece,openCheckPiece) {
 allMovesForBlackOpenCheck=[]
 allMovesForWhiteOpenCheck=[]
  let name = piece.name.toLowerCase();
  let color=piece.color
  let moves
  
  switch (name) {
    
    case "rook":
      moves = getNonOpenCheckRookMoves(piece,openCheckPiece);
     
      moves.forEach(move => {
        if(color ==="white"){

          allMovesForBlackOpenCheck.push(move)
        }
        if(color ==="black")
        
        allMovesForWhiteOpenCheck.push(move)
      });
      break;
    case "bishop":
      moves = getNonOpenCheckBishopMoves(piece,openCheckPiece);
      moves.forEach(move => {
        if(color ==="white"){

          allMovesForBlackOpenCheck.push(move)
        }
        if(color ==="black")
        
        allMovesForWhiteOpenCheck.push(move)
      });
      break;
    case "queen":
      moves = getNonOpenCheckQueenMoves(piece,openCheckPiece);
      moves.forEach(move => {
        if(color ==="white"){

          allMovesForBlackOpenCheck.push(move)
        }
        if(color ==="black")
        
        allMovesForWhiteOpenCheck.push(move)
      });
      break;
  }
  
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzz",allMovesForWhiteOpenCheck,allMovesForBlackOpenCheck)
}

///moves stuff

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

///legal open check moves

function getNonOpenCheckRookMoves(piece,openCheckPiece) {
  let moves = [];
  let px = piece.x;
  let py = piece.y;
  let inside = true;

  let color = piece.color;
  //top
  let size = piece.size;
  let foundOpenChechPiece=false
  
  moves.push({ x: piece.x, y: piece.y });

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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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

  moves.push({ x: piece.x, y: piece.y });

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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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

  moves.push({ x: piece.x, y: piece.y });

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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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
    moves = [{ x: piece.x, y: piece.y }];
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

