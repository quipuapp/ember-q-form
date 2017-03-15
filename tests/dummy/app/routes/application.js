import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    this.get("intl").setLocale("es");
  },

  model() {
    const categories = [
      this.store.createRecord("category", { id: "1", name: "Friends" }),
      this.store.createRecord("category", { id: "2", name: "Family" }),
      this.store.createRecord("category", { id: "3", name: "Work" })
    ];

    this.set("categories", categories);

    const contact = this.store.createRecord("contact", {
      animal: "jirafa",
      category: categories[2],
      receiveNewsletter: true
    });

    return contact;
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set("categories", this.get("categories"));
  }
});
