import React from 'react';

var RobotsFormInputName = React.createClass({

  //componentWillMount: function(){
  //  console.log("FORM NAME -- WILL MOUNT", this.props.bot);
  //},
//
  //componentWillReceiveProps: function(nextProps) {
  //  console.log("FORM NAME -- RECEIVE PROPS", nextProps.bot);
  //},
//
  //componentWillUpdate: function(nextProps, nextState){
  //  console.log("FORM NAME -- WILL UPDATE", nextProps.bot);
  //},

  changeName(){
    var newName = this.refs.robotNameRef.value;
    console.log("CHANGE NAME", newName);
    this.props.setName(newName);
  },

  render: function(){
    return (
      <div className="form-group">
        <label for="robotName" className="col-sm-2 control-label">Name</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" name="robotName" ref="robotNameRef" placeholder="My Robot" value={this.props.bot.name} onChange={this.changeName}/>
        </div>
      </div>
    )
  }
});

module.exports = RobotsFormInputName;
