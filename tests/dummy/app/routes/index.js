import Ember from 'ember';

const {
  get,
  set,
  Route
} = Ember;

export default Route.extend({
  model() {
    let categories = [
      this.store.createRecord('category', { id: '1', name: 'Friends' }),
      this.store.createRecord('category', { id: '2', name: 'Family' }),
      this.store.createRecord('category', { id: '3', name: 'Work' })
    ];

    set(this, 'categories', categories);

    let contact = this.store.createRecord('contact', {
      animal: 'jirafa',
      category: categories[2],
      receiveNewsletter: true
    });

    let address = this.store.createRecord('address', {
      street: 'Tolra',
      zipCode: '08032',
      city: 'Barcelona',
      country: 'Meeeeec'
    });

    get(contact, 'addressess').addObject(address);

    return contact;
  },

  setupController(controller) {
    this._super(...arguments);

    set(controller, 'categories', get(this, 'categories'));
  }
});
