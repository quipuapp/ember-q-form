import { emberQuipuFormsEqual } from 'dummy/helpers/ember-quipu-forms-equal';
import { module, test } from 'qunit';

module('Unit | Helper | ember quipu forms equal');

test('it works', function(assert) {
  let result = emberQuipuFormsEqual(['mec', 'mec']);
  assert.ok(result);

  result = emberQuipuFormsEqual(['mic', 'moc']);
  assert.notOk(result);
});

