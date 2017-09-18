import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Validations from 'dummy/validations/contact-form-address-validations';

export default Model.extend(Validations, {
  street: attr('string'),
  zipCode: attr('string'),
  city: attr('string'),
  country: attr('string'),

  contact: belongsTo('contact')
});
