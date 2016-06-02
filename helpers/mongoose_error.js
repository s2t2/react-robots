var exports = module.exports = {};

// Transform mongoose error object into error message(s).
//
// @param [ValidationError] err A mongoose error like...
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
// @return [Array] error_messages
exports.toMessages = function(err){
    if (err.name == "ValidationError") {
      var errors = err.errors
      var error_messages = Object.keys(errors).map(function(k) {
          var error = errors[k]
          return error.name+': '+error.path+' is '+error.kind //> ValidatorError: description is required
      });
    } else if (err.name == "CastError") {
        var error_messages = ["Sorry, couldn't find a robot with that identifier..."]
    } else {
        var error_messages = ["Oops, something unexpected has happened..."]
    };

    return error_messages //> ["ValidatorError: description is required", "ValidatorError: title is required"]
};
