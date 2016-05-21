require("../public/stylesheets/style.css");
require("../public/javascripts/bootstrap-flash.js");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/App.jsx';
import RobotsTable from './components/RobotsTable.jsx';

//var robots = [
//  {id: 1, name:"c3po", description:"specializes in language translation"},
//  {id: 2, name:"r2d2", description:"holds a secret message"},
//  {id: 3, name:"bb8",  description:"rolls around"}
//];
//
//var selectRobots = function(nextState, replaceState){
//  var robotId = nextState.params.id;
//  var selectedRobots;
//
//  if (robotId) {
//    console.log("ROBOT ID:", robotId);
//    selectedRobots = robots.filter(function(r){ return r.id == robotId; })
//  } else {
//    selectedRobots = robots;
//  }
//
//  replaceState({
//    robots: selectedRobots
//  })
//  console.log(nextState)
//};

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/robots" component={RobotsTable} >
      <Route path=":id" component={RobotsTable}/>
    </Route>
  </Router>

  ,document.getElementById('app')
)

if (module.hot) {module.hot.accept();} // enables hot module replacement when applicable
