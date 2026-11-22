// The hero: a lattice made of liquid, the structure ML-DSA's security rests on.
//
// Nodes on a sheared (module) lattice, joined by struts, all of one liquid: they flow into one
// another, thicken and thin as the form turns, and taper away at its edge. The surface is
// mirror-bright with a thin film over it, so its colour comes from interference, shifting as the
// film's thickness and the viewing angle change.
//
// Real testnet blocks swell the node their hash points at (see lattice-scene.ts) and light it in
// the signal colour. A finalized epoch sends one band of colour out through the whole form.

struct Params {
  resolution: vec2f,
  // The pointer, smoothed, -1 to 1 on each axis: it tilts the form a little.
  pointer: vec2f,
  time: f32,
  // How far the form has turned, in radians.
  spin: f32,
  scroll: f32,
  dark: f32,
  bg: vec3f,
  waveAge: f32,
  line: vec3f,
  intensity: f32,
  signal: vec3f,
  fade: f32,
  // Recent blocks: the lattice node in xyz, seconds since it arrived in w.
  blocks: array<vec4f, 6>,
}

@group(0) @binding(0) var<uniform> params: Params;

// The lattice basis, sheared so it reads as a module lattice rather than a cubic grid, and its
// inverse. lattice-scene.ts holds the same matrices to choose a block's node.
const BASIS = mat3x3f(1.0, 0.0, 0.0, 0.2, 1.0, 0.0, 0.1, 0.14, 1.0);
const UNBASIS = mat3x3f(1.0, 0.0, 0.0, -0.2, 1.0, 0.0, -0.072, -0.14, 1.0);
// Lattice cells per world unit, the form's radius, and the camera.
const CELLS = 1.7;
const RADIUS = 1.45;
const FOCAL = 2.4;
const STEPS = 110;

fn hash21(p: vec2f) -> f32 {
  var q = fract(vec3f(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

fn rotX(a: f32) -> mat3x3f {
  let c = cos(a);
  let s = sin(a);
  return mat3x3f(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

fn rotY(a: f32) -> mat3x3f {
  let c = cos(a);
  let s = sin(a);
  return mat3x3f(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

fn rotZ(a: f32) -> mat3x3f {
  let c = cos(a);
  let s = sin(a);
  return mat3x3f(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0);
}

fn smin(a: f32, b: f32, k: f32) -> f32 {
  let h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

fn smax(a: f32, b: f32, k: f32) -> f32 {
  return -smin(-a, -b, k);
}

/** Where the form sits: right of the headline on wide screens, below it on phones. */
fn center(aspect: f32) -> vec3f {
  let tall = smoothstep(1.05, 0.8, aspect);
  let wide = vec3f(0.68 * aspect, -0.12, 0.0);
  let narrow = vec3f(0.0, -1.55, 0.9);
  return mix(wide, narrow, tall) + vec3f(0.0, params.scroll * 1.2, 0.0);
}

/** World to the form's own space: its slow turn, a fixed tilt, and the pointer. */
fn turn() -> mat3x3f {
  return rotZ(0.32) * rotX(0.5 + params.pointer.y * 0.18) * rotY(params.spin + params.pointer.x * 0.3);
}

/**
 * How a block's node swells and glows: at once, then gone within about a second. Testnet makes
 * several blocks a second, so the form glints with them rather than throbbing.
 */
fn pulse(age: f32) -> f32 {
  return exp(-age * 2.4) * (1.0 - exp(-age * 16.0)) * 1.6;
}

/** The band a finalized epoch sends out from the centre: 1 on it, 0 elsewhere. */
fn wave(r: f32) -> f32 {
  let x = (r - params.waveAge * 0.9) / 0.22;
  return exp(-x * x) * exp(-params.waveAge * 0.35) * step(0.0, params.waveAge);
}

/** Distance (in world units) to the liquid, at a point in the form's own space. */
fn form(o: vec3f) -> f32 {
  let t = params.time;
  // Liquid, not machined: everything sways a little.
  let p = o + 0.03 * sin(o.yzx * 3.1 + vec3f(0.9, 0.7, 1.1) * t);
  let r = length(p);
  let l = BASIS * (p * CELLS);
  let cell = round(l);
  let q = l - cell;

  // Thickness flows through the lattice as slow waves; continuous, so struts never step.
  let flow = sin(l.x * 0.9 + t * 0.7) * sin(l.y * 0.8 - t * 0.5) * sin(l.z * 1.1 + t * 0.6);
  let w = wave(r);
  let rs = 0.085 + 0.045 * flow + 0.05 * w;
  let rn = 0.2 + 0.06 * flow + 0.08 * w;

  let struts = smin(smin(length(q.yz), length(q.xz), 0.06), length(q.xy), 0.06) - rs;
  var nodes = length(q) - rn;
  // A block's node swells past its own cell, so it is a sphere of its own, blended in.
  for (var b = 0; b < 6; b++) {
    let blk = params.blocks[b];
    if (blk.w < 2.0) {
      nodes = smin(nodes, length(l - blk.xyz) - rn - 0.08 * pulse(blk.w), 0.1);
    }
  }
  let lattice = smin(nodes, struts, 0.15) / CELLS;
  // The form's edge: a slowly wobbling sphere that the struts end at, rounded like drops.
  let edge = r - RADIUS * (0.8 + 0.06 * sin(p.x * 2.1 + t * 0.4) * sin(p.y * 1.7 - t * 0.3));
  return smax(lattice, edge, 0.12) * 0.7;
}

fn normalAt(o: vec3f) -> vec3f {
  let e = vec2f(0.0015, -0.0015);
  return normalize(e.xyy * form(o + e.xyy) + e.yyx * form(o + e.yyx) + e.yxy * form(o + e.yxy) + e.xxx * form(o + e.xxx));
}

/**
 * What the surface mirrors: a studio. A broad light overhead, two tall strips at the sides, a
 * low cyan rim from behind on the left, a soft fill behind the camera, and the room itself (dark, or pale in light mode, with
 * black cards to give the chrome its edges).
 */
fn studio(r: vec3f) -> vec3f {
  let top = smoothstep(0.45, 0.9, dot(r, normalize(vec3f(0.2, 1.0, -0.3))));
  let right = exp(-pow((r.x - 0.75) / 0.09, 2.0)) * smoothstep(-0.6, 0.3, r.y);
  let left = exp(-pow((r.x + 0.85) / 0.06, 2.0)) * smoothstep(-0.3, 0.5, r.y);
  let rim = smoothstep(0.55, 0.95, dot(r, normalize(vec3f(-0.75, 0.15, 0.65))));
  // A broad, dim light behind the camera, so faces turned toward the viewer show their film.
  let front = smoothstep(0.3, 0.95, dot(r, normalize(vec3f(0.35, 0.3, -1.0))));
  let sky = smoothstep(-0.6, 0.8, r.y);
  if (params.dark > 0.5) {
    let room = mix(vec3f(0.01), vec3f(0.09), sky);
    return room + vec3f(top * 1.8 + right * 1.4 + left * 0.8 + front * 0.7) + params.signal * rim * 0.7;
  }
  let cards = exp(-pow((r.x - 0.35) / 0.12, 2.0)) * smoothstep(0.2, -0.4, r.y) + exp(-pow((r.y + 0.05) / 0.08, 2.0)) * 0.5;
  let room = mix(vec3f(0.7), vec3f(1.0), sky) * (1.0 - 0.45 * cards);
  return room + vec3f(top * 0.5 + right * 0.4 + left * 0.25 + front * 0.15) + params.signal * rim * 0.25;
}

/** Thin-film interference: what a film `d` micrometres thick reflects at this angle. */
fn film(d: f32, cosI: f32) -> vec3f {
  let cosT = sqrt(1.0 - (1.0 - cosI * cosI) / (1.33 * 1.33));
  let c = 0.5 - 0.5 * cos(6.2831853 * 2.0 * 1.33 * d * cosT / vec3f(0.65, 0.532, 0.45));
  // Real films are less saturated than the formula, and the mirror under it reflects too: on
  // ink the colour runs deeper, on paper it stays pearl.
  return mix(vec3f(1.0), c * 1.5, mix(0.42, 0.62, params.dark));
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = params.resolution;
  let aspect = res.x / max(res.y, 1.0);
  let tall = smoothstep(1.05, 0.8, aspect);
  let c = vec2f((uv.x - 0.5) * aspect, 0.5 - uv.y) * 2.0;
  let ro = vec3f(0.0, 0.0, -mix(3.9, 4.8, tall));
  let rd = normalize(vec3f(c, FOCAL));
  let m = turn();
  let back = transpose(m);
  let mid = center(aspect);
  let t = params.time;

  var col = params.bg;
  var glow = 0.0;

  // Only march where the ray meets the form's bounding sphere.
  let oc = ro - mid;
  let bq = dot(oc, rd);
  let disc = bq * bq - dot(oc, oc) + RADIUS * RADIUS;
  if (disc > 0.0) {
    let s = sqrt(disc);
    var d = max(-bq - s, 0.0);
    let far = -bq + s;
    var hit = false;
    var o = vec3f(0.0);
    for (var i = 0; i < STEPS; i++) {
      o = m * (ro + rd * d - mid);
      let h = form(o);
      if (h < 0.0008 * d) {
        hit = true;
        break;
      }
      d += h;
      if (d > far) {
        break;
      }
    }

    if (hit) {
      // Shade in the world: the normal is found in the form's space and turned back.
      let no = normalAt(o);
      let n = back * no;
      let cosI = clamp(dot(n, -rd), 0.0, 1.0);
      // Capped at the very edge, where single pixels would otherwise catch the whole studio.
      let fres = 0.04 + 0.96 * pow(1.0 - max(cosI, 0.15), 5.0);
      // Crevices where nodes meet struts see less of the room.
      let ao = clamp(form(o + no * 0.05) / 0.05, 0.25, 1.0);
      let rr = length(o);
      var thick = 0.21 + 0.06 * sin(dot(o, vec3f(2.3, 1.4, 1.9)) + t * 0.25) + 0.05 * (1.0 - cosI);
      thick += 0.08 * wave(rr);
      let mirror = mix(mix(0.62, 0.42, params.dark), 1.0, fres);
      col = studio(reflect(rd, n)) * film(thick, cosI) * mirror * ao;

      // A block's node glows from inside while it swells.
      let l = BASIS * (o * CELLS);
      let cell = round(l);
      for (var b = 0; b < 6; b++) {
        let blk = params.blocks[b];
        if (blk.w < 2.0 && all(cell == blk.xyz)) {
          glow += pulse(blk.w) * 1.4 * exp(-dot(l - cell, l - cell) * 6.0);
        }
      }
      glow += wave(rr) * 0.35;
    }

    // A halo around each block's node, seen through and around the form.
    for (var b = 0; b < 6; b++) {
      let blk = params.blocks[b];
      if (blk.w < 2.0) {
        let node = back * (UNBASIS * blk.xyz / CELLS) + mid;
        let to = node - ro;
        let along = dot(to, rd);
        let b2 = max(dot(to, to) - along * along, 0.0);
        glow += pulse(blk.w) * 0.004 / (b2 + 0.004);
      }
    }
  }

  // Keep the side the headline sits on calm: the left on wide screens, the top on phones.
  let wideCalm = mix(0.35, 1.0, smoothstep(0.1, 0.6, uv.x));
  let narrowCalm = mix(0.2, 1.0, smoothstep(0.5, 0.88, uv.y));
  let calm = mix(wideCalm, narrowCalm, tall) * params.intensity * params.fade;
  col = mix(params.bg, col, calm);

  let s = (1.0 - exp(-glow)) * params.fade * mix(0.5, 1.0, calm);
  col = mix(col, params.signal, s * 0.8);
  col += params.signal * s * s * 0.5 * params.dark;

  // Dither, so the long gradients into the background do not band.
  col += (hash21(uv * res + fract(t) * 61.0) - 0.5) / 255.0;
  return vec4f(col, 1.0);
}
