'use strict';

describe('Potentialtemplates E2E Tests:', function () {
  describe('Test Potentialtemplates page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/potentialtemplates');
      expect(element.all(by.repeater('potentialtemplate in potentialtemplates')).count()).toEqual(0);
    });
  });
});
