var expect = require('expect');

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      expect([1,2,3].indexOf(5)).toEqual(-1)
      expect([1,2,3].indexOf(0)).toEqual(-1)
      //expect("fun").toExist()
      //expect("fun").toEqual("fun")
      //expect(1).toEqual(1)
      //expect(1 + 1).toEqual(2)
      //expect([1,2,3]).toInclude(3)
    });
  });
});

describe("Form", function(){
  context("when visited", function(){
    it("should contain empty input values", function(){
      expect(1).toEqual(2)
    })
  })
})
