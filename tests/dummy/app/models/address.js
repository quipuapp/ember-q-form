import DS from 'ember-data';
import Validations from 'dummy/validations/contact-form-address-validations';

export default DS.Model.extend(Validations, {
  street:  DS.attr("string"),
  zipCode: DS.attr("string"),
  city:    DS.attr("string"),
  country: DS.attr("string"),

  contact: DS.belongsTo("contact")
});
