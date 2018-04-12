import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Game extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      Spaces: [],
      Pieces: [],
      SelectedX: "",
      SelectedY: "",
      SelectedX2: "",
      SelectedY2: "",
      player1Id: "",
      player2Id: "",
      numMoves: ""
     

    }
   this.handleCurrent = this.handleCurrent.bind(this);
   // this.handleSelectedY = this.handleSelectedY.bind(this);
   // this.handleSelectedX2 = this.handleSelectedX2.bind(this);
   // this.handleSelectedY2 = this.handleSelectedY2.bind(this);
   this.handleMove = this.handleMove.bind(this);

  }




  //  handleSelectedX(event) {
  //   this.setState({
  //     SelectedX: event.target.value
  //   })
  // }
  // handleSelectedY(event) {
  //   this.setState({
  //     SelectedY: event.target.value
  //   })
  // }
  // handleSelectedX2(event) {
  //   this.setState({
  //     SelectedX2: event.target.value
  //   })
  // }
  // handleSelectedY2(event) {
  //   this.setState({
  //     SelectedY2: event.target.value
  //   })
  // }

  handleCurrent(x,y,player1,player2) {
    if(!this.state.SelectedX && this.state.SelectedX !== 0){
    this.setState({
      SelectedX: x,
      SelectedY: y
    })
    console.log("CURRENT SPACE IS "+ x + y);
  }else{
    this.setState({
      SelectedX2: x,
      SelectedY2: y
    })
    console.log("SPACE TO MOVE IS" + x + y);
    this.handleMove(this.state.SelectedX, this.state.SelectedY, x, y,player1,player2);
  }
  
  }


//    handleSelected(x,y) {
//     if(this.state.SelectedX){
//     this.setState({
//       SelectedX2: x,
//       SelectedY2: y
//     })
// }
//   }






   handleMove = (x,y,x1,y1) => {
    console.log("MOVE #"+ this.state.numMoves);

   // this.CheckforWinner();
    console.log(x+" " + y + " " +x1 + " " +y1);
    //event.preventDefault();
    this.setState({
      SelectedX : x,
      SelectedY : y,
      SelectedX2 : x1,
      SelectedY2 : y1,

      
    })
    let match = this.props.match;
       const id = match.params.id;
    const GameId = match.params.GameId;
    let Xpos = JSON.stringify(this.state.SelectedX);
    let Ypos = JSON.stringify(this.state.SelectedY);
    let Xpos2 = JSON.stringify(this.state.SelectedX2);
    let Ypos2 = JSON.stringify(this.state.SelectedY2);


    if((this.state.player1Id==id && this.state.numMoves%2 == 0) || this.state.player1Id != id && this.state.numMoves%2 != 0){
    fetch(`https://safe-garden-70860.herokuapp.com/Players/${id}/Games/${GameId}/${this.state.SelectedX}${this.state.SelectedY}/${x1}${y1}`,{
      method: "PUT"
    }).then(response => {
      this.refresh();
    }).then(response => {
      //console.log("CHECKING FOR WINNER");
      //this.checkforWinner();
    })
  }else{
    alert("Not your turn");
  }

   
      //window.location.reload();
    
    //console.log(Xpos, Ypos, Xpos2, Ypos2);

      //window.location.reload();

    }
    refresh(){
      window.location.reload();
    } 
   
    CheckforWinner(Pieces, player1, player2){
      console.log("CHECKING FOR WINNER");
      
      console.log("PLAYER2" + player2);
      var blackK = 0;
      var whiteK = 0;

      for(var i = 0; i<Pieces.length; i++){
        //console.log(Pieces[i]);
        if(Pieces[i]){
        if(Pieces[i].charSymbol == "[k]"){
          console.log("BLACK KING INTACT");
          
           blackK = 1;
        }else if(Pieces[i].charSymbol == "[K]"){
          console.log("WHITE KING INTACT");
           whiteK = 1;
        }
      }
    }
      if(!whiteK && blackK){
        
        fetch(`https://safe-garden-70860.herokuapp.com/Players/${player2}/${player1}`,{
          method: "PUT"
        }).then(response =>{
          let match = this.props.match;
          const id = match.params.id;
          const GameId = match.params.GameId;
          alert("PlAYER 2 WINS!")
        })
      }else if (whiteK && !blackK){
         fetch(`https://safe-garden-70860.herokuapp.com/Players/${player1}/${player2}`,{
          method: "PUT"
        }).then(response =>{
          let match = this.props.match;
          const id = match.params.id;
          const GameId = match.params.GameId;
          alert("PlAYER 1 WINS!");
          this.props.history.push(`/Home/${id}`);
          fetch(`https://safe-garden-70860.herokuapp.com/Players/${id}/Games/${GameId}`,{
          method: "DELETE"
        })
        })
        
      }
    }

  componentDidMount(){
    
    let match = this.props.match;
    const id = match.params.id;
    const GameId = match.params.GameId;
    console.log(id);
    fetch(`https://safe-garden-70860.herokuapp.com/Players/${id}/Games/${GameId}`)
    .then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      //console.log(data.board.spots[1].piece.color);
      let piecesArray = [];
      for(var i=0;i<data.board.spots.length;i++){
        //console.log("piecetesting"+data.board.spots[i].piece);
          piecesArray.push(data.board.spots[i].piece);
      }
      this.CheckforWinner(piecesArray,data.player1.id,data.player2.id);
      console.log(piecesArray)
      this.setState({Spaces: data.board.spots, Pieces: piecesArray, player1Id: data.player1.id, player2Id:data.player2.id, numMoves:data.moves })
     
    }).then( res => {
      //this.CheckforWinner(piecesArray);
    })
  }

   



 

  render() {
    let match = this.props.match;
    const id = match.params.id;
    let player1 = this.state.player1Id;
    let player2 = this.state.player2Id;

    console.log("ID's"+player1+player2);
   
    
   

    
    let pieces = this.state.Pieces;
    var counter = 0;
    let spaces = this.state.Spaces.map((spaces, index) => {
     counter += 1;
       
       //9817
     

      if(index === 0 || index === 2 || index === 4 || index === 6 || index === 9 || index == 11 || index == 13 || index == 15 || index == 16 || index == 18 ||index === 20 || index === 22 || index === 25 || index === 27 || index === 29 || index == 31 || index == 32 || index == 34 || index == 36 || index == 38 || index == 41 || index == 43 || index == 45 || index == 47 || index == 48 || index == 50 || index == 52 || index == 54 || index == 57 || index == 59 || index == 61 || index == 63){
      if(pieces[index]){
          if(pieces[index].charSymbol == "[P]"){
return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9817;</p>
        </div>
          }else if(pieces[index].charSymbol == "[p]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9823;</p>
        </div>
      }else if(pieces[index].charSymbol == "[R]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9814;</p>
        </div>
      }else if(pieces[index].charSymbol == "[r]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9820;</p>
        </div>
      }else if(pieces[index].charSymbol == "[N]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9816;</p>
        </div>
      }else if(pieces[index].charSymbol == "[n]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9822;</p>
        </div>
      }else if(pieces[index].charSymbol == "[B]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9815;</p>
        </div>
      }else if(pieces[index].charSymbol == "[b]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9821;</p>
        </div>
      }else if(pieces[index].charSymbol == "[Q]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9813;</p>
        </div>
      }else if(pieces[index].charSymbol == "[q]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9819;</p>
        </div>
      }else if(pieces[index].charSymbol == "[K]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9812;</p>
        </div>
      }else if(pieces[index].charSymbol == "[k]"){
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9818;</p>
        </div>
      }else{
        return <div key={spaces.id} id = "light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>{pieces[index].charSymbol}</p>
        </div>
      }
      }else{
      return <div key={spaces.id} id="light-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            
              
                <p className="game_category"></p>
           
             </div>;
           }
         }else{
          if(pieces[index]){
            if(pieces[index].charSymbol == "[P]"){
return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9817;</p>
        </div>
          }else if(pieces[index].charSymbol == "[p]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9823;</p>
        </div>
      }else if(pieces[index].charSymbol == "[R]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9814;</p>
        </div>
      }else if(pieces[index].charSymbol == "[r]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9820;</p>
        </div>
      }else if(pieces[index].charSymbol == "[N]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9816;</p>
        </div>
      }else if(pieces[index].charSymbol == "[n]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9822;</p>
        </div>
      }else if(pieces[index].charSymbol == "[B]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9815;</p>
        </div>
      }else if(pieces[index].charSymbol == "[b]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9821;</p>
        </div>
      }else if(pieces[index].charSymbol == "[Q]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9813;</p>
        </div>
      }else if(pieces[index].charSymbol == "[q]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9819;</p>
        </div>
      }else if(pieces[index].charSymbol == "[K]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9812;</p>
        </div>
      }else if(pieces[index].charSymbol == "[k]"){
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>&#9818;</p>
        </div>
      }else{
        return <div key={spaces.id} id = "dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            <p>{pieces[index].charSymbol}</p>
        </div>
      }
      }else{
      return <div key={spaces.id} id="dark-space" onClick ={ () =>{this.handleCurrent(spaces.x, spaces.y,player1,player2)}} >
            
              
                <p className="game_category"></p>
           
             </div>;
           }
        
      }
         
    })
    //console.log("test" + this.state.Pieces.color);
    //this.getPlayers();
   //let player = this.state.player;
 
   if(this.state.player1Id == id ){
    return (
      <div id = "Board-container">
      <div class="topnav">
            <Link to={`/Home/${id}`}>
           <a>Home</a>
           </Link>
           <a>Stats</a>
           <Link to={`/GameList/${id}`}>
           <a>Games</a>
           </Link>
           <Link to={'/'}>
           <a>Logout</a>
           </Link>
        </div>
      <h1> ChessGame</h1>
      <div id = "Board1">
      {spaces}
      </div>
      </div>
      )

    }else{
      return (
      <div id = "Board-container">

      <div class="topnav">
            <Link to={`/Home/${id}`}>
           <a>Home</a>
           </Link>
           <Link to={`/Home/${id}/Stats`}>
           <a>Stats</a>
           </Link>
           <Link to={`/GameList/${id}`}>
           <a>Games</a>
           </Link>
           <Link to={'/'}>
           <a>Logout</a>
           </Link>
        </div>
      <h1> ChessGame</h1>
      <div id = "Board2">
      {spaces}
      </div>
      </div>
      )

    }

      
    
  }
}


export default Game;