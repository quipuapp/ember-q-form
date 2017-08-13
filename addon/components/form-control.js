import Ember from 'ember';

const FormControl = Ember.Component.extend({
  intl: Ember.inject.service(),
  classNames: "form-field",
  classNameBindings: ['hasErrors:has-errors', 'focused'],

  showErrors: false,

  focusIn() {
    this.set('focused', true);
  },

  focusOut() {
    this.set('focused', false);
  },


  inputId: Ember.computed("elementId", {
    get() {
      return `${this.get("elementId")}-input`;
    }
  }),

  label: Ember.computed("data", "field", {
    get() {
      let modelName =
        this.get("data.content.constructor.modelName") ||
        this.get("data.constructor.modelName");

      if (!modelName) {
        return;
      }

      let fieldName = this.get("field");

      if (!fieldName) {
        return;
      }

      modelName = Ember.String.underscore(modelName);
      fieldName = Ember.String.underscore(fieldName);

      return this.get("intl").t(
        `models.attributes.${modelName}.${fieldName}`);
    }
  }),

  init() {
    this._super(...arguments);

    const errorsPath = `data.validations.attrs.${this.get('field')}.errors`;

    this.hasErrors = Ember.computed('showErrors', errorsPath, () => {
      if (!this.get('showErrors')) {
        return false;
      }

      return !Ember.isEmpty(this.get(errorsPath));
    });
  }
});

FormControl.reopenClass({
  positionalParams: ["field"]
});

export default FormControl;
