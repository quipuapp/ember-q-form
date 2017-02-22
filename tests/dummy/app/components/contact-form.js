import Ember from 'ember';
import formBufferProperty from 'ember-validated-form-buffer';
import Validations from 'dummy/validations/contact-form-validations';

export default Ember.Component.extend({
  data: formBufferProperty('model', Validations)
});
