import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  selectOptions: ["perro", "gato", "jirafa", "caballo"],

  init() {
    this._super(...arguments);

    this.set('addressess', this.get('model.addressess').toArray());
  },

  save() {
  },

  cancel() {
    this.set('model.addressess', this.get('addressess'));
  },

  removeAddress(address) {
    this.get('model.addressess').removeObject(address);
  }
});
