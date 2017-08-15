'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

/**
 * Potentialtemplatemapping Schema
 */
var PotentialTemplateMappingSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    min: 1
  },
  PotentialTemplate: {
    type: Schema.ObjectId,
    ref: 'PotentialTemplate',
    required: true
  },
  SenderID: {
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
    collection: 'PotentialTemplateMapping',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  });

PotentialTemplateMappingSchema.plugin(autoIncrement.plugin, {
  model: 'PotentialTemplateMapping',
  field: 'ID',
  startAt: 1,
  incrementBy: 1
});

mongoose.model('PotentialTemplateMapping', PotentialTemplateMappingSchema);
