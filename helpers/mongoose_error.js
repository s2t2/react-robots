var exports = module.exports = {};

// Transform mongoose error object into error message(s).
//
// @param [MongooseErrorObject] err
// A mongoose error like...
//
//  {
//    message: 'Note validation failed',
//    name: 'ValidationError',
//    errors:{
//      description:{
//        message: 'Path `description` is required.',
//        name: 'ValidatorError',
//        properties: [Object],
//        kind: 'required',
//        path: 'description',
//        value: ''
//      },
//      title:{
//        message: 'Path `name` is required.',
//        name: 'ValidatorError',
//        properties: [Object],
//        kind: 'required',
//        path: 'title',
//        value: ''
//      }
//    }
//  }
//
// ... or like ...
//
//  {
//    message: 'Cast to ObjectId failed for value "abc" at path "_id"',
//    name: 'CastError',
//    kind: 'ObjectId',
//    value: 'abc',
//    path: '_id',
//    reason: undefined
//  }
//
// @return [Array] errorMessages
exports.toMessages = function(err){
  var messages;
  switch (err.name) {
    case "ValidationError":
      var errors = err.errors;
      messages = Object.keys(errors).map(function(k) {
        return errors[k].name+': '+errors[k].path+' is '+errors[k].kind //> ValidatorError: description is required
      }); //> ["ValidatorError: description is required", "ValidatorError: title is required"]
      break;
    case "CastError":
      messages = ["Sorry, couldn't find a record with that identifier..."];
      break;
    default:
      messages = ["Oops, encountered an unexpected database error..."];
  };
  console.log(messages);
  return messages;
};
