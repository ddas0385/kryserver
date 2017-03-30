'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Potentialtemplate = mongoose.model('PotentialTemplate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Potentialtemplate
 */
exports.create = function(req, res) {
  var potentialtemplate = new Potentialtemplate(req.body);
  potentialtemplate.User = req.user;

  potentialtemplate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(potentialtemplate);
    }
  });
};

/**
 * Show the current Potentialtemplate
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var potentialtemplate = req.potentialtemplate ? req.potentialtemplate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  // potentialtemplate.isCurrentUserOwner = req.user && potentialtemplate.User && potentialtemplate.User._id.toString() === req.user._id.toString() ? true : false;
  potentialtemplate.isCurrentUserOwner = req.user && potentialtemplate.User && potentialtemplate.User._id.toString() === req.user._id.toString();

  res.jsonp(potentialtemplate);
};

/**
 * Update a Potentialtemplate
 */
exports.update = function(req, res) {
  var potentialtemplate = req.potentialtemplate;

  potentialtemplate = _.extend(potentialtemplate, req.body);

  potentialtemplate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(potentialtemplate);
    }
  });
};

/**
 * Delete an Potentialtemplate
 */
exports.delete = function(req, res) {
  var potentialtemplate = req.potentialtemplate;

  potentialtemplate.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(potentialtemplate);
    }
  });
};

/**
 * List of Potentialtemplates
 */
exports.list = function(req, res) {
  Potentialtemplate.find().sort('-Score').populate('User', 'displayName').exec(function(err, potentialtemplates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(potentialtemplates);
    }
  });
};

/**
 * Potentialtemplate middleware
 */
exports.potentialtemplateByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Potential Template is invalid'
    });
  }

  Potentialtemplate.findById(id).populate('User', '_id, displayName').exec(function (err, potentialtemplate) {
    if (err) {
      return next(err);
    } else if (!potentialtemplate) {
      return res.status(404).send({
        message: 'No Potential Template with that identifier has been found'
      });
    }
    req.potentialtemplate = potentialtemplate;
    next();
  });
};
