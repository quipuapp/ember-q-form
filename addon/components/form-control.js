import Ember from 'ember';

const {
  get,
  set,
  computed,
  Component,
  String,
  inject: { service },
  isEmpty
} = Ember;

const FormControl = Component.extend({
  intl: service(),
  classNames: 'form-field',
  classNameBindings: ['hasErrors:has-errors', 'focused'],

  showErrors: false,

  inputId: computed('elementId', {
    get() {
      return `${get(this, 'elementId')}-input`;
    }
  }),

  label: computed('data', 'field', {
    get() {
      let modelName
        = get(this, 'data.content.constructor.modelName')
          || get(this, 'data.constructor.modelName');

      if (!modelName) {
        return;
      }

      let fieldName = get(this, 'field');

      if (!fieldName) {
        return;
      }

      modelName = String.underscore(modelName);
      fieldName = String.underscore(fieldName);

      return get(this, 'intl').t(
        `models.attributes.${modelName}.${fieldName}`);
    }
  }),

  init() {
    this._super(...arguments);

    let errorsPath = `data.validations.attrs.${get(this, 'field')}.errors`;

    this.hasErrors = computed('showErrors', errorsPath, () => {
      if (!get(this, 'showErrors')) {
        return false;
      }

      return !isEmpty(get(this, errorsPath));
    });
  },

  focusIn() {
    set(this, 'focused', true);
  },

  focusOut() {
    set(this, 'focused', false);
  }
});

FormControl.reopenClass({
  positionalParams: ['field']
});

export default FormControl;
