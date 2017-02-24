import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    this.get("intl").setLocale("es");
  },

  model() {
    const store = this.get("store");
    const categories = [
      store.createRecord("category", { id: "1", name: "Friends" }),
      store.createRecord("category", { id: "2", name: "Family" }),
      store.createRecord("category", { id: "3", name: "Work" })
    ];

    const contact = this.store.createRecord("contact", {
      animal: "jirafa",
      category: categories[1],
      receiveNewsletter: true
    });

    return {
      contact:    contact,
      categories: categories
    };
  }
});
