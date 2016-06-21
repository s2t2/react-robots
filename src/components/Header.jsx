import React from 'react';
import { Link, withRouter } from 'react-router';

var Header = withRouter(
  React.createClass({
    render: function(){
      var buttonStyle = {marginLeft: "0.5em", marginTop:"0.7em"};
      return (
        <header>
          <div id="flash-messages"></div>

          <h1><Link to="/">{this.props.title}</Link></h1>

          <Link to="/robots/new" type="button" className="btn btn-primary pull-right" style={buttonStyle}>
            <span className="glyphicon glyphicon-plus"></span> new
          </Link>

          <button type="button" className="btn btn-success pull-right" style={buttonStyle} onClick={this.handleRecycle}>
            <span className="glyphicon glyphicon-retweet"></span> recycle
          </button>
        </header>
      )
    },

    handleRecycle: function(){
      console.log("HANDLE RECYCLE");
      var component = this;
      var requestUrl = "/api/robots/recycle";
      var requestOptions = {method: 'post'};
      fetch(requestUrl, requestOptions).then(function(r) { return r.json(); }).then(function(response) {
        component.props.router.push({
          pathname: '/',
          state: {
            flash: {success: ["Recycled "+ response.deletedRobotsCount+ " robots into "+ response.createdRobotsCount + " robots."]}
          }
        });
      });
    }
  })
);

module.exports = Header;
