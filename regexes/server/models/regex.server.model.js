'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

/**
 * Regex Schema
 */
var RegexSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    min: 1  
  },
  Type: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  PlaceHolder: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Expression: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Weight: {
    type: Number,
    required: true,
    unique: true,
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
    collection: 'Regex',
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  });

RegexSchema.path('Type', {
  set : function(Type) {
    this.PlaceHolder = Type;
    return Type;
  }
});

RegexSchema.plugin(autoIncrement.plugin, {
  model: 'Regex',
  field: 'ID',
  startAt: 1,
  incrementBy: 1
});

var Regex = mongoose.model('Regex', RegexSchema);