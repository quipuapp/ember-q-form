import layout from '../templates/components/input-for';
import FormControl from './form-control';
import Ember from 'ember';

const {
  get,
  set,
  isPresent,
  computed
} = Ember;

export default FormControl.extend({
  layout,

  classNameBindings: ['hasValue'],

  init() {
    this._super(...arguments);

    let field = get(this, 'field');

    this.hasValue = computed(`data.${field}`, 'placeholder', () => {
      if (isPresent(get(this, 'placeholder'))) {
        return true;
      }

      return isPresent(get(this, `data.${field}`));
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (!get(this, 'type')) {
      set(this, 'type', 'text');
    }
  }
});
