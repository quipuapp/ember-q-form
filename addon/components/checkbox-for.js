import layout from '../templates/components/checkbox-for';
import FormControl from './form-control';

export default FormControl.extend({
  layout,

  toggleField() {
    this.get("data").toggleProperty(this.get("field"));
  }
});
