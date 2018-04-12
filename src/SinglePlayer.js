import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Players extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: {}
    }
  }
 

  componentDidMount(){
    let match = this.props.match;
    const id = match.params.id;
    console.log(id);
    fetch(`https://safe-garden-70860.herokuapp.com/Players/${id}`)
    .then(response => {
      return response.json()
    }).then(data => {
      console.log(data);
      this.setState({player: data})
    })
  }
  Challenge(){
    
      
    console.log("Challenging");
    let body = {
   
};

    //let user = match.params.playerId;
    let match = this.props.match;
     let user = match.params.playerId;
    const id2 = match.params.id;
    fetch(`https://safe-garden-70860.herokuapp.com/Players/${user}/Games/${id2}`,{
      method: "POST",
      body: JSON.stringify(body),

       headers: {
              'Content-Type': 'application/json'
            }
    }).then(response => {
          console.log("RESPONSE: ", response);
          this.props.history.push(`/Home/${user}`)
        }).catch(err => {
          console.log("ERROR: ", err);
        });
      
  }





  render() {
      let match = this.props.match;
    const id = match.params.playerId;


    //this.getPlayers();
   let player = this.state.player;
    return (

      <div id="singlePlayer-container">


        <div class="topnav">
            <Link class = "active" to={`/Home/${id}`}>
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
      <div id = "singlePlayer">
      <h1>{player.name}</h1>
      <div id = "ratio">
      <div>
      <p>WINS</p>
      <p>{player.wins}</p>
      </div>
      <div>
      <p>LOSSES</p>
      <p>{player.losses}</p>
      </div>
      </div>
      <button className="btn" onClick ={ () =>{this.Challenge()}}>Challenge</button>
      </div>
      </div>
    )
  }
}


export default Players;