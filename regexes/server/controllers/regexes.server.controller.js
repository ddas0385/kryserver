'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Regex = mongoose.model('Regex'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Regex
 */
exports.create = function(req, res) {
  var regex = new Regex(req.body);
  regex.User = req.user;

  regex.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(regex);
    }
  });
};

/**
 * Show the current Regex
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var regex = req.regex ? req.regex.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  regex.isCurrentUserOwner = req.user && regex.User && regex.User._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(regex);
};

/**
 * Update a Regex
 */
exports.update = function(req, res) {
  var regex = req.regex ;

  regex = _.extend(regex , req.body);
  regex.PlaceHolder = req.body.Type;    

  regex.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(regex);
    }
  });
};

/**
 * Delete an Regex
 */
exports.delete = function(req, res) {
  var regex = req.regex ;

  regex.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(regex);
    }
  });
};

/**
 * List of Regexes
 */
exports.list = function(req, res) { 
  Regex.find().sort('-Weight').populate('User', 'displayName').exec(function(err, regexes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(regexes);
    }
  });
};

/**
 * Regex middleware
 */
exports.regexByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Regex is invalid'
    });
  }

  Regex.findById(id).populate('User', '_id, displayName').exec(function (err, regex) {
    if (err) {
      return next(err);
    } else if (!regex) {
      return res.status(404).send({
        message: 'No Regex with that identifier has been found'
      });
    }
    req.regex = regex;
    next();
  });
};
