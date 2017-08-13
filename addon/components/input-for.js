import layout from '../templates/components/input-for';
import FormControl from './form-control';

export default FormControl.extend({
  layout,

  classNameBindings: ['hasValue'],

  init() {
    this._super(...arguments);

    const field = this.get('field');

    this.hasValue = Ember.computed(`data.${field}`, () => {
      return Ember.isPresent(this.get(`data.${field}`));
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.get("type")) {
      this.set("type", "text");
    }
  },
});
