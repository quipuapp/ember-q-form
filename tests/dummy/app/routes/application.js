import Ember from 'ember';

const {
  get,
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  intl: service(),

  beforeModel() {
    get(this, 'intl').setLocale('es');
  }
});
