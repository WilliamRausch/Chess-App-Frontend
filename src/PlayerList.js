import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Players extends Component {
  constructor(props){
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount(){
    fetch("https://safe-garden-70860.herokuapp.com/Players")
    .then(response => {
      return response.json()
    }).then(data => {
      console.log(data);
      this.setState({players: data})
    })
  }





  render() {
    let match = this.props.match;
    const id = match.params.id;
    //this.getPlayers();
    console.log("testing");
        let playerList = this.state.players.map((player) => {
      return <Link to={`${id}/Challenge/${player.id}`}>
      <div key={player.id} id="each-player" >
             
              
                <p className="game_category">{player.name}</p>
              
             </div>;
             </Link>
    })
    return (


      <div id="playerList-container">
        <div class="topnav">
            <Link class = "active" to={`/Home/${id}`}>
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
      
      <div id="playerList">
      <h1>Playerselect</h1>
      {playerList}
      </div>
      </div>
    )
  }
}


export default Players;
