import Ember from 'ember';
import formBufferProperty from 'ember-validated-form-buffer';
import Validations from 'dummy/validations/contact-form-validations';

export default Ember.Component.extend({
  data: formBufferProperty('model', Validations),

  store: Ember.inject.service(),

  selectOptions: ["perro", "gato", "jirafa", "caballo"],

  init() {
    this._super(...arguments);

    const store = this.get("store");
    const categories = [
      store.createRecord("category", { id: "1", name: "Friends" }),
      store.createRecord("category", { id: "2", name: "Family" }),
      store.createRecord("category", { id: "3", name: "Work" })
    ];

    this.set("categories", Ember.ArrayProxy.create({ content: categories }));
  },

  save() {
    console.debug("Submit action in component:contact-form");
  }
});
