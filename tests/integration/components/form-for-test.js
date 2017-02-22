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

test("on submit executes 'onsubmit'", function(assert) {
  assert.expect(1);

  const submit = function() {
    assert.ok(1, "external function executed");
  };

  this.set("submit", submit);

  this.render(hbs`
    {{#form-for onsubmit=submit}}
    {{/form-for}}
  `);

  this.$("form").submit();
});

test("on submit does not execute 'onsubmit' if object has errors", function(assert) {
  assert.expect(1);

  this.set("foo", "bar");

  const submit = function() {
    this.set("foo", "baz");
  };

  this.set("data", { hasDisplayErrors: true });

  this.set("submit", submit);

  this.render(hbs`
    {{#form-for data onsubmit=(action submit)}}
    {{/form-for}}
  `);

  this.$("form").submit();

  assert.equal(this.get("foo"), "bar", "'on-submit' does not get executed");
});

test("it yields a hash with q-input component", function(assert) {
  assert.expect(2);

  const something = {
    name: "J. Perico"
  };

  this.set("data", something);

  this.render(hbs`
    {{#form-for data as |form|}}
      {{form.input field="name"}}
    {{/form-for}}
  `);

  assert.ok(find("input"), "it yields a hash with q-input component");

  this.$("input").val("Refusco").trigger("input");

  assert.equal(something.name, "Refusco");
});
