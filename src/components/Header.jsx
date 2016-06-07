var $ = require('jquery');
import React from 'react';
import { Link, withRouter } from 'react-router';

var Header = withRouter(
  React.createClass({
    render: function(){
      var buttonStyle = {marginLeft: "0.5em"};
      return (
        <header>
          <div id="flash-messages"></div>

          <h1><Link to="/">{this.props.title}</Link></h1>

          <Link to="/robots/new" type="button" className="btn btn-primary pull-right" style={buttonStyle}>
            <span className="glyphicon glyphicon-plus"></span> new
          </Link>

          <button type="button" className="btn btn-success pull-right" onClick={this.recycleRobots}>
            <span className="glyphicon glyphicon-retweet"></span> recycle
          </button>
        </header>
      )
    },

    recycleRobots: function(){
      console.log("RECYCLE");
      $.ajax({
        url: "api/recycle",
        method: "POST",
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log("DATA",data)
          this.props.router.push({
            pathname: '/',
            state: {
              flash: {success: ["Recycled "+ data.deletedRobotsCount+ " robots"]}
            }
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(xhr, status, err);
          this.props.router.push({
            pathname: '/',
            state: {
              flash: {danger: ["Couldn't recycle robots"]}
            }
          });
        }.bind(this)
      });
    }
  })
);

module.exports = Header;
