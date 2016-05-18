require("../public/stylesheets/style.css");
require("../public/javascripts/bootstrap-flash.js");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/App.jsx';
//ReactDOM.render(
//  <App/>,
//  document.getElementById('app')
//);

import RobotsTable from './components/RobotsTable.jsx';
//ReactDOM.render(
//  <RobotsTable/>,
//  document.getElementById('robots-table')
//);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/robots" component={RobotsTable} />
    <Route path="/robots/1" component={RobotsTable} />
  </Router>

  ,document.getElementById('app')
)

if (module.hot) {module.hot.accept();} // enables hot module replacement when applicable
