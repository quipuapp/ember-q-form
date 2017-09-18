import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('input-for', 'Integration | Component | input-for', {
  integration: true,
  setup() {
    let service = this.container.lookup('service:intl');
    service.setLocale('es');
  }
});

test('it renders', function(assert) {
  this.render(hbs`
    {{input-for}}
  `);

  assert.ok(this.$('input').length, 'it renders an input');
});

test('it shows errors on blur', function(assert) {
  assert.expect(2);

  let errorMessage = 'can\'t be blank';

  let something = {
    name: '',
    validations: {
      attrs: {
        name: {
          messages: [errorMessage]
        }
      }
    }
  };

  this.set('something', something);

  this.render(hbs`
    {{input-for 'name' data=something}}
  `);

  assert.notOk(
    this.$('.errors').length,
    'it doesn\'t show the errors before focus out'
  );

  run(() => {
    this.$('input').trigger('blur');
  });

  assert.ok(
    this.$().text().indexOf(errorMessage) !== -1,
    'it shows the error messages after focus out'
  );
});

test('it builds the label from intl translations', function(assert) {
  let something = {
    content: {
      constructor: {
        modelName: 'contact'
      }
    }
  };

  this.set('something', something);

  this.render(hbs`
    {{input-for 'name' data=something}}
  `);

  assert.equal(
    this.$('label').text(),
    'nombre',
    'has a translated label'
  );
});

test('it renders without label if label is falsy', function(assert) {
  let something = {
    content: {
      constructor: {
        modelName: 'contact'
      }
    }
  };

  this.set('something', something);

  this.render(hbs`
    {{input-for 'name' data=something label=false}}
  `);

  assert.equal(
    this.$('label').length,
    0,
    'has no label'
  );
});
