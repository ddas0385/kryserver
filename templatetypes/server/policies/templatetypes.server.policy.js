'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Templatetypes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/templatetypes',
      permissions: '*'
    }, {
      resources: '/api/templatetypes/:templatetypeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/templatetypes',
      permissions: ['get', 'post']
    }, {
      resources: '/api/templatetypes/:templatetypeId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/templatetypes',
      permissions: ['get']
    }, {
      resources: '/api/templatetypes/:templatetypeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Templatetypes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Templatetype is being processed and the current user created it then allow any manipulation
  if (req.templatetype && req.user && req.templatetype.user && req.templatetype.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
