'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Potentialtemplate = mongoose.model('Potentialtemplate'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app;
var agent;
var credentials;
var user;
var potentialtemplate;

/**
 * Potentialtemplate routes tests
 */
describe('Potentialtemplate CRUD tests', function () {

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

    // Save a user to the test db and create new Potentialtemplate
    user.save(function () {
      potentialtemplate = {
        name: 'Potentialtemplate name'
      };

      done();
    });
  });

  it('should be able to save a Potentialtemplate if logged in', function (done) {
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

        // Save a new Potentialtemplate
        agent.post('/api/potentialtemplates')
          .send(potentialtemplate)
          .expect(200)
          .end(function (potentialtemplateSaveErr, potentialtemplateSaveRes) {
            // Handle Potentialtemplate save error
            if (potentialtemplateSaveErr) {
              return done(potentialtemplateSaveErr);
            }

            // Get a list of Potentialtemplates
            agent.get('/api/potentialtemplates')
              .end(function (potentialtemplatesGetErr, potentialtemplatesGetRes) {
                // Handle Potentialtemplate save error
                if (potentialtemplatesGetErr) {
                  return done(potentialtemplatesGetErr);
                }

                // Get Potentialtemplates list
                var potentialtemplates = potentialtemplatesGetRes.body;

                // Set assertions
                (potentialtemplates[0].user._id).should.equal(userId);
                (potentialtemplates[0].name).should.match('Potentialtemplate name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Potentialtemplate if not logged in', function (done) {
    agent.post('/api/potentialtemplates')
      .send(potentialtemplate)
      .expect(403)
      .end(function (potentialtemplateSaveErr, potentialtemplateSaveRes) {
        // Call the assertion callback
        done(potentialtemplateSaveErr);
      });
  });

  it('should not be able to save an Potentialtemplate if no name is provided', function (done) {
    // Invalidate name field
    potentialtemplate.name = '';

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

        // Save a new Potentialtemplate
        agent.post('/api/potentialtemplates')
          .send(potentialtemplate)
          .expect(400)
          .end(function (potentialtemplateSaveErr, potentialtemplateSaveRes) {
            // Set message assertion
            (potentialtemplateSaveRes.body.message).should.match('Please fill Potentialtemplate name');

            // Handle Potentialtemplate save error
            done(potentialtemplateSaveErr);
          });
      });
  });

  it('should be able to update an Potentialtemplate if signed in', function (done) {
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

        // Save a new Potentialtemplate
        agent.post('/api/potentialtemplates')
          .send(potentialtemplate)
          .expect(200)
          .end(function (potentialtemplateSaveErr, potentialtemplateSaveRes) {
            // Handle Potentialtemplate save error
            if (potentialtemplateSaveErr) {
              return done(potentialtemplateSaveErr);
            }

            // Update Potentialtemplate name
            potentialtemplate.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Potentialtemplate
            agent.put('/api/potentialtemplates/' + potentialtemplateSaveRes.body._id)
              .send(potentialtemplate)
              .expect(200)
              .end(function (potentialtemplateUpdateErr, potentialtemplateUpdateRes) {
                // Handle Potentialtemplate update error
                if (potentialtemplateUpdateErr) {
                  return done(potentialtemplateUpdateErr);
                }

                // Set assertions
                (potentialtemplateUpdateRes.body._id).should.equal(potentialtemplateSaveRes.body._id);
                (potentialtemplateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Potentialtemplates if not signed in', function (done) {
    // Create new Potentialtemplate model instance
    var potentialtemplateObj = new Potentialtemplate(potentialtemplate);

    // Save the potentialtemplate
    potentialtemplateObj.save(function () {
      // Request Potentialtemplates
      request(app).get('/api/potentialtemplates')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Potentialtemplate if not signed in', function (done) {
    // Create new Potentialtemplate model instance
    var potentialtemplateObj = new Potentialtemplate(potentialtemplate);

    // Save the Potentialtemplate
    potentialtemplateObj.save(function () {
      request(app).get('/api/potentialtemplates/' + potentialtemplateObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', potentialtemplate.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Potentialtemplate with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/potentialtemplates/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Potentialtemplate is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Potentialtemplate which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Potentialtemplate
    request(app).get('/api/potentialtemplates/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Potentialtemplate with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Potentialtemplate if signed in', function (done) {
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

        // Save a new Potentialtemplate
        agent.post('/api/potentialtemplates')
          .send(potentialtemplate)
          .expect(200)
          .end(function (potentialtemplateSaveErr, potentialtemplateSaveRes) {
            // Handle Potentialtemplate save error
            if (potentialtemplateSaveErr) {
              return done(potentialtemplateSaveErr);
            }

            // Delete an existing Potentialtemplate
            agent.delete('/api/potentialtemplates/' + potentialtemplateSaveRes.body._id)
              .send(potentialtemplate)
              .expect(200)
              .end(function (potentialtemplateDeleteErr, potentialtemplateDeleteRes) {
                // Handle potentialtemplate error error
                if (potentialtemplateDeleteErr) {
                  return done(potentialtemplateDeleteErr);
                }

                // Set assertions
                (potentialtemplateDeleteRes.body._id).should.equal(potentialtemplateSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Potentialtemplate if not signed in', function (done) {
    // Set Potentialtemplate user
    potentialtemplate.user = user;

    // Create new Potentialtemplate model instance
    var potentialtemplateObj = new Potentialtemplate(potentialtemplate);

    // Save the Potentialtemplate
    potentialtemplateObj.save(function () {
      // Try deleting Potentialtemplate
      request(app).delete('/api/potentialtemplates/' + potentialtemplateObj._id)
        .expect(403)
        .end(function (potentialtemplateDeleteErr, potentialtemplateDeleteRes) {
          // Set message assertion
          (potentialtemplateDeleteRes.body.message).should.match('User is not authorized');

          // Handle Potentialtemplate error error
          done(potentialtemplateDeleteErr);
        });

    });
  });

  it('should be able to get a single Potentialtemplate that has an orphaned user reference', function (done) {
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

          // Save a new Potentialtemplate
          agent.post('/api/potentialtemplates')
            .send(potentialtemplate)
            .expect(200)
            .end(function (potentialtemplateSaveErr, potentialtemplateSaveRes) {
              // Handle Potentialtemplate save error
              if (potentialtemplateSaveErr) {
                return done(potentialtemplateSaveErr);
              }

              // Set assertions on new Potentialtemplate
              (potentialtemplateSaveRes.body.name).should.equal(potentialtemplate.name);
              should.exist(potentialtemplateSaveRes.body.user);
              should.equal(potentialtemplateSaveRes.body.user._id, orphanId);

              // force the Potentialtemplate to have an orphaned user reference
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

                    // Get the Potentialtemplate
                    agent.get('/api/potentialtemplates/' + potentialtemplateSaveRes.body._id)
                      .expect(200)
                      .end(function (potentialtemplateInfoErr, potentialtemplateInfoRes) {
                        // Handle Potentialtemplate error
                        if (potentialtemplateInfoErr) {
                          return done(potentialtemplateInfoErr);
                        }

                        // Set assertions
                        (potentialtemplateInfoRes.body._id).should.equal(potentialtemplateSaveRes.body._id);
                        (potentialtemplateInfoRes.body.name).should.equal(potentialtemplate.name);
                        should.equal(potentialtemplateInfoRes.body.user, undefined);

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
      Potentialtemplate.remove().exec(done);
    });
  });
});
