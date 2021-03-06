import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  email: [
    validator('format', { type: 'email' })
  ],
  category: validator('presence', true),
  addressess: validator('has-many')
});

export default Model.extend(Validations, {
  name: attr('string'),
  email: attr('string'),

  category: belongsTo('category', { inverse: null }),
  addressess: hasMany('address')
});
