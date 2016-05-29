import React from 'react';
import RobotsTableHead from './RobotsTableHead.jsx';
import RobotsTableBody from './RobotsTableBody.jsx';

var RobotsTable = React.createClass({
  render: function(){
    return (
      <table className="table table-bordered table-hover table-responsive" style={{width:"100%"}}>
        <RobotsTableHead/>
        <RobotsTableBody params={this.props.params}/>
      </table>
    )
  }
});

module.exports = RobotsTable;
