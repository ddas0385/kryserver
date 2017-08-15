'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Potentialtemplatemapping = mongoose.model('PotentialTemplateMapping'),
  Potentialtemplate = mongoose.model('PotentialTemplate'),
  Template = mongoose.model('Template'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Function to Save Potential Template Mapping
 * @param potentialtemplate
 * @param req
 * @param res
 * @param callback
 * @returns
 */
function savePotentialTemplateMapping(potentialtemplate, req, res, callback) {
  var potentialtemplatemapping = new Potentialtemplatemapping();
  potentialtemplatemapping.PotentialTemplate = potentialtemplate;
  potentialtemplatemapping.SenderID = req.headers.senderid;
  potentialtemplatemapping.User = req.user;

  potentialtemplatemapping.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    var potentialtemplatetemp = potentialtemplate.toJSON();
    potentialtemplate.getCount(function(count) {
      potentialtemplatetemp.Count = count;
      callback({ 'PotentialTemplate': potentialtemplatetemp });
    });
  });
}

/**
 * Function to Process Individual Potential Templates
 * @param potentialtemplate
 * @param req
 * @param res
 * @returns
 */
function processPotentialTemplate(potentialtemplate, req, res, callback) {
  Template.find({ 'Info': potentialtemplate.Info, 'AddressInfo': potentialtemplate.AddressInfo }).exec(function(err, resultsTemplate) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    if (resultsTemplate.length === 0) {
      Potentialtemplate.find({ 'Info': potentialtemplate.Info, 'AddressInfo': potentialtemplate.AddressInfo }).exec(function(err, resultsPotentialTemplate) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }

        if (resultsPotentialTemplate.length === 0) {
          var potentialtemplatetoSave = new Potentialtemplate(potentialtemplate);
          potentialtemplatetoSave.User = req.user;

          potentialtemplatetoSave.save(function(err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            }
            savePotentialTemplateMapping(potentialtemplatetoSave, req, res, callback);
          });
        } else {
          savePotentialTemplateMapping(resultsPotentialTemplate[0], req, res, callback);
        }
      });
    } else {
      callback({ 'Template': resultsTemplate[0] });
    }
  });
}

/**
 * Create a Potentialtemplate
 */
exports.create = function(req, res) {
  // TODO : Remove Sender ID
  // req.headers.senderid = 1234;
  if (Array.isArray(req.body)) {
    var responseArray = [],
      requestLength = req.body.length;

    for (var i = 0; i < req.body.length; i++) {
      (function(i) {
        processPotentialTemplate(req.body[i], req, res, function(result) {
          responseArray.push(result);
          requestLength--;

          if (requestLength <= 0) {
            res.jsonp(responseArray);
          }
        });
      }(i));
    }
  } else {
    processPotentialTemplate(req.body, req, res, function(result) {
      res.jsonp(result);
    });
  }
};

/**
 * Show the current Potentialtemplate
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var potentialtemplate = req.potentialtemplate ? req.potentialtemplate.toJSON() : {};
  req.potentialtemplate.getCount(function(count) {
    potentialtemplate.Count = count;


    // Add a custom field to the Article, for determining if the current User is
	// the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist
	// in the Article model.
    // potentialtemplate.isCurrentUserOwner = req.user && potentialtemplate.User
	// && potentialtemplate.User._id.toString() === req.user._id.toString() ?
	// true : false;
    potentialtemplate.isCurrentUserOwner = req.user && potentialtemplate.User && potentialtemplate.User._id.toString() === req.user._id.toString();

    res.jsonp(potentialtemplate);
  });
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
  Potentialtemplate.find().populate('User', 'displayName').exec(function(err, potentialtemplates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var results = [];
      var docscount = potentialtemplates.length;
      potentialtemplates.forEach(function(item, index) {
        item.getCount(function(count) {
          results[index] = item.toJSON();
          results[index].Count = count;
          docscount--;

          if (docscount <= 0) {
            results.sort(function(item1, item2) {
              if (item1.Score > item2.Score) {
                return -1;
              } else if (item2.Score > item1.Score) {
                return 1;
              } else {
                if (item1.Count > item2.Count) {
                  return -1;
                } else if (item2.Count > item1.Count) {
                  return 1;
                } else {
                  if (item1.UpdatedAt <= item2.UpdatedAt) {
                    return -1;
                  } else {
                    return 1;
                  }
                }
              }
            });
            res.jsonp(results);
          }
        });
      });
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
