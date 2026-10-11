const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

function load(pipeline) {
  const source = fs.readFileSync(path.join(__dirname, '../src/lib/text-generator.ts'), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  })
  const env = { allowLocalModels: true }
  const exports = {}
  vm.runInNewContext(outputText, { exports, require: () => ({ pipeline, env }) })
  return { getTextGenerator: exports.getTextGenerator, env }
}

test('selects the published INT8 model and shares concurrent and later loads', async () => {
  let calls = 0
  const generator = () => []
  const { getTextGenerator, env } = load(async (task, model, options) => {
    calls++
    assert.equal(task, 'text-generation')
    assert.equal(model, 'Xenova/gpt2')
    assert.equal(options.dtype, 'int8')
    assert.equal(options.device, 'wasm')
    return generator
  })
  const first = getTextGenerator()
  assert.equal(getTextGenerator(), first)
  assert.equal(await first, generator)
  assert.equal(await getTextGenerator(), generator)
  assert.equal(calls, 1)
  assert.equal(env.allowLocalModels, false)
})

test('allows retry after a failed download', async () => {
  let calls = 0
  const generator = () => []
  const { getTextGenerator } = load(async () => {
    if (++calls === 1) throw new Error('Network unavailable')
    return generator
  })
  await assert.rejects(getTextGenerator(), /Network unavailable/)
  assert.equal(await getTextGenerator(), generator)
  assert.equal(calls, 2)
})
