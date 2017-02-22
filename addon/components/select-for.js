import Ember from 'ember';
import layout from '../templates/components/select-for';
import InputFor from './input-for';

export default InputFor.extend({
  layout,

  init() {
    this._super(...arguments);

    Ember.assert(
      "Must provide an options attribute when using `select-for`",
      this.get("options")
    );

    if (this.get("hasBasicOptions")) {
      this.set("selectedValue", this.get(`data.${this.get("field")}`));
    } else {
      this.set(
        "selectedValue",
        this.get(`data.${this.get("field")}.${this.get("valuePath")}`)
      );
    }
  },

  hasBasicOptions: Ember.computed("options", function() {
    return typeof Ember.get(Ember.A(this.get("options")), "firstObject") !== "object";
  }),

  valuePath: Ember.computed("hasBasicOptions", function() {
    if (!this.get("hasBasicOptions")) {
      return "id";
    }
  }),

  selectedOption: Ember.computed("selectedValue", function() {
    if (this.get("hasBasicOptions")) {
      return this.get("selectedValue");
    } else {
      Ember.A(this.get("options")).
        findBy(this.get("valuePath"), this.get("selectedValue"));
    }
  }),

  updateSelected(value) {
    this.set("selectedValue", value);

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
