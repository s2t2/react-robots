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
      this.props.router.push("/");
    },

    render: function(){
      var robot = this.props.robot;
      
      return (
        <tr>
          <td>{robot.id}</td>
          <td><Link to={'/robots/'+robot.id}>{robot.name}</Link></td>
          <td>{robot.description}</td>
          <td>{ moment(robot.created_at).tz(moment.tz.guess(robot.created_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
          <td>{ moment(robot.updated_at).tz(moment.tz.guess(robot.updated_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
          <td>
            <button className='btn btn-warning' onClick={ this.editRobot.bind(null, robot.id) }>
              <span className="glyphicon glyphicon-pencil"></span> edit
            </button>
          </td>
          <td>
            <button className='btn btn-danger' onClick={ this.deleteRobot.bind(null, robot.id) }>
              <span className="glyphicon glyphicon-trash"></span> delete
            </button>
          </td>
        </tr>
      )
    }
  })
);

module.exports = RobotsTableRow;
