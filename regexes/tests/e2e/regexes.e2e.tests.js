'use strict';

describe('Regexes E2E Tests:', function () {
  describe('Test Regexes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/regexes');
      expect(element.all(by.repeater('regex in regexes')).count()).toEqual(0);
    });
  });
});
