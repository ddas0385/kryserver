'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

/**
 * Template Schema
 */
var TemplateSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    min: 1
  },
  TemplateType: {
    type: Schema.ObjectId,
    ref: 'TemplateType'
  },
  AddressInfo: {
    type: String,
    required: true,
    trim: true
  },
  AddressData: {
    type: String,
    required: true,
    trim: true
  },
  Info: {
    type: String,
    required: true,
    trim: true
  },
  Data: {
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
    collection: 'Template',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  });

TemplateSchema.plugin(autoIncrement.plugin, {
  model: 'Template',
  field: 'ID',
  startAt: 1,
  incrementBy: 1
});

mongoose.model('Template', TemplateSchema);
