import test from 'node:test';
import assert from 'node:assert/strict';
import { assertSameUser, sanitizeResourceBody } from '../utils/ownership.js';
import { HttpError } from '../utils/HttpError.js';
import { validate, inventorySchema, tagSchema } from '../validators/index.js';

test('assertSameUser allows matching ids', () => {
  assert.doesNotThrow(() => assertSameUser('abc', 'abc'));
  assert.doesNotThrow(() => assertSameUser(123, '123'));
});

test('assertSameUser blocks different ids with 403', () => {
  assert.throws(
    () => assertSameUser('owner-a', 'owner-b', 'Sem permissão.'),
    (error) => {
      assert.equal(error.statusCode, 403);
      assert.equal(error.message, 'Sem permissão.');
      return true;
    }
  );
});

test('sanitizeResourceBody removes userId and _id', () => {
  const body = sanitizeResourceBody({
    name: 'Vestido',
    userId: 'hack',
    _id: 'hack-id',
  });

  assert.deepEqual(body, { name: 'Vestido' });
});

test('validate rejects invalid inventory payload', async () => {
  await assert.rejects(
    () => validate(inventorySchema, { color: 'azul' }),
    (error) => {
      assert.equal(error.statusCode, 400);
      return true;
    }
  );
});

test('validate accepts valid tag payload', async () => {
  const result = await validate(tagSchema, {
    name: 'Casual',
    icon: '👕',
  });

  assert.equal(result.name, 'Casual');
});

test('HttpError carries status code', () => {
  const error = new HttpError(404, 'Não encontrado.');
  assert.equal(error.statusCode, 404);
  assert.equal(error.message, 'Não encontrado.');
});
