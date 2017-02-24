import InputFor from './input-for';
import layout from '../templates/components/checkbox-for';

export default InputFor.extend({
  layout,

  toggleField() {
    this.get("data").toggleProperty(this.get("field"));
  }
});
