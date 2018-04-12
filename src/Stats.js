import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Stats extends Component {
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
  





  render() {
      let match = this.props.match;
    const id = match.params.id;


    //this.getPlayers();
   let player = this.state.player;
    return (

      <div id="singlePlayer-container">


        <div class="topnav">
            <Link  to={`/Home/${id}`}>
           <a>Home</a>
           </Link>
           <Link class="active" to={`/Home/${id}/Stats`}>
           <a>Stats</a>
           </Link>
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
      
      </div>
      </div>
    )
  }
}


export default Stats;