import Ember from 'ember';
import formBufferProperty from 'ember-validated-form-buffer';
import Validations from 'dummy/validations/contact-form-validations';

export default Ember.Component.extend({
  data: formBufferProperty('model.contact', Validations),

  categories: Ember.computed.readOnly("model.categories"),

  selectOptions: ["perro", "gato", "jirafa", "caballo"],

  init() {
    this._super(...arguments);
  },

  save() {
    console.debug("Submit action in component:contact-form");
  }
});
