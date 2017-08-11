import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const categories = [
      this.store.createRecord("category", { id: "1", name: "Friends" }),
      this.store.createRecord("category", { id: "2", name: "Family" }),
      this.store.createRecord("category", { id: "3", name: "Work" })
    ];

    this.set("categories", categories);

    const contact = this.store.createRecord("validated-contact", {
      animal: "jirafa",
      category: categories[2],
      receiveNewsletter: true
    });

    const address = this.store.createRecord('validated-address', {
      street: 'Tolra',
      zipCode: '08032',
      city: 'Barcelona',
      country: 'Meeeeec'
    });

    contact.get('addressess').addObject(address);

    return contact;
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set("categories", this.get("categories"));
  }
});
