import Ember from 'ember';
import layout from '../templates/components/select-for';
import FormControl from './form-control';

export default FormControl.extend({
  layout,

  classNames: "select-field",

  didReceiveAttrs() {
    this._super(...arguments);

    Ember.assert(
      `Must provide an options attribute when using \`${this.toString().match(/component:.[^`:]*/)}\``,
      this.get("options")
    );

    if (this.get("hasBasicOptions")) {
      this.selectedOption =
        Ember.computed.readOnly(`data.${this.get("field")}`);
    } else {
      const field     = this.get("field"),
            valuePath = this.get("valuePath");

      this.selectedOption = Ember.computed(`data.${field}`, "options", "field", function() {
        return this.get("options").
          findBy(valuePath, this.get(`data.${field}.${valuePath}`));
      });
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
