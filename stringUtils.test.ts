import { test } from 'node:test';
import assert from 'node:assert';
import { capitalize, reverse, countVowels } from './stringUtils.js';

test('capitalizes the first letter', () => {
  assert.strictEqual(capitalize('hello'), 'Hello');
});

test('reverses a string', () => {
  assert.strictEqual(reverse('hello'), 'olleh');
});

test('counts vowels', () => {
  assert.strictEqual(countVowels('hello'), 2);
});
