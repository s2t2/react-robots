var $ = require('jquery');
var moment = require('moment-timezone');
import React from 'react';
import { Link, withRouter } from 'react-router';

var RobotsTableRow = withRouter (
  React.createClass({

    editRobot: function(robotId){
      console.log("EDIT ROBOT #", robotId);
      this.props.router.push('/robots/'+robotId+'/edit');
    },

    deleteRobot: function(robotId){
      console.log("DELETE ROBOT #", robotId);
      $.ajax({
        url: '/api/robots/'+robotId+"/destroy",
        method: "POST",
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({robots: [], flash: {success: "DELETED ROBOT"}});
          this.props.router.push("/");
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
          this.setState({robots: [], flash: {danger: ["COULDN'T DELETE ROBOT #"+robotId]}});
          this.props.router.push("/");
        }.bind(this)
      });
    },

    render: function(){
      var robot = this.props.robot;

      return (
        <tr>
          <td>{robot._id}</td>
          <td><Link to={'/robots/'+robot._id}>{robot.name}</Link></td>
          <td>{robot.description}</td>
          <td>{ moment(robot.created_at).tz(moment.tz.guess(robot.created_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
          <td>{ moment(robot.updated_at).tz(moment.tz.guess(robot.updated_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
          <td>
            <button className='btn btn-warning' onClick={ this.editRobot.bind(null, robot._id) }>
              <span className="glyphicon glyphicon-pencil"></span> edit
            </button>
          </td>
          <td>
            <button className='btn btn-danger' onClick={ this.deleteRobot.bind(null, robot._id) }>
              <span className="glyphicon glyphicon-trash"></span> delete
            </button>
          </td>
        </tr>
      )
    }
  })
);

module.exports = RobotsTableRow;
