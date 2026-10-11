const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { test } = require('node:test')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const source = fs.readFileSync(path.join(__dirname, '../src/components/studio/signal-ribbon.tsx'), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2017 },
}).outputText

function render(sinOffset, bottom) {
  const runtimeMath = Object.create(Math)
  runtimeMath.sin = value => Math.sin(value) + sinOffset
  const exports = {}
  vm.runInNewContext(compiled, { exports, require, Math: runtimeMath })
  return renderToStaticMarkup(React.createElement(exports.SignalRibbon, { bottom }))
}

test('header and footer ribbons render identical HTML despite sine precision differences', () => {
  for (const bottom of [false, true]) {
    const serverHTML = render(0, bottom)
    assert.equal(render(Number.EPSILON, bottom), serverHTML)
    assert.equal(render(-Number.EPSILON, bottom), serverHTML)
    assert.equal((serverHTML.match(/<rect class="signal-bar/g) || []).length, 144)
  }
})
