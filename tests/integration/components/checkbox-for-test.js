import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { Object } = Ember;

moduleForComponent('checkbox-for', 'Integration | Component | checkbox for', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{checkbox-for}}`);

  assert.ok(this.$('input[type="checkbox"]').length,
            'renders a checkbox input');
});

test('works', function(assert) {
  this.set('something', Object.create());

  this.render(hbs`{{checkbox-for data=something field='foo'}}`);

  this.$('label').click();
  this.$('input').trigger('change');

  assert.ok(this.get('something.foo'));

  this.$('label').click();
  this.$('input').trigger('change');

  assert.notOk(this.get('something.foo'));
});
