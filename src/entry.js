require("../node_modules/bootstrap/dist/css/bootstrap.css");
require("../public/stylesheets/style.css");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Redirect } from 'react-router';

import App from './components/App.jsx';
import RobotsTable from './components/RobotsTable.jsx';
import RobotsForm from './components/RobotsForm.jsx';

//var myHistory = process.env.NODE_ENV == "test" ? browserHistory : hashHistory;

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RobotsTable}/>
      <Route path="robots" component={RobotsTable}/>
      <Route path="robots/new" component={RobotsForm}/>
      <Route path="robots/:id" component={RobotsTable}/>
      <Route path="robots/:id/edit" component={RobotsForm}/>
    </Route>
  </Router>

  ,document.getElementById('app')
)

if (module.hot) {module.hot.accept();} // enables hot module replacement when applicable
