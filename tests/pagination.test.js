import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePagination } from '../utils/pagination.js';

test('parsePagination returns null when params are absent', () => {
  assert.equal(parsePagination({}), null);
});

test('parsePagination parses page and limit', () => {
  const result = parsePagination({ page: '2', limit: '10' });
  assert.deepEqual(result, { page: 2, limit: 10, skip: 10 });
});

test('parsePagination clamps limit to 100', () => {
  const result = parsePagination({ page: '1', limit: '500' });
  assert.equal(result.limit, 100);
});
