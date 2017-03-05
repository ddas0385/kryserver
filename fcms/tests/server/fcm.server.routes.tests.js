'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Fcm = mongoose.model('Fcm'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, fcm;

/**
 * Fcm routes tests
 */
describe('Fcm CRUD tests', function () {

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

    // Save a user to the test db and create new Fcm
    user.save(function () {
      fcm = {
        name: 'Fcm name'
      };

      done();
    });
  });

  it('should be able to save a Fcm if logged in', function (done) {
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

        // Save a new Fcm
        agent.post('/api/fcms')
          .send(fcm)
          .expect(200)
          .end(function (fcmSaveErr, fcmSaveRes) {
            // Handle Fcm save error
            if (fcmSaveErr) {
              return done(fcmSaveErr);
            }

            // Get a list of Fcms
            agent.get('/api/fcms')
              .end(function (fcmsGetErr, fcmsGetRes) {
                // Handle Fcm save error
                if (fcmsGetErr) {
                  return done(fcmsGetErr);
                }

                // Get Fcms list
                var fcms = fcmsGetRes.body;

                // Set assertions
                (fcms[0].user._id).should.equal(userId);
                (fcms[0].name).should.match('Fcm name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Fcm if not logged in', function (done) {
    agent.post('/api/fcms')
      .send(fcm)
      .expect(403)
      .end(function (fcmSaveErr, fcmSaveRes) {
        // Call the assertion callback
        done(fcmSaveErr);
      });
  });

  it('should not be able to save an Fcm if no name is provided', function (done) {
    // Invalidate name field
    fcm.name = '';

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

        // Save a new Fcm
        agent.post('/api/fcms')
          .send(fcm)
          .expect(400)
          .end(function (fcmSaveErr, fcmSaveRes) {
            // Set message assertion
            (fcmSaveRes.body.message).should.match('Please fill Fcm name');

            // Handle Fcm save error
            done(fcmSaveErr);
          });
      });
  });

  it('should be able to update an Fcm if signed in', function (done) {
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

        // Save a new Fcm
        agent.post('/api/fcms')
          .send(fcm)
          .expect(200)
          .end(function (fcmSaveErr, fcmSaveRes) {
            // Handle Fcm save error
            if (fcmSaveErr) {
              return done(fcmSaveErr);
            }

            // Update Fcm name
            fcm.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Fcm
            agent.put('/api/fcms/' + fcmSaveRes.body._id)
              .send(fcm)
              .expect(200)
              .end(function (fcmUpdateErr, fcmUpdateRes) {
                // Handle Fcm update error
                if (fcmUpdateErr) {
                  return done(fcmUpdateErr);
                }

                // Set assertions
                (fcmUpdateRes.body._id).should.equal(fcmSaveRes.body._id);
                (fcmUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Fcms if not signed in', function (done) {
    // Create new Fcm model instance
    var fcmObj = new Fcm(fcm);

    // Save the fcm
    fcmObj.save(function () {
      // Request Fcms
      request(app).get('/api/fcms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Fcm if not signed in', function (done) {
    // Create new Fcm model instance
    var fcmObj = new Fcm(fcm);

    // Save the Fcm
    fcmObj.save(function () {
      request(app).get('/api/fcms/' + fcmObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', fcm.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Fcm with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/fcms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Fcm is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Fcm which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Fcm
    request(app).get('/api/fcms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Fcm with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Fcm if signed in', function (done) {
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

        // Save a new Fcm
        agent.post('/api/fcms')
          .send(fcm)
          .expect(200)
          .end(function (fcmSaveErr, fcmSaveRes) {
            // Handle Fcm save error
            if (fcmSaveErr) {
              return done(fcmSaveErr);
            }

            // Delete an existing Fcm
            agent.delete('/api/fcms/' + fcmSaveRes.body._id)
              .send(fcm)
              .expect(200)
              .end(function (fcmDeleteErr, fcmDeleteRes) {
                // Handle fcm error error
                if (fcmDeleteErr) {
                  return done(fcmDeleteErr);
                }

                // Set assertions
                (fcmDeleteRes.body._id).should.equal(fcmSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Fcm if not signed in', function (done) {
    // Set Fcm user
    fcm.user = user;

    // Create new Fcm model instance
    var fcmObj = new Fcm(fcm);

    // Save the Fcm
    fcmObj.save(function () {
      // Try deleting Fcm
      request(app).delete('/api/fcms/' + fcmObj._id)
        .expect(403)
        .end(function (fcmDeleteErr, fcmDeleteRes) {
          // Set message assertion
          (fcmDeleteRes.body.message).should.match('User is not authorized');

          // Handle Fcm error error
          done(fcmDeleteErr);
        });

    });
  });

  it('should be able to get a single Fcm that has an orphaned user reference', function (done) {
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

          // Save a new Fcm
          agent.post('/api/fcms')
            .send(fcm)
            .expect(200)
            .end(function (fcmSaveErr, fcmSaveRes) {
              // Handle Fcm save error
              if (fcmSaveErr) {
                return done(fcmSaveErr);
              }

              // Set assertions on new Fcm
              (fcmSaveRes.body.name).should.equal(fcm.name);
              should.exist(fcmSaveRes.body.user);
              should.equal(fcmSaveRes.body.user._id, orphanId);

              // force the Fcm to have an orphaned user reference
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

                    // Get the Fcm
                    agent.get('/api/fcms/' + fcmSaveRes.body._id)
                      .expect(200)
                      .end(function (fcmInfoErr, fcmInfoRes) {
                        // Handle Fcm error
                        if (fcmInfoErr) {
                          return done(fcmInfoErr);
                        }

                        // Set assertions
                        (fcmInfoRes.body._id).should.equal(fcmSaveRes.body._id);
                        (fcmInfoRes.body.name).should.equal(fcm.name);
                        should.equal(fcmInfoRes.body.user, undefined);

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
      Fcm.remove().exec(done);
    });
  });
});
