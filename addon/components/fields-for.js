import Ember from 'ember';
import layout from '../templates/components/form-for';

const FieldsFor = Ember.Component.extend({
  layout,
  tagName: ""
});

FieldsFor.reopenClass({
  positionalParams: ["data"]
});

export default FieldsFor;
