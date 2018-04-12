import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";

class PlayerCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
     Name: "",
     Password: ""

    }
   
  
  this.handleName = this.handleName.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 
}
  componentDidMount(){
   
  }
  handlePassword(event){
    this.setState({
      Password: event.target.value
    })
  }

     handleName(event) {
    this.setState({
      Name: event.target.value
    })
  }
  handleSubmit(name, password){
    this.setState({
      Name: name,
      Password: password

      
    })

    let body = {
      "name": this.state.Name,
      "password": this.state.Password
    }
    fetch(`https://safe-garden-70860.herokuapp.com/Players`,{
      method: "POST",
      body: JSON.stringify(body),
      headers: {
              'Content-Type': 'application/json'
            }


    }).then( data =>{
      console.log(data);
      this.props.history.push('/');
    })
  }
  

    





  render() {
    //this.getPlayers();
   //let player = this.state.player;
    return (

      <div id="singlePlayer-container">
      <h1>Enter a name and password</h1>
      <div>
            <input onChange={this.handleName} placeholder="Name"/>
          </div>
          <div>
            <input onChange={this.handlePassword} placeholder="Password"/>
          </div>
          
          <button onClick={this.handleSubmit}>Submit</button>
      </div>

      
    )
  }
}


export default PlayerCreate;