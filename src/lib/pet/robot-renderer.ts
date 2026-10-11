import { robotBehavior } from './robot-behavior'

type Vec3 = [number, number, number]
type Matrix = Float32Array
type Mesh = { buffer: WebGLBuffer; count: number; color: Vec3 }
export type RobotPose = { animated: boolean; hovered: boolean; x: number; y: number }

function identity(): Matrix { return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) }
function multiply(a: Matrix, b: Matrix): Matrix {
  const result = new Float32Array(16)
  for (let column = 0; column < 4; column++) for (let row = 0; row < 4; row++) {
    for (let index = 0; index < 4; index++) result[column * 4 + row] += a[index * 4 + row] * b[column * 4 + index]
  }
  return result
}
function translate(x: number, y: number, z: number) { const matrix = identity(); matrix[12] = x; matrix[13] = y; matrix[14] = z; return matrix }
function scale(x: number, y: number, z: number) { const matrix = identity(); matrix[0] = x; matrix[5] = y; matrix[10] = z; return matrix }
function rotate(axis: 'x' | 'y' | 'z', angle: number) {
  const matrix = identity(), c = Math.cos(angle), s = Math.sin(angle)
  if (axis === 'x') { matrix[5] = c; matrix[6] = s; matrix[9] = -s; matrix[10] = c }
  if (axis === 'y') { matrix[0] = c; matrix[2] = -s; matrix[8] = s; matrix[10] = c }
  if (axis === 'z') { matrix[0] = c; matrix[1] = s; matrix[4] = -s; matrix[5] = c }
  return matrix
}

// Project a subdivided box onto its rounded surface: real beveled geometry, not a flat sprite.
function roundedBox(size: Vec3, radius: number) {
  const half = size.map(value => value / 2)
  const rounding = Math.min(radius, ...half)
  const inner = half.map(value => Math.max(0, value - rounding))
  const vertices: number[] = []
  const divisions = 8
  function point(face: number, u: number, v: number) {
    const axis = Math.floor(face / 2), sign = face % 2 ? -1 : 1
    const p = [0, 0, 0]
    p[axis] = half[axis] * sign
    p[(axis + 1) % 3] = u * half[(axis + 1) % 3]
    p[(axis + 2) % 3] = v * half[(axis + 2) % 3]
    const core = p.map((value, index) => Math.max(-inner[index], Math.min(inner[index], value)))
    const delta = p.map((value, index) => value - core[index])
    const length = Math.hypot(...delta) || 1
    const normal = delta.map(value => value / length)
    return [...core.map((value, index) => value + normal[index] * rounding), ...normal]
  }
  for (let face = 0; face < 6; face++) for (let u = 0; u < divisions; u++) for (let v = 0; v < divisions; v++) {
    const a = point(face, u / divisions * 2 - 1, v / divisions * 2 - 1)
    const b = point(face, (u + 1) / divisions * 2 - 1, v / divisions * 2 - 1)
    const c = point(face, (u + 1) / divisions * 2 - 1, (v + 1) / divisions * 2 - 1)
    const d = point(face, u / divisions * 2 - 1, (v + 1) / divisions * 2 - 1)
    vertices.push(...a, ...b, ...c, ...a, ...c, ...d)
  }
  return new Float32Array(vertices)
}

export function createRobotRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, powerPreference: 'low-power' })
  if (!gl) return null
  const shaders: WebGLShader[] = []
  const meshes: Mesh[] = []
  let program: WebGLProgram | null = null
  function dispose() { meshes.forEach(mesh => gl!.deleteBuffer(mesh.buffer)); shaders.forEach(shader => gl!.deleteShader(shader)); if (program) gl!.deleteProgram(program) }
  function shader(type: number, source: string) {
    const result = gl!.createShader(type)
    if (!result) throw new Error('Shader unavailable')
    shaders.push(result); gl!.shaderSource(result, source); gl!.compileShader(result)
    if (!gl!.getShaderParameter(result, gl!.COMPILE_STATUS)) throw new Error('Shader compilation unavailable')
    return result
  }
  try {
    const vertex = shader(gl.VERTEX_SHADER, `
      attribute vec3 aPosition; attribute vec3 aNormal;
      uniform mat4 uModel; uniform mat4 uProjection;
      varying vec3 vNormal;
      void main() { vNormal = mat3(uModel) * aNormal; gl_Position = uProjection * uModel * vec4(aPosition, 1.0); }
    `)
    const fragment = shader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec3 vNormal; uniform vec3 uColor;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 light = normalize(vec3(-0.6, 0.9, 1.8));
        float diffuse = max(dot(normal, light), 0.0);
        float shine = pow(max(dot(normal, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 28.0);
        gl_FragColor = vec4(uColor * (0.43 + diffuse * 0.57) + vec3(shine * 0.2), 1.0);
      }
    `)
    program = gl.createProgram()
    if (!program) throw new Error('Renderer unavailable')
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Renderer unavailable')
    gl.useProgram(program); gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0)
    const position = gl.getAttribLocation(program, 'aPosition'), normal = gl.getAttribLocation(program, 'aNormal')
    const model = gl.getUniformLocation(program, 'uModel'), projection = gl.getUniformLocation(program, 'uProjection'), color = gl.getUniformLocation(program, 'uColor')
    gl.enableVertexAttribArray(position); gl.enableVertexAttribArray(normal)
    function mesh(size: Vec3, radius: number, tint: Vec3) {
      const data = roundedBox(size, radius), buffer = gl!.createBuffer()
      if (!buffer) throw new Error('Geometry unavailable')
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer); gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.STATIC_DRAW)
      const result = { buffer, count: data.length / 6, color: tint }; meshes.push(result); return result
    }
    const white: Vec3 = [.94, .96, .98], silver: Vec3 = [.57, .64, .72], blue: Vec3 = [.08, .62, 1], ink: Vec3 = [.035, .09, .19]
    const head = mesh([1.5, 1.13, .64], .12, white)
    const bezel = mesh([1.31, .94, .08], .085, ink)
    const screen = mesh([1.19, .82, .08], .065, blue)
    const eye = mesh([.105, .18, .025], .01, ink)
    const glint = mesh([.032, .045, .018], .007, white)
    const cheek = mesh([.145, .066, .025], .025, [1, .46, .65])
    const smile = mesh([.13, .035, .025], .012, white)
    const smileEdge = mesh([.033, .05, .025], .01, white)
    const neck = mesh([.21, .22, .25], .025, silver)
    const body = mesh([.70, .63, .45], .07, white)
    const badge = mesh([.29, .23, .025], .035, blue)
    const badgeEye = mesh([.027, .04, .015], .005, white)
    const arm = mesh([.19, .36, .23], .06, white)
    const hand = mesh([.22, .19, .25], .055, white)
    const leg = mesh([.22, .29, .28], .035, white)
    const foot = mesh([.29, .14, .40], .035, silver)
    const antenna = mesh([.045, .31, .045], .015, ink)
    const tip = mesh([.13, .13, .13], .025, blue)
    const happyEye = mesh([.065, .028, .025], .01, ink)
    const laptopBase = mesh([1.02, .06, .64], .025, silver)
    const laptopLid = mesh([.96, .64, .07], .03, [.75, .80, .86])
    const laptopKey = mesh([.085, .014, .068], .006, ink)
    const pawPad = mesh([.13, .105, .022], .035, blue)
    const pawToe = mesh([.053, .062, .022], .02, blue)
    let yaw = -.13, pitch = .08
    let previousTime: number | null = null
    const weights = { coding: 0, curious: 0, wave: 0, happy: 0 }

    function drawMesh(shape: Mesh, parent: Matrix, x: number, y: number, z: number, local = identity()) {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, shape.buffer)
      gl!.vertexAttribPointer(position, 3, gl!.FLOAT, false, 24, 0); gl!.vertexAttribPointer(normal, 3, gl!.FLOAT, false, 24, 12)
      gl!.uniformMatrix4fv(model, false, multiply(multiply(parent, translate(x, y, z)), local))
      gl!.uniform3fv(color, shape.color); gl!.drawArrays(gl!.TRIANGLES, 0, shape.count)
    }
    return {
      draw(time: number, pose: RobotPose) {
        if (gl!.isContextLost()) return
        const ratio = Math.min(window.devicePixelRatio || 1, 2)
        const w = Math.round(canvas.clientWidth * ratio), h = Math.round(canvas.clientHeight * ratio)
        if (!w || !h) return
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
        gl!.viewport(0, 0, w, h); gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT)
        const t = pose.animated ? time / 1000 : 0
        const behavior = robotBehavior(t, pose.animated, pose.hovered)
        const blend = previousTime === null || !pose.animated ? 1 : 1 - Math.exp(-Math.min(.1, Math.max(0, t - previousTime)) * 8)
        previousTime = t
        for (const key of ['coding', 'curious', 'wave', 'happy'] as const) weights[key] += ((behavior === key ? 1 : 0) - weights[key]) * blend
        const work = weights.coding, joy = weights.happy
        const targetYaw = pose.animated && pose.hovered ? pose.x * .34 : -.13 + Math.sin(t * 1.1) * .42 * weights.curious + work * .07
        const targetPitch = pose.animated && pose.hovered ? -.08 * pose.y + .08 : .08
        yaw += (targetYaw - yaw) * blend; pitch += (targetPitch - pitch) * blend
        const p = identity(); p[0] = 1 / (1.65 * w / h); p[5] = 1 / 1.65; p[10] = -.1; p[14] = -.1
        gl!.uniformMatrix4fv(projection, false, p)
        const bob = pose.animated ? Math.sin(t * 1.7) * .035 * (1 - work) + Math.abs(Math.sin(t * 7)) * .13 * joy : 0
        const sway = pose.animated ? Math.sin(t * 5) * .065 * joy : 0
        const root = multiply(translate(Math.sin(t * 4) * .035 * joy, -.18 - work * .10 + bob, 0), multiply(rotate('y', yaw), multiply(rotate('x', pitch), rotate('z', sway))))
        const headRoot = multiply(root, multiply(rotate('z', pose.animated ? Math.sin(t * .9) * (.018 + .055 * weights.curious) : 0), rotate('x', work * .13)))
        const blinkPhase = t % 5.4
        const blink = pose.animated && blinkPhase > 4.98 && blinkPhase < 5.14 ? .1 : 1
        drawMesh(head, headRoot, 0, .64, 0)
        drawMesh(bezel, headRoot, 0, .64, .326)
        drawMesh(screen, headRoot, 0, .64, .373)
        for (const side of [-1, 1]) {
          if (blink === 1 && (joy > .3 || work > .5)) {
            drawMesh(happyEye, headRoot, side * .275 - .026, .725, .423, rotate('z', .45))
            drawMesh(happyEye, headRoot, side * .275 + .026, .725, .423, rotate('z', -.45))
          } else {
            drawMesh(eye, headRoot, side * .275, .71, .423, scale(1, blink, 1))
            if (blink === 1) drawMesh(glint, headRoot, side * .275 - .018, .755, .444)
          }
          drawMesh(cheek, headRoot, side * .425, .485, .428)
          drawMesh(smileEdge, headRoot, side * .075, .477, .428)
          const hip = multiply(multiply(root, translate(side * .22, -.75, 0)), rotate('x', -work * 1.05))
          drawMesh(leg, hip, 0, -.15, 0); drawMesh(foot, hip, 0, -.34, .045)
          const wave = side === 1 ? weights.wave : 0
          const angle = side * .33 * (1 - work - wave) + (-side * .75) * work + (1.95 + Math.sin(t * 8) * .25) * wave + side * joy * .45
          const typing = work * (-.65 + Math.sin(t * 13 + side * 2) * .10)
          const shoulder = multiply(multiply(root, translate(side * .43, -.22 - work * .17, 0)), multiply(rotate('z', angle), rotate('x', typing)))
          drawMesh(arm, shoulder, 0, -.15, 0); drawMesh(hand, shoulder, 0, -.37, .015)
        }
        drawMesh(smile, headRoot, 0, .453, .429)
        drawMesh(neck, root, 0, -.01, 0)
        drawMesh(body, root, 0, -.43, 0)
        drawMesh(badge, root, 0, -.38, .238)
        drawMesh(badgeEye, root, -.055, -.36, .255); drawMesh(badgeEye, root, .055, -.36, .255)
        drawMesh(antenna, headRoot, .16, 1.34, 0, rotate('z', -.32))
        drawMesh(tip, headRoot, .22, 1.51, 0, rotate('z', pose.animated ? Math.sin(t * 2) * .12 : 0))
        if (work > .01) {
          // The lid faces the visitor; the keyboard sits between the robot and its screen.
          const laptop = multiply(multiply(root, translate(.23, -.69, .57)), scale(work, work, work))
          drawMesh(laptopBase, laptop, 0, 0, 0)
          for (let row = 0; row < 3; row++) for (let key = 0; key < 6; key++) drawMesh(laptopKey, laptop, -.31 + key * .12, .039, -.17 + row * .11)
          const lid = multiply(multiply(laptop, translate(.17, .32, .31)), rotate('x', -.23))
          drawMesh(laptopLid, lid, 0, 0, 0)
          drawMesh(pawPad, lid, 0, -.012, .047)
          for (const [x, y] of [[-.095, .055], [-.033, .106], [.033, .106], [.095, .055]]) drawMesh(pawToe, lid, x, y, .047)
        }
      },
      dispose,
    }
  } catch { dispose(); return null }
}
