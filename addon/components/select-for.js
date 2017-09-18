import Ember from 'ember';
import layout from '../templates/components/select-for';
import FormControl from './form-control';

const {
  get,
  set,
  assert,
  computed,
  A
} = Ember;

export default FormControl.extend({
  layout,

  classNames: 'select-field',

  hasBasicOptions: computed('options', function() {
    return typeof get(A(get(this, 'options')), 'firstObject') !== 'object';
  }),

  valuePath: computed('hasBasicOptions', function() {
    if (!get(this, 'hasBasicOptions')) {
      return 'id';
    }
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    assert(
      `Must provide an options attribute when using \`${this.toString().match(/component:.[^`:]*/)}\``,
      get(this, 'options')
    );

    if (get(this, 'hasBasicOptions')) {
      this.selectedOption = computed.readOnly(`data.${get(this, 'field')}`);
    } else {
      let field = get(this, 'field');
      let valuePath = get(this, 'valuePath');

      this.selectedOption = computed(`data.${field}`, 'options', 'field', function() {
        return get(this, 'options')
          .findBy(valuePath, get(this, `data.${field}.${valuePath}`));
      });
    }
  },

  updateSelected(value) {
    if (get(this, 'hasBasicOptions')) {
      set(get(this, 'data'), get(this, 'field'), value);
    } else {
      let selectedOption = A(get(this, 'options'))
                           .findBy(get(this, 'valuePath'), value);

      set(get(this, 'data'), get(this, 'field'), selectedOption);
    }
  }
});
