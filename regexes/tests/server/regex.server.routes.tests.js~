'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Regex = mongoose.model('Regex'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, regex;

/**
 * Regex routes tests
 */
describe('Regex CRUD tests', function () {

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

    // Save a user to the test db and create new Regex
    user.save(function () {
      regex = {
        name: 'Regex name'
      };

      done();
    });
  });

  it('should be able to save a Regex if logged in', function (done) {
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

        // Save a new Regex
        agent.post('/api/regexes')
          .send(regex)
          .expect(200)
          .end(function (regexSaveErr, regexSaveRes) {
            // Handle Regex save error
            if (regexSaveErr) {
              return done(regexSaveErr);
            }

            // Get a list of Regexes
            agent.get('/api/regexes')
              .end(function (regexsGetErr, regexsGetRes) {
                // Handle Regex save error
                if (regexsGetErr) {
                  return done(regexsGetErr);
                }

                // Get Regexes list
                var regexes = regexsGetRes.body;

                // Set assertions
                (regexes[0].user._id).should.equal(userId);
                (regexes[0].name).should.match('Regex name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Regex if not logged in', function (done) {
    agent.post('/api/regexes')
      .send(regex)
      .expect(403)
      .end(function (regexSaveErr, regexSaveRes) {
        // Call the assertion callback
        done(regexSaveErr);
      });
  });

  it('should not be able to save an Regex if no name is provided', function (done) {
    // Invalidate name field
    regex.name = '';

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

        // Save a new Regex
        agent.post('/api/regexes')
          .send(regex)
          .expect(400)
          .end(function (regexSaveErr, regexSaveRes) {
            // Set message assertion
            (regexSaveRes.body.message).should.match('Please fill Regex name');

            // Handle Regex save error
            done(regexSaveErr);
          });
      });
  });

  it('should be able to update an Regex if signed in', function (done) {
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

        // Save a new Regex
        agent.post('/api/regexes')
          .send(regex)
          .expect(200)
          .end(function (regexSaveErr, regexSaveRes) {
            // Handle Regex save error
            if (regexSaveErr) {
              return done(regexSaveErr);
            }

            // Update Regex name
            regex.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Regex
            agent.put('/api/regexes/' + regexSaveRes.body._id)
              .send(regex)
              .expect(200)
              .end(function (regexUpdateErr, regexUpdateRes) {
                // Handle Regex update error
                if (regexUpdateErr) {
                  return done(regexUpdateErr);
                }

                // Set assertions
                (regexUpdateRes.body._id).should.equal(regexSaveRes.body._id);
                (regexUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Regexes if not signed in', function (done) {
    // Create new Regex model instance
    var regexObj = new Regex(regex);

    // Save the regex
    regexObj.save(function () {
      // Request Regexes
      request(app).get('/api/regexes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Regex if not signed in', function (done) {
    // Create new Regex model instance
    var regexObj = new Regex(regex);

    // Save the Regex
    regexObj.save(function () {
      request(app).get('/api/regexes/' + regexObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', regex.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Regex with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/regexes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Regex is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Regex which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Regex
    request(app).get('/api/regexes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Regex with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Regex if signed in', function (done) {
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

        // Save a new Regex
        agent.post('/api/regexes')
          .send(regex)
          .expect(200)
          .end(function (regexSaveErr, regexSaveRes) {
            // Handle Regex save error
            if (regexSaveErr) {
              return done(regexSaveErr);
            }

            // Delete an existing Regex
            agent.delete('/api/regexes/' + regexSaveRes.body._id)
              .send(regex)
              .expect(200)
              .end(function (regexDeleteErr, regexDeleteRes) {
                // Handle regex error error
                if (regexDeleteErr) {
                  return done(regexDeleteErr);
                }

                // Set assertions
                (regexDeleteRes.body._id).should.equal(regexSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Regex if not signed in', function (done) {
    // Set Regex user
    regex.user = user;

    // Create new Regex model instance
    var regexObj = new Regex(regex);

    // Save the Regex
    regexObj.save(function () {
      // Try deleting Regex
      request(app).delete('/api/regexes/' + regexObj._id)
        .expect(403)
        .end(function (regexDeleteErr, regexDeleteRes) {
          // Set message assertion
          (regexDeleteRes.body.message).should.match('User is not authorized');

          // Handle Regex error error
          done(regexDeleteErr);
        });

    });
  });

  it('should be able to get a single Regex that has an orphaned user reference', function (done) {
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

          // Save a new Regex
          agent.post('/api/regexes')
            .send(regex)
            .expect(200)
            .end(function (regexSaveErr, regexSaveRes) {
              // Handle Regex save error
              if (regexSaveErr) {
                return done(regexSaveErr);
              }

              // Set assertions on new Regex
              (regexSaveRes.body.name).should.equal(regex.name);
              should.exist(regexSaveRes.body.user);
              should.equal(regexSaveRes.body.user._id, orphanId);

              // force the Regex to have an orphaned user reference
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

                    // Get the Regex
                    agent.get('/api/regexes/' + regexSaveRes.body._id)
                      .expect(200)
                      .end(function (regexInfoErr, regexInfoRes) {
                        // Handle Regex error
                        if (regexInfoErr) {
                          return done(regexInfoErr);
                        }

                        // Set assertions
                        (regexInfoRes.body._id).should.equal(regexSaveRes.body._id);
                        (regexInfoRes.body.name).should.equal(regex.name);
                        should.equal(regexInfoRes.body.user, undefined);

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
      Regex.remove().exec(done);
    });
  });
});
