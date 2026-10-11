import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { guardWrite, rateLimit, readJson, RequestError, requestFailure, stringField, validEmail } from '../src/lib/security/request'

test('rejects cross-origin writes before processing a payload', () => {
  const request = new Request('https://portfolio.test/api/contact', { method: 'POST', headers: { origin: 'https://attacker.test' } })
  assert.throws(() => guardWrite(request, 'test-origin'), (error: unknown) => error instanceof RequestError && error.status === 403)
})
test('rejects arrays, null, malformed JSON, and non-JSON requests', async () => {
  for (const body of ['[]', 'null', '{']) {
    await assert.rejects(readJson(new Request('https://portfolio.test', { method: 'POST', body, headers: { 'content-type': 'application/json' } })), RequestError)
  }
  await assert.rejects(readJson(new Request('https://portfolio.test', { method: 'POST', body: '{}' })), (error: unknown) => error instanceof RequestError && error.status === 415)
})
test('limits actual body size even without a content-length header', async () => {
  const request = new Request('https://portfolio.test', { method: 'POST', body: JSON.stringify({ text: 'x'.repeat(300) }), headers: { 'content-type': 'application/json' } })
  await assert.rejects(readJson(request, 100), (error: unknown) => error instanceof RequestError && error.status === 413)
})
test('rejects email header injection and invalid field types', () => {
  assert.equal(validEmail('hello@example.com'), true)
  for (const email of ['hello@example.com\r\nBcc: victim@example.com', 'a@b', 'a b@example.com']) assert.equal(validEmail(email), false)
  assert.throws(() => stringField({ $gt: '' }, 'name', 100), RequestError)
  assert.throws(() => stringField('x'.repeat(101), 'name', 100), RequestError)
  assert.equal(stringField(null, 'name', 100, false), '')
})
test('rate limits repeated requests and does not expose internal errors', async () => {
  const identity = 'security-test-' + Date.now()
  for (let i = 0; i < 5; i++) rateLimit(identity)
  assert.throws(() => rateLimit(identity), (error: unknown) => error instanceof RequestError && error.status === 429)
  const response = requestFailure(new Error('smtp://private-password'), 'Temporarily unavailable.')
  assert.equal(response.status, 503)
  assert.deepEqual(await response.json(), { error: 'Temporarily unavailable.' })
})
