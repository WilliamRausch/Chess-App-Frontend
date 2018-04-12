import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// additional imports from react-router-dom and redux
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
//import reducers from './reducers/reducer';

// import components here
import Players from './PlayerList';
import SinglePlayer from './SinglePlayer';
 import GameList from './GameList';
 import Game from './Game';
 import PlayerCreate from './PlayerCreate';
 import Login from './Login';
 import Stats from './Stats';
// import GameForm from './components/GameForm';
// import SingleGame from './containers/SingleGame';
// import About from './components/About';

// const store = createStore(
//     reducers,
//     compose(
//         applyMiddleware(reduxThunk)
//     )
// );

ReactDOM.render(

  <BrowserRouter>
    
      <Switch>
      	<Route exact path="/" component={Login} />
      	<Route exact path="/playerCreate" component={PlayerCreate} />
        <Route exact path="/Home/:id" component={Players} />
        <Route exact path="/Home/:id/Stats" component={Stats} />
        <Route exact path='/Home/:playerId/Challenge/:id' component={SinglePlayer} />
        <Route exact path = "/GameList/:id" component={GameList} />
        <Route exact path = "/:id/Game/:GameId" component = {Game}/>
        
      </Switch>
    
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
