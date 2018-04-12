import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class GameList extends Component {
  constructor(props){
    super(props);
    this.state = {
      Games: []
    }
  }

  componentDidMount(){
    let match = this.props.match;
    const id = match.params.id;
    console.log(id);
    fetch(`https://safe-garden-70860.herokuapp.com/Players/${id}/Games`)
    .then(response => {
      return response.json()
    }).then(data => {
      console.log(data);
      this.setState({Games: data})
    })
  }






  render() {
    let match = this.props.match;
    const id = match.params.id;
    console.log("GL testing");

    let gameList = this.state.Games.map((game) => {
      return <div key={game.id} id="each-player" a href = "/">
              <Link to={`/${id}/Game/${game.id}`}>
              
                <p className="game_category">{game.player1.name} vs {game.player2.name}</p>
              </Link>
             </div>;
    })
    //this.getPlayers();
   //let player = this.state.player;
    return (


      <div id = "playerList-container">
      <div class="topnav">
            <Link to={`/Home/${id}`}>
           <a>Home</a>
           </Link>
           <Link to={`/Home/${id}/Stats`}>
           <a>Stats</a>
           </Link>
           <Link class = "active" to={`/GameList/${id}`}>
           <a>Games</a>
           </Link>
           <Link to={'/'}>
           <a>Logout</a>
           </Link>
        </div>
        <div id="playerList">
      <h1>Active Games</h1>
            {gameList}
      </div>
      
      </div>

      
    )
  }
}


export default GameList;