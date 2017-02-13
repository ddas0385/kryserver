'use strict';

/**
 * Module dependencies
 */
var regexesPolicy = require('../policies/regexes.server.policy'),
  regexes = require('../controllers/regexes.server.controller');

module.exports = function(app) {
  // Regexes Routes
  app.route('/api/regexes').all(regexesPolicy.isAllowed)
    .get(regexes.list)
    .post(regexes.create);

  app.route('/api/regexes/:regexId').all(regexesPolicy.isAllowed)
    .get(regexes.read)
    .put(regexes.update)
    .delete(regexes.delete);

  // Finish by binding the Regex middleware
  app.param('regexId', regexes.regexByID);
};
