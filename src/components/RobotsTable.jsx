import React from 'react';
import ReactDOM from 'react-dom';

var RobotsTable = React.createClass({
  render: function(){
    var robots = [
      {name:"c3po", description:"specializes in language translation"},
      {name:"r2d2", description:"holds a secret message"},
      {name:"bb8",  description:"rolls around"}
    ];
    var robot = robots[0];

    return (

      <table className="table table-bordered table-hover table-responsive" style={{width:"100%"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href={'robots/'+robot.name} >{robot.name}</a></td>
            <td>{robot.description}</td>
          </tr>
        </tbody>
      </table>

    )
  }
});

ReactDOM.render(
  <RobotsTable/>,
  document.getElementById('robots-table')
);
