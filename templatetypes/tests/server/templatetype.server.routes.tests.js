'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Templatetype = mongoose.model('Templatetype'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app;
var agent;
var credentials;
var user;
var templatetype;

/**
 * Templatetype routes tests
 */
describe('Templatetype CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Templatetype
    user.save(function () {
      templatetype = {
        name: 'Templatetype name'
      };

      done();
    });
  });

  it('should be able to save a Templatetype if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Templatetype
        agent.post('/api/templatetypes')
          .send(templatetype)
          .expect(200)
          .end(function (templatetypeSaveErr, templatetypeSaveRes) {
            // Handle Templatetype save error
            if (templatetypeSaveErr) {
              return done(templatetypeSaveErr);
            }

            // Get a list of Templatetypes
            agent.get('/api/templatetypes')
              .end(function (templatetypesGetErr, templatetypesGetRes) {
                // Handle Templatetype save error
                if (templatetypesGetErr) {
                  return done(templatetypesGetErr);
                }

                // Get Templatetypes list
                var templatetypes = templatetypesGetRes.body;

                // Set assertions
                (templatetypes[0].user._id).should.equal(userId);
                (templatetypes[0].name).should.match('Templatetype name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Templatetype if not logged in', function (done) {
    agent.post('/api/templatetypes')
      .send(templatetype)
      .expect(403)
      .end(function (templatetypeSaveErr, templatetypeSaveRes) {
        // Call the assertion callback
        done(templatetypeSaveErr);
      });
  });

  it('should not be able to save an Templatetype if no name is provided', function (done) {
    // Invalidate name field
    templatetype.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Templatetype
        agent.post('/api/templatetypes')
          .send(templatetype)
          .expect(400)
          .end(function (templatetypeSaveErr, templatetypeSaveRes) {
            // Set message assertion
            (templatetypeSaveRes.body.message).should.match('Please fill Templatetype name');

            // Handle Templatetype save error
            done(templatetypeSaveErr);
          });
      });
  });

  it('should be able to update an Templatetype if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Templatetype
        agent.post('/api/templatetypes')
          .send(templatetype)
          .expect(200)
          .end(function (templatetypeSaveErr, templatetypeSaveRes) {
            // Handle Templatetype save error
            if (templatetypeSaveErr) {
              return done(templatetypeSaveErr);
            }

            // Update Templatetype name
            templatetype.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Templatetype
            agent.put('/api/templatetypes/' + templatetypeSaveRes.body._id)
              .send(templatetype)
              .expect(200)
              .end(function (templatetypeUpdateErr, templatetypeUpdateRes) {
                // Handle Templatetype update error
                if (templatetypeUpdateErr) {
                  return done(templatetypeUpdateErr);
                }

                // Set assertions
                (templatetypeUpdateRes.body._id).should.equal(templatetypeSaveRes.body._id);
                (templatetypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Templatetypes if not signed in', function (done) {
    // Create new Templatetype model instance
    var templatetypeObj = new Templatetype(templatetype);

    // Save the templatetype
    templatetypeObj.save(function () {
      // Request Templatetypes
      request(app).get('/api/templatetypes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Templatetype if not signed in', function (done) {
    // Create new Templatetype model instance
    var templatetypeObj = new Templatetype(templatetype);

    // Save the Templatetype
    templatetypeObj.save(function () {
      request(app).get('/api/templatetypes/' + templatetypeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', templatetype.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Templatetype with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/templatetypes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Templatetype is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Templatetype which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Templatetype
    request(app).get('/api/templatetypes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Templatetype with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Templatetype if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Templatetype
        agent.post('/api/templatetypes')
          .send(templatetype)
          .expect(200)
          .end(function (templatetypeSaveErr, templatetypeSaveRes) {
            // Handle Templatetype save error
            if (templatetypeSaveErr) {
              return done(templatetypeSaveErr);
            }

            // Delete an existing Templatetype
            agent.delete('/api/templatetypes/' + templatetypeSaveRes.body._id)
              .send(templatetype)
              .expect(200)
              .end(function (templatetypeDeleteErr, templatetypeDeleteRes) {
                // Handle templatetype error error
                if (templatetypeDeleteErr) {
                  return done(templatetypeDeleteErr);
                }

                // Set assertions
                (templatetypeDeleteRes.body._id).should.equal(templatetypeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Templatetype if not signed in', function (done) {
    // Set Templatetype user
    templatetype.user = user;

    // Create new Templatetype model instance
    var templatetypeObj = new Templatetype(templatetype);

    // Save the Templatetype
    templatetypeObj.save(function () {
      // Try deleting Templatetype
      request(app).delete('/api/templatetypes/' + templatetypeObj._id)
        .expect(403)
        .end(function (templatetypeDeleteErr, templatetypeDeleteRes) {
          // Set message assertion
          (templatetypeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Templatetype error error
          done(templatetypeDeleteErr);
        });

    });
  });

  it('should be able to get a single Templatetype that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Templatetype
          agent.post('/api/templatetypes')
            .send(templatetype)
            .expect(200)
            .end(function (templatetypeSaveErr, templatetypeSaveRes) {
              // Handle Templatetype save error
              if (templatetypeSaveErr) {
                return done(templatetypeSaveErr);
              }

              // Set assertions on new Templatetype
              (templatetypeSaveRes.body.name).should.equal(templatetype.name);
              should.exist(templatetypeSaveRes.body.user);
              should.equal(templatetypeSaveRes.body.user._id, orphanId);

              // force the Templatetype to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Templatetype
                    agent.get('/api/templatetypes/' + templatetypeSaveRes.body._id)
                      .expect(200)
                      .end(function (templatetypeInfoErr, templatetypeInfoRes) {
                        // Handle Templatetype error
                        if (templatetypeInfoErr) {
                          return done(templatetypeInfoErr);
                        }

                        // Set assertions
                        (templatetypeInfoRes.body._id).should.equal(templatetypeSaveRes.body._id);
                        (templatetypeInfoRes.body.name).should.equal(templatetype.name);
                        should.equal(templatetypeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Templatetype.remove().exec(done);
    });
  });
});
