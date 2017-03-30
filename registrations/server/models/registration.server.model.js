'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

/**
 * Registration Schema
 */
var RegistrationSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    min: 1
  },
  Token: {
    type: String,
    required: true,
    trim: true
  },
  User: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  },
  Version: {
    type: Number
  }
},
  {
    collection: 'Registration',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  });

RegistrationSchema.plugin(autoIncrement.plugin, {
  model: 'Registration',
  field: 'ID',
  startAt: 1,
  incrementBy: 1
});

mongoose.model('Registration', RegistrationSchema);
