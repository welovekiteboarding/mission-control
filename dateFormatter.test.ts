import test from 'node:test';
import assert from 'node:assert/strict';

import { formatDateToReadable, getRelativeTime } from './dateFormatter';

test('formatDateToReadable throws because of string map bug', () => {
  assert.throws(() => {
    formatDateToReadable(new Date('2024-01-02T00:00:00Z'));
  });
});

test('getRelativeTime returns a seconds suffix for recent dates', () => {
  const now = Date.now();
  const result = getRelativeTime(new Date(now - 1500));
  assert.match(result, /^\d+s ago$/);
});
