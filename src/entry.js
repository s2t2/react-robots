require("../public/stylesheets/style.css");
require("../public/javascripts/bootstrap-flash.js");

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.jsx'
import RobotsTable from './components/RobotsTable.jsx';
import Footer from './components/Footer.jsx';

ReactDOM.render(<Header/>, document.getElementById('header') );
ReactDOM.render(<RobotsTable/>, document.getElementById('robots-table') );
ReactDOM.render(<Footer/>, document.getElementById('footer') );

if (module.hot) {module.hot.accept();} // enables hot module replacement when applicable
