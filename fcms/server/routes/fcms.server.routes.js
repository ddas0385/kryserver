'use strict';

/**
 * Module dependencies
 */
var fcmsPolicy = require('../policies/fcms.server.policy'),
  fcms = require('../controllers/fcms.server.controller');

module.exports = function(app) {
  // Fcms Routes
  app.route('/api/fcms').all(fcmsPolicy.isAllowed)
    .get(fcms.list)
    .post(fcms.create);

  app.route('/api/fcms/:fcmId').all(fcmsPolicy.isAllowed)
    .get(fcms.read)
    .put(fcms.update)
    .delete(fcms.delete);

  // Finish by binding the Fcm middleware
  app.param('fcmId', fcms.fcmByID);
};
