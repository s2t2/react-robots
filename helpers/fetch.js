// adapted from source: https://github.com/github/fetch#handling-http-error-statuses
// The response of a fetch() request is a Stream object,
// ... which means that when we call the json() method,
// ... a Promise is returned since the reading of the stream will happen asynchronously.
// ... - https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en

module.exports = {};

//
// REQUEST FUNCTIONS
//

// @params [Object] requestData a basic JSON object
module.exports.postRequestOptions = function(requestData){
  return {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  }
};

//
// RESPONSE FUNCTIONS
//

// @params [fetch Response] response
module.exports.checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
};

// @params [fetch Response] response
module.exports.parseJSON = function(response){
  return response.json();
};

// @params [Error] err a javascript error containing a fetch Response
module.exports.parseError = function(err){
  return err.response.json();
};
