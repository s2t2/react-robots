import React from 'react';

var RobotsFormInputDescription = React.createClass({

  render: function(){
    return (
      <div className="form-group">
        <label for="robotDescription" className="col-sm-2 control-label">Description</label>
        <div className="col-sm-10">
          <textarea id="robot-description" className="form-control" rows="3" name="robotDescription" ref="robotDescriptionRef" placeholder="All the things..." value={this.props.bot.description} onChange={this.changeDescription}></textarea>
        </div>
      </div>
    )
  },

  //
  // EVENT LIFECYCLE
  //

  componentWillMount: function(){
    console.log("FORM DESC -- WILL MOUNT", this.props.bot);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("FORM DESC -- RECEIVE PROPS", nextProps.bot);
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("FORM DESC -- WILL UPDATE", nextProps.bot);
  },

  //
  // MY FUNCTIONS
  //

  changeDescription(){
    var newDescription = this.refs.robotDescriptionRef.value;
    console.log("CHANGE DESC", newDescription);
    this.props.setDescription(newDescription);
  }
});

module.exports = RobotsFormInputDescription;
