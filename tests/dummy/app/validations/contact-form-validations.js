import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  name: validator('presence', true),
  email: [
    validator('format', { type: 'email' })
  ],
  category: validator('presence', true)
});
