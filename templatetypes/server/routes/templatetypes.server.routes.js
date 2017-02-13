'use strict';

/**
 * Module dependencies
 */
var templatetypesPolicy = require('../policies/templatetypes.server.policy'),
  templatetypes = require('../controllers/templatetypes.server.controller');

module.exports = function(app) {
  // Templatetypes Routes
  app.route('/api/templatetypes').all(templatetypesPolicy.isAllowed)
    .get(templatetypes.list)
    .post(templatetypes.create);

  app.route('/api/templatetypes/:templatetypeId').all(templatetypesPolicy.isAllowed)
    .get(templatetypes.read)
    .put(templatetypes.update)
    .delete(templatetypes.delete);

  // Finish by binding the Templatetype middleware
  app.param('templatetypeId', templatetypes.templatetypeByID);
};
