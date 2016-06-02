var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var RobotSchema = new Schema(
  {
    name : {
      type: String,
      required: true
    },
    description : {
      type: String,
      required: true
    }
  },
  {
    timestamps: { // include timestamp attributes in the schema and automattically assign values on create and update, respectively
      createdAt: 'created_at', // rename from createdAt
      updatedAt: 'updated_at' // rename from updatedAt
    }
  }
);

module.exports = mongoose.model('Robot', RobotSchema);
