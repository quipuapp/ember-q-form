import Ember from 'ember';
import layout from '../templates/components/form-for';

const {
  get,
  set,
  Component
} = Ember;

const Form = Component.extend({
  layout,
  tagName: 'form',
  novalidate: true,
  showErrors: false,

  attributeBindings: ['novalidate'],

  submit(event) {
    event.preventDefault();

    set(this, 'showErrors', true);

    if (get(this, 'data.validations.isValid') === false) {
      return;
    } else {
      this.onSubmit();
    }
  }
});

Form.reopenClass({
  positionalParams: ['data']
});

export default Form;
