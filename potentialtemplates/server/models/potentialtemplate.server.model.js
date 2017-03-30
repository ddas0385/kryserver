'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);


/**
 * Potentialtemplate Schema
 */
var PotentialTemplateSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    min: 1
  },
  AddressInfo: {
    type: String,
    required: true,
    trim: true
  },
  Info: {
    type: String,
    required: true,
    trim: true
  },
  Score: {
    type: Number,
    required: true,
    min: 1
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
    collection: 'PotentialTemplate',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  });

PotentialTemplateSchema.plugin(autoIncrement.plugin, {
  model: 'PotentialTemplate',
  field: 'ID',
  startAt: 1,
  incrementBy: 1
});

mongoose.model('PotentialTemplate', PotentialTemplateSchema);
