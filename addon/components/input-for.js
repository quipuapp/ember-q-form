import Ember from 'ember';
import layout from '../templates/components/input-for';

const Input = Ember.Component.extend({
  layout,
  intl: Ember.inject.service(),

  showErrors: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.get("type")) {
      this.set("type", "text");
    }
  },

  inputId: Ember.computed("elementId", {
    get() {
      return `${this.get("elementId")}-input`;
    }
  }),

  label: Ember.computed("data", "field", {
    get() {
      if (!this.get("data.content.constructor.modelName")) {
        return;
      }

      if (!this.get("field")) {
        return;
      }
      const modelName = Ember.String.underscore(
        this.get("data.content.constructor.modelName"));

      const fieldName = Ember.String.underscore(
        this.get("field"));

      return this.get("intl").t(
        `models.attributes.${modelName}.${fieldName}`);
    }
  })
});

Input.reopenClass({
  positionalParams: ["field"]
});

export default Input;
