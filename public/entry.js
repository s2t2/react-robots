require("../node_modules/bootstrap/dist/css/bootstrap.css");
require("../public/stylesheets/style.css");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Redirect } from 'react-router';

import Layout from './components/Layout.jsx';
import RobotsTable from './components/robots/Table.jsx';
import RobotsForm from './components/robots/Form.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
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
