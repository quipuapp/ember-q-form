import Ember from 'ember';
import layout from '../templates/components/form-for';

const { Component } = Ember;

const FieldsFor = Component.extend({
  layout,
  tagName: ''
});

FieldsFor.reopenClass({
  positionalParams: ['data']
});

export default FieldsFor;
