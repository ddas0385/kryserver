'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Fcm = mongoose.model('Fcm'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Fcm
 */
exports.create = function(req, res) {
  var fcm = new Fcm(req.body);
  
 
  var admin = require('firebase-admin');

  var serviceAccount = require('./firebase-kroy-firebase-adminsdk-6n7ei-1252d46b46.json');

  if(exports.app === undefined) 
  {
    exports.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://fir-kroy.firebaseio.com'
    });
  }

  // Send a message to devices subscribed to the provided topic.
  var fcmTopic = 'FinancialTopic';

  // See the "Defining the message payload" section below for details
  // on how to define a message payload.
  var payload = {
    data: {
      name: req.body.Name
    }
  };

  // Send a message to the devices corresponding to the provided
  // registration tokens.
  admin.messaging().sendToTopic(fcmTopic, payload)
    .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
      
      fcm.User = req.user;
      
      fcm.save(function(err) {
        if (err) { 
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(fcm);
        }
      });
    })
    .catch(function(error) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(error),
      });
    });
};

/**
 * Show the current Fcm
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var fcm = req.fcm ? req.fcm.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  fcm.isCurrentUserOwner = req.user && fcm.User && fcm.User._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(fcm);
};

/**
 * Update a Fcm
 */
exports.update = function(req, res) {
  var fcm = req.fcm ;

  fcm = _.extend(fcm , req.body);

  fcm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fcm);
    }
  });
};

/**
 * Delete an Fcm
 */
exports.delete = function(req, res) {
  var fcm = req.fcm ;

  fcm.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fcm);
    }
  });
};

/**
 * List of Fcms
 */
exports.list = function(req, res) {
  Fcm.find().sort('-created').populate('User', 'displayName').exec(function(err, fcms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fcms);
    }
  });
};

/**
 * Fcm middleware
 */
exports.fcmByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Fcm is invalid'
    });
  }

  Fcm.findById(id).populate('User', 'displayName').exec(function (err, fcm) {
    if (err) {
      return next(err);
    } else if (!fcm) {
      return res.status(404).send({
        message: 'No Fcm with that identifier has been found'
      });
    }
    req.fcm = fcm;
    next();
  });
};

function sendMessage(req, res)
{
  var admin = require('firebase-admin');

  var serviceAccount = require('./firebase-kroy-firebase-adminsdk-6n7ei-1252d46b46.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-kroy.firebaseio.com'
  });

  // Send a message to devices subscribed to the provided topic.
  var fcmTopic = '/topics/FinancialTopic';
    
  // See the "Defining the message payload" section below for details
  // on how to define a message payload.
  var payload = {
    data: {
      name: req.body.Name
    }
  };

  // Send a message to the devices corresponding to the provided
  // registration tokens.
  admin.messaging().sendToTopic(fcmTopic, payload)
    .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
      res.response = 1;
    })
    .catch(function(error) {
      res.response = '0';
      return res.status(400).send({
        message: errorHandler.getErrorMessage(error),
        
      });
    });
}
