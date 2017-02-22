import Ember from 'ember';
import layout from '../templates/components/form-for';

const Form = Ember.Component.extend({
  layout,
  tagName: "form",
  novalidate: true,
  showErrors: false,

  attributeBindings: ["novalidate"],

  submit(event) {
    event.preventDefault();

    this.set("showErrors", true);

    if (this.get("data.hasDisplayErrors")) {
      return;
    } else {
      this["on-submit"]();
    }
  }
});

Form.reopenClass({
  positionalParams: ["data"]
});

export default Form;
