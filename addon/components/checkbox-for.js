import Ember from 'ember';
import layout from '../templates/components/checkbox-for';
import FormControl from './form-control';

const { get } = Ember;

export default FormControl.extend({
  layout,

  toggleField() {
    get(this, 'data').toggleProperty(get(this, 'field'));
  }
});
