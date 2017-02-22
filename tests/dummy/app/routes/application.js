import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    this.get("intl").setLocale("es");
  },

  model() {
    return this.store.createRecord("contact");
  }
});
