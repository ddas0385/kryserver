'use strict';

/**
 * Module dependencies
 */
var potentialtemplatesPolicy = require('../policies/potentialtemplates.server.policy'),
  potentialtemplates = require('../controllers/potentialtemplates.server.controller');

module.exports = function(app) {
  // Potentialtemplates Routes
  app.route('/api/potentialtemplates').all(potentialtemplatesPolicy.isAllowed)
    .get(potentialtemplates.list)
    .post(potentialtemplates.create);

  app.route('/api/potentialtemplates/:potentialtemplateId').all(potentialtemplatesPolicy.isAllowed)
    .get(potentialtemplates.read)
    .put(potentialtemplates.update)
    .delete(potentialtemplates.delete);

  // Finish by binding the Potentialtemplate middleware
  app.param('potentialtemplateId', potentialtemplates.potentialtemplateByID);
};
