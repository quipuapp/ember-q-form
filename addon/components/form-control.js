import Ember from 'ember';

const FormControl = Ember.Component.extend({
  intl: Ember.inject.service(),

  showErrors: false,

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

FormControl.reopenClass({
  positionalParams: ["field"]
});

export default FormControl;
