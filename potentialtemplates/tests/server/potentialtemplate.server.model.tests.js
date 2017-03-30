'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Potentialtemplate = mongoose.model('Potentialtemplate');

/**
 * Globals
 */
var user;
var potentialtemplate;

/**
 * Unit tests
 */
describe('Potentialtemplate Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      potentialtemplate = new Potentialtemplate({
        name: 'Potentialtemplate Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return potentialtemplate.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      potentialtemplate.name = '';

      return potentialtemplate.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Potentialtemplate.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
