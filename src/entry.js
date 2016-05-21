require("../public/stylesheets/style.css");
require("../public/javascripts/bootstrap-flash.js");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Redirect } from 'react-router';

import App from './components/App.jsx';
import RobotsTable from './components/RobotsTable.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={RobotsTable}>
        <Route path="robots" component={RobotsTable}>
          <Route path=":id" component={RobotsTable}/>
        </Route>
      </Route>
    </Route>
  </Router>

  ,document.getElementById('app')
)

if (module.hot) {module.hot.accept();} // enables hot module replacement when applicable
