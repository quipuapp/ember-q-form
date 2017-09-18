import Ember from 'ember';

const {
  get,
  set,
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),

  selectOptions: null,

  init() {
    this._super(...arguments);

    set(this, 'selectOptions', ['perro', 'gato', 'jirafa', 'caballo']);
    set(this, 'addressess', get(this, 'model.addressess').toArray());
  },

  save() {
  },

  cancel() {
    set(this, 'model.addressess', get(this, 'addressess'));
  },

  removeAddress(address) {
    get(this, 'model.addressess').removeObject(address);
  }
});
