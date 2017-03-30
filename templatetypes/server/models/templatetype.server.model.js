'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

/**
 * TemplateType Schema
 */
var TemplateTypeSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    min: 1
  },
  Name: {
    type: String,
    required: true,
    unique: true,
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
    collection: 'TemplateType',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  });

TemplateTypeSchema.plugin(autoIncrement.plugin, {
  model: 'TemplateType',
  field: 'ID',
  startAt: 1,
  incrementBy: 1
});

mongoose.model('TemplateType', TemplateTypeSchema);
