import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-for', 'Integration | Component | form-for', {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`
    {{#form-for}}
    {{/form-for}}
  `);

  assert.ok(find("form"), "it renders a form");
});

test("on submit executes 'onSubmit'", function(assert) {
  assert.expect(1);

  const save = function() {
    assert.ok(1, "external function executed");
  };

  this.set("save", save);

  this.render(hbs`
    {{#form-for onSubmit=(action save)}}
    {{/form-for}}
  `);

  this.$("form").submit();
});

test("on submit does not execute 'onSubmit' if object has errors", function(assert) {
  assert.expect(1);

  this.set("foo", "bar");

  const submit = function() {
    this.set("foo", "baz");
  };

  this.set("data", { validations: { isValid: false } });

  this.set("submit", submit);

  this.render(hbs`
    {{#form-for data onSubmit=(action submit)}}
    {{/form-for}}
  `);

  this.$("form").submit();

  assert.equal(this.get("foo"), "bar", "'onSubmit' does not get executed");
});

test("it yields a hash with input-for component", function(assert) {
  assert.expect(2);

  const something = {
    name: "J. Perico"
  };

  this.set("data", something);

  this.render(hbs`
    {{#form-for data as |form|}}
      {{form.input-for "name"}}
    {{/form-for}}
  `);

  assert.ok(find("input"), "it yields a hash with q-input component");

  this.$("input").val("Refusco").trigger("input");

  assert.equal(something.name, "Refusco");
});
