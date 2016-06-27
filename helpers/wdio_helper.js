module.exports = {};

module.exports.getIndex = function(){
  console.log("GET INDEX PAGE");
  client.click(selector);
  return Promise.resolve()
}


module.exports.clickEdit = function(){
  console.log("CLICK EDIT PAGE");
};

module.exports.clickSubmit = function(){
  console.log("CLICK SUBMIT")
};

// Revise form values.
// @params [Object] revisedValues keys must match form input names
// @example reviseFormValues({robotName: "CobblerBot 123"})
// @example reviseFormValues({robotName: "CobblerBot 123", robotDescription: "Makes the shoes."})
module.exports.reviseFormValues = function(revisedValues){
  console.log("REVISE FORM VALUES", revisedValues)
};

//
// EXPECTATIONS
//

module.exports.expectURL = function(expectedURL){
  console.log("EXPECT URL", expectedURL)
};

module.exports.expectTableRowValues = function (expectedValues) {
  console.log("EXPECT TABLE ROW VALUES")
  //return driver.findElement(By.css('tbody tr')).then(function(element){
  //  element.getText().then(function(rowText){
  //    Object.values(revisedValues).forEach(function(revVal){
  //      expect(rowText).toInclude(revVal)
  //    })
  //  })
  //});
};
