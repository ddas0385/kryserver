'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Templatetype = mongoose.model('TemplateType'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Templatetype
 */
exports.create = function(req, res) {
  var templatetype = new Templatetype(req.body);
  templatetype.User = req.user;

  templatetype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(templatetype);
    }
  });
};

/**
 * Show the current Templatetype
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var templatetype = req.templatetype ? req.templatetype.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  templatetype.isCurrentUserOwner = req.user && templatetype.User && templatetype.User._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(templatetype);
};

/**
 * Update a Templatetype
 */
exports.update = function(req, res) {
  var templatetype = req.templatetype ;

  templatetype = _.extend(templatetype , req.body);

  templatetype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(templatetype);
    }
  });
};

/**
 * Delete an Templatetype
 */
exports.delete = function(req, res) {
  var templatetype = req.templatetype ;

  templatetype.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(templatetype);
    }
  });
};

/**
 * List of Templatetypes
 */
exports.list = function(req, res) { 
  Templatetype.find().sort('Name').populate('User', 'displayName').exec(function(err, templatetypes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(templatetypes);
    }
  });
};

/**
 * Templatetype middleware
 */
exports.templatetypeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Templatetype is invalid'
    });
  }

  Templatetype.findById(id).populate('User', '_id, displayName').exec(function (err, templatetype) {
    if (err) {
      return next(err);
    } else if (!templatetype) {
      return res.status(404).send({
        message: 'No Templatetype with that identifier has been found'
      });
    }
    req.templatetype = templatetype;
    next();
  });
};
