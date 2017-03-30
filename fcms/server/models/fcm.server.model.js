'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

/**
 * Fcm Schema
 */
var FcmSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    min: 1
  },
  Name: {
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
    collection: 'Fcm',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  });

FcmSchema.plugin(autoIncrement.plugin, {
  model: 'Fcm',
  field: 'ID',
  startAt: 1,
  incrementBy: 1
});

mongoose.model('Fcm', FcmSchema);
