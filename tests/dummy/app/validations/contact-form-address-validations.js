import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  street: validator('presence', true),
  zipCode: validator('presence', true),
  city: validator('presence', true),
  country: validator('presence', true)
});
