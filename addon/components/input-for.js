import layout from '../templates/components/input-for';
import FormControl from './form-control';

export default FormControl.extend({
  layout,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.get("type")) {
      this.set("type", "text");
    }
  },
});
