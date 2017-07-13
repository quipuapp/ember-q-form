/* eslint no-console: "off" */
import Ember from 'ember';
import formBufferProperty from 'ember-validated-form-buffer';
import Validations from 'dummy/validations/contact-form-validations';
import AddressValidations from 'dummy/validations/contact-form-address-validations';

const AddressBuffer = Ember.Object.extend({
  model: null,
  data:  formBufferProperty("model", AddressValidations)
});

export default Ember.Component.extend({
  store: Ember.inject.service(),

  data: formBufferProperty('model', Validations),

  selectOptions: ["perro", "gato", "jirafa", "caballo"],

  addressess: Ember.A(),

  addressBuffers: Ember.computed('addressess.[]', function() {
    return Ember.A(this.get('addressess').map( address => {
      return AddressBuffer.create(Ember.getOwner(this).ownerInjection(), {
        model: address
      });
    }));
  }),

  init() {
    this._super(...arguments);

    if (Ember.isEmpty(this.get("data.addresses"))) {
      const newAddress = this.get("store").createRecord("address");

      this.get('addressess').addObject(newAddress);
    } else {
      this.get('data.addressess').forEach( address => {
        this.get('addressess').addObject(address);
      });
    }
  },

  save() {
    const addressBuffersHaveErrors = this.get('addressBuffers').any(function(addressBuffer) {
      return addressBuffer.get('data.hasDisplayErrors');
    });

    if (addressBuffersHaveErrors) {
      console.debug('There are errors on addressess.');
      return;
    }

    this.get('data').applyBufferedChanges();

    const addressess = this.get('addressBuffers').map( addressBuffer => {
      addressBuffer.get('data').applyBufferedChanges();

      return addressBuffer.get('model');
    });

    this.set('model.addressess', addressess);

    console.debug("Submit action in component:contact-form");
  }
});
