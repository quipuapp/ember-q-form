import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('radio-group-for', 'Integration | Component | radio-group-for', {
  integration: true,
  setup() {
    this.set("options", ["cat", "dog", "snake", "tapir"]);
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{radio-group-for "contact" options=options}}
  `);

  assert.ok(this.$("radiogroup").length, 'it renders a select element');
});

test("it throws an error if options are not provided", function(assert) {
  assert.expect(1);

  assert.throws(
    () => {
      this.render(hbs`{{radio-group-for "contact"}}`);
    },
    /Must provide an options attribute when using `component:radio-group-for`/,
    "raised error"
  );
});

test("with basic types works", function(assert) {
  assert.expect(3);

  this.set("something", {
    pet: "snake"
  });

  this.render(hbs`
    {{radio-group-for "pet" options=options data=something}}
  `);

  assert.equal(this.$("input").length, 4, "it renders the options");
  assert.equal(this.$("input:checked").val(), "snake",
              "it has the correct option selected");

  this.$("radiogroup").val("tapir").trigger("change");

  assert.equal(
    this.get("something.pet"),
    "tapir",
    "it assigns the option to `data`"
  );
});

test("with complex types works", function(assert) {
  assert.expect(3);

  const options = [
    {
      id: "1",
      name: "Oumou Sangaré"
    }, {
      id: "2",
      name: "Rokia Traoré"
    }, {
      id: "3",
      name: "Salif Keita"
    }
  ];

  this.set("options", options);

  this.set("something", {
    favoriteSinger: options[2]
  });

  this.render(hbs`
    {{radio-group-for "favoriteSinger"
      options=options
      data=something}}
  `);

  assert.equal(this.$("input").length, 3, "it renders the options");
  assert.equal(this.$("input:checked").val(), "3",
              "it has the correct option selected");

  this.$("radiogroup").val("3").trigger("change");

  assert.equal(
    this.get("something.favoriteSinger.name"),
    "Salif Keita",
    "it assigns the option to `data`"
  );
});
