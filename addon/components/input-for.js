import layout from '../templates/components/input-for';
import FormControl from './form-control';
import Ember from 'ember';

const { isPresent, computed } = Ember;

export default FormControl.extend({
  layout,

  classNameBindings: ['hasValue'],

  init() {
    this._super(...arguments);

    const field = this.get('field');

    this.hasValue = computed(`data.${field}`, () => {
      return isPresent(this.get(`data.${field}`));
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.get("type")) {
      this.set("type", "text");
    }
  },
});
