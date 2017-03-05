'use strict';

describe('Fcms E2E Tests:', function () {
  describe('Test Fcms page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/fcms');
      expect(element.all(by.repeater('fcm in fcms')).count()).toEqual(0);
    });
  });
});
