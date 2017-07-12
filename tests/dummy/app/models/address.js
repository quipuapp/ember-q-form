import DS from 'ember-data';

export default DS.Model.extend({
  street:  DS.attr("string"),
  zipCode: DS.attr("string"),
  city:    DS.attr("string"),
  country: DS.attr("string"),

  contact: DS.belongsTo("contact")
});
