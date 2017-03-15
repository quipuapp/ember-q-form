import DS from 'ember-data';

export default DS.Model.extend({
  name:  DS.attr("string"),
  email: DS.attr("string"),

  category:  DS.belongsTo("category", { inverse: null }),
  addressess: DS.hasMany("address")
});
