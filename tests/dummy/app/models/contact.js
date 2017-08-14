import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator("presence", true),
  email: [
    validator("format", { type: "email" })
  ],
  category: validator("presence", true),
  addressess: validator('has-many')
});

export default DS.Model.extend(Validations, {
  name:  DS.attr("string"),
  email: DS.attr("string"),

  category:   DS.belongsTo("category", { inverse: null }),
  addressess: DS.hasMany("address")
});
