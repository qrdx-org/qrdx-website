// The hero: flying through a module lattice, the structure ML-DSA's security rests on.
//
// Each node sits a little off its lattice point (the "error" in learning-with-errors). Real
// testnet blocks light one node each (placed by the block's hash, see lattice.ts), and a
// finalized epoch sends a wave through the lattice. Everything else is camera motion.

struct Params {
  resolution: vec2f,
  pointer: vec2f,
  camPos: vec3f,
  time: f32,
  bg: vec3f,
  yaw: f32,
  line: vec3f,
  pitch: f32,
  signal: vec3f,
  dark: f32,
  waveCenter: vec3f,
  waveAge: f32,
  intensity: f32,
  fade: f32,
  // Recent blocks: lattice cell in xyz, seconds since it arrived in w.
  blocks: array<vec4f, 6>,
}

@group(0) @binding(0) var<uniform> params: Params;

// The lattice basis, sheared so it reads as a module lattice rather than a cubic grid.
// lattice.ts holds the same matrix to place blocks. UNBASIS is its inverse, lattice to world.
const BASIS = mat3x3f(1.0, 0.0, 0.0, 0.2, 1.0, 0.0, 0.1, 0.14, 1.0);
const UNBASIS = mat3x3f(1.0, 0.0, 0.0, -0.2, 1.0, 0.0, -0.072, -0.14, 1.0);
const STEPS = 96;
const FAR = 14.0;

fn hash31(p: vec3f) -> f32 {
  var q = fract(p * 0.1031);
  q += dot(q, q.zyx + 31.32);
  return fract((q.x + q.y) * q.z);
}

fn hash33(p: vec3f) -> vec3f {
  var q = fract(p * vec3f(0.1031, 0.103, 0.0973));
  q += dot(q, q.yxz + 33.33);
  return fract((q.xxy + q.yxx) * q.zyx);
}

fn hash21(p: vec2f) -> f32 {
  var q = fract(vec3f(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

fn rotY(a: f32) -> mat3x3f {
  let c = cos(a);
  let s = sin(a);
  return mat3x3f(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

fn rotX(a: f32) -> mat3x3f {
  let c = cos(a);
  let s = sin(a);
  return mat3x3f(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = params.resolution;
  let aspect = res.x / max(res.y, 1.0);
  let c = vec2f((uv.x - 0.5) * aspect, 0.5 - uv.y) * 2.0;
  let rot = rotY(params.yaw) * rotX(params.pitch);
  let rd = normalize(rot * vec3f(c, 2.4));
  let ro = params.camPos;

  // Start each pixel's march a little further on, so step patterns turn into fine noise.
  var t = 0.06 + hash21(uv * res) * 0.08;
  var nodes = 0.0;
  var struts = 0.0;
  var lit = 0.0;
  var last = vec3f(1e9);
  let waveR = params.waveAge * 3.4;
  let waveFade = exp(-params.waveAge * 0.55) * step(0.0, params.waveAge);

  for (var i = 0; i < STEPS; i++) {
    let p = ro + rd * t;
    let l = BASIS * p;
    let cell = floor(l + 0.5);
    let q = l - cell;
    let ds = min(min(length(q.yz), length(q.xz)), length(q.xy)) - 0.003;
    // Thin struts need small steps near them; elsewhere steps stay short enough to visit every cell.
    let h = clamp(ds * 0.8 + 0.015, 0.015, 0.22);
    let fog = exp(-t * 0.2) * smoothstep(0.5, 1.8, t);
    struts += fog * h * 0.00009 / (ds * ds + 0.000012);

    // Each cell's node once, on entering the cell: its glow from how close the ray passes it.
    if (any(cell != last)) {
      last = cell;
      let err = (hash33(cell) - 0.5) * 0.18;
      let oc = UNBASIS * (cell + err) - ro;
      let tc = dot(oc, rd);
      if (tc > 0.0) {
        let b2 = max(dot(oc, oc) - tc * tc, 0.0);
        let nf = exp(-tc * 0.2) * smoothstep(0.6, 2.0, tc);
        let n = nf * 0.0011 / (b2 + 0.0009);
        // A few nodes burn brighter than the rest, so the field has depth cues and rhythm.
        nodes += n * (0.35 + 2.6 * pow(hash31(cell + 3.7), 9.0));

        // The finality wave: a shell expanding from where the epoch was finalized.
        let shell = (length(cell - params.waveCenter) - waveR) / 0.6;
        lit += n * 1.4 * waveFade * exp(-shell * shell);

        // Blocks: the node in each block's cell flares, then cools.
        for (var b = 0; b < 6; b++) {
          let blk = params.blocks[b];
          if (blk.w < 3.0 && all(cell == blk.xyz)) {
            lit += n * 7.0 * exp(-blk.w * 1.7) * (1.0 - exp(-blk.w * 30.0));
          }
        }
      }
    }

    t += h;
    if (t > FAR) {
      break;
    }
  }

  // Keep the side the headline sits on calm: the left on wide screens, the top on phones.
  let tall = smoothstep(1.05, 0.8, aspect);
  let wide = mix(0.16, 1.0, smoothstep(0.08, 0.72, uv.x)) * smoothstep(1.0, 0.7, uv.y);
  let narrow = mix(0.12, 1.0, smoothstep(0.3, 0.95, uv.y)) * smoothstep(1.0, 0.9, uv.y);
  let calm = mix(wide, narrow, tall) * params.intensity * params.fade;

  let a = (1.0 - exp(-(nodes * 1.6 + struts * 0.6))) * calm;
  let s = (1.0 - exp(-lit * 1.6)) * params.fade * mix(0.35, 1.0, calm / max(params.intensity * params.fade, 0.001));
  var col = mix(params.bg, params.line, a * mix(0.55, 0.85, params.dark));
  col = mix(col, params.signal, s);
  // On ink the signal also glows past its own colour.
  col += params.signal * s * s * 0.35 * params.dark;

  // Dither, so the long gradients into the background do not band.
  col += (hash21(uv * res + fract(params.time) * 61.0) - 0.5) / 255.0;
  return vec4f(col, 1.0);
}
