import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-for', 'Integration | Component | input-for', {
  integration: true,
  setup() {
    const service = this.container.lookup('service:intl');
    service.setLocale('es');
  }
});

test("it renders", function(assert) {
  this.render(hbs`
    {{input-for}}
  `);

  assert.ok(this.$("input").length, "it renders an input");
});

test("it shows errors on blur", function(assert) {
  assert.expect(2);

  const error_message = "can't be blank";

  const something = {
    name: "",
    validations: {
      attrs: {
        name: {
          messages: [error_message]
        }
      }
    }
  };

  this.set("something", something);

  this.render(hbs`
    {{input-for "name" data=something}}
  `);

  assert.notOk(
    this.$(".errors").length,
    "it doesn't show the errors before focus out"
  );

  Ember.run( () => {
    this.$("input").trigger("blur");
  });

  assert.ok(
    this.$().text().indexOf(error_message) !== -1,
    "it shows the error messages after focus out"
  );
});

test("it builds the label from intl translations", function(assert) {
  const something = {
    content: {
      constructor: {
        modelName: "contact"
      }
    }
  };

  this.set("something", something);

  this.render(hbs`
    {{input-for "name" data=something}}
  `);

  assert.equal(
    this.$("label").text(),
    "nombre",
    "has a translated label"
  );
});

test("it renders without label if label is falsy", function(assert) {
  const something = {
    content: {
      constructor: {
        modelName: "contact"
      }
    }
  };

  this.set("something", something);

  this.render(hbs`
    {{input-for "name" data=something label=false}}
  `);

  assert.equal(
    this.$("label").length,
    0,
    "has no label"
  );
});
