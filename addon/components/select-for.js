import Ember from 'ember';
import layout from '../templates/components/select-for';
import FormControl from './form-control';

export default FormControl.extend({
  layout,

  didReceiveAttrs() {
    this._super(...arguments);

    Ember.assert(
      `Must provide an options attribute when using \`${this.toString().match(/component:.[^`:]*/)}\``,
      this.get("options")
    );

    this.set("selectedOption", Ember.computed.readOnly(`data.${this.get("field")}`));
  },

  hasBasicOptions: Ember.computed("options", function() {
    return typeof Ember.get(Ember.A(this.get("options")), "firstObject") !== "object";
  }),

  valuePath: Ember.computed("hasBasicOptions", function() {
    if (!this.get("hasBasicOptions")) {
      return "id";
    }
  }),

  updateSelected(value) {
    if (this.get("hasBasicOptions")) {
      Ember.set(this.get("data"), this.get("field"), value);
    } else {
      const selectedOption =
        Ember.A(this.get("options")).
        findBy(this.get("valuePath"), value);

      Ember.set(this.get("data"), this.get("field"), selectedOption);
    }
  }
});
