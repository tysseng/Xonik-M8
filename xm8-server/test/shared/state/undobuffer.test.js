var expect = require('chai').expect;
var undobuffer = require('../../../shared/state/undobuffer');

describe('Undobuffer', function() {
  describe('push', function () {
    it('should create a new buffer if one does not exist', function () {

      // act
      undobuffer.push("new group", "some description", "a value");

      var newGroup = undobuffer.buffer("new group");

      // assert
      expect(newGroup).to.not.be.undefined;
      expect(newGroup.contents).to.not.be.undefined;
      expect(newGroup.position).to.be(0);
    });
  });
});