require("../public/stylesheets/style.css");
require("../public/javascripts/bootstrap-flash.js");

import React from 'react';
import ReactDOM from 'react-dom';
import RobotsTable from './components/RobotsTable.jsx';

ReactDOM.render(
  <RobotsTable/>,
  document.getElementById('robots-table')
);

if (module.hot) {module.hot.accept();} // enables hot module replacement when applicable
