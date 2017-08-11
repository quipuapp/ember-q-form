import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  selectOptions: ["perro", "gato", "jirafa", "caballo"],

  init() {
    this._super(...arguments);

    this.set('addressess', this.get('model.addressess').toArray());
    console.log(Ember.inspect(this.get('model.addressess')));
  },

  save() {
    debugger;
  },

  cancel() {
    this.set('model.addressess', this.get('addressess'));

    console.log(Ember.inspect(this.get('model.addressess')));
  },

  removeAddress(address) {
    this.get('model.addressess').removeObject(address);

    console.log(Ember.inspect(this.get('model.addressess')));
  }
});
