'use strict';

describe('Templatetypes E2E Tests:', function () {
  describe('Test Templatetypes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/templatetypes');
      expect(element.all(by.repeater('templatetype in templatetypes')).count()).toEqual(0);
    });
  });
});
