// A validator's ML-DSA-65 public key, byte by byte: 1,952 columns on a 61 x 32 grid, each as
// tall as its byte, in monochrome chrome that brightens with it. The first 33 bytes, as many as a
// whole secp256k1 public key, are solid ink.
// One instanced draw, no vertex buffers: each instance builds its box from vertex_index.

struct Camera {
  viewProjection: mat4x4f,
}

struct Scene {
  bg: vec3f,
  time: f32,
  line: vec3f,
  rise: f32,
  signal: vec3f,
  dark: f32,
  // Bytes in the key; 0 until it has been read.
  count: f32,
  scan: f32,
  eye: vec3f,
  // Distance from the eye at which columns start fading into the background.
  fog: f32,
}

@group(0) @binding(0) var<uniform> camera: Camera;
@group(0) @binding(1) var<uniform> scene: Scene;
@group(0) @binding(2) var<storage, read> key: array<u32>;

const COLS = 61u;
const ROWS = 32u;
const CLASSIC = 33u;
const HEIGHT = 3.4;

struct Out {
  @builtin(position) position: vec4f,
  @location(0) normal: vec3f,
  @location(1) world: vec3f,
  @location(2) @interpolate(flat) index: u32,
  @location(3) value: f32,
}

// Corner k (0..5) of face f (0..5) of the unit box [-1, 1]^3, two triangles per face.
fn corner(f: u32, k: u32) -> vec3f {
  var tri = array<vec2f, 6>(vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(-1.0, 1.0));
  let s = tri[k];
  switch f {
    case 0u: { return vec3f(1.0, s.x, s.y); }
    case 1u: { return vec3f(-1.0, s.y, s.x); }
    case 2u: { return vec3f(s.y, 1.0, s.x); }
    case 3u: { return vec3f(s.x, -1.0, s.y); }
    case 4u: { return vec3f(s.x, s.y, 1.0); }
    default: { return vec3f(s.y, s.x, -1.0); }
  }
}

fn faceNormal(f: u32) -> vec3f {
  var n = array<vec3f, 6>(vec3f(1.0, 0.0, 0.0), vec3f(-1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), vec3f(0.0, -1.0, 0.0), vec3f(0.0, 0.0, 1.0), vec3f(0.0, 0.0, -1.0));
  return n[f];
}

@vertex fn vs_main(@builtin(vertex_index) v: u32, @builtin(instance_index) i: u32) -> Out {
  let f = v / 6u;
  let c = corner(f, v % 6u);
  let has = f32(i) < scene.count;
  let byte = select(0.0, f32(key[i]) / 255.0, has);
  // The columns rise in reading order, a wave across the key.
  let order = f32(i) / f32(COLS * ROWS);
  let grow = smoothstep(order * 0.7, order * 0.7 + 0.3, scene.rise);
  let h = 0.06 + byte * HEIGHT * grow;
  let col = f32(i % COLS);
  let row = f32(i / COLS);
  // Row 0, where the key starts, is the front row.
  let base = vec3f(col - f32(COLS - 1u) * 0.5, 0.0, f32(ROWS - 1u) * 0.5 - row);
  let local = vec3f(c.x * 0.34, (c.y * 0.5 + 0.5) * h, c.z * 0.34);

  var out: Out;
  out.world = base + local;
  out.position = camera.viewProjection * vec4f(out.world, 1.0);
  out.normal = faceNormal(f);
  out.index = i;
  out.value = byte;
  return out;
}

/** A plain studio: a broad light overhead, a strip to the right, the room. */
fn studio(r: vec3f) -> vec3f {
  let top = smoothstep(0.35, 0.95, r.y);
  let strip = exp(-pow((r.x - 0.7) / 0.1, 2.0)) * smoothstep(-0.4, 0.4, r.y);
  let sky = smoothstep(-0.4, 0.9, r.y);
  if (scene.dark > 0.5) {
    return mix(vec3f(0.03), vec3f(0.2), sky) + vec3f(top * 1.3 + strip * 0.9);
  }
  return mix(vec3f(0.62), vec3f(1.0), sky) + vec3f(top * 0.4 + strip * 0.3);
}

@fragment fn fs_main(in: Out) -> @location(0) vec4f {
  let v = normalize(scene.eye - in.world);
  let cosI = clamp(dot(in.normal, v), 0.0, 1.0);
  let top = step(0.5, in.normal.y);
  // Darker toward each column's foot: a cheap stand-in for the light its neighbours block.
  let foot = mix(0.45, 1.0, smoothstep(0.0, 1.6, in.world.y));

  // A read head passes over the bytes in order, like a verifier walking the key.
  let d = (f32(in.index) - scene.scan) / 24.0;
  let head = exp(-d * d);

  // Each column is mirror-bright, brighter the larger its byte, so its value reads twice: in its
  // height and its tone.
  let fres = 0.04 + 0.96 * pow(1.0 - max(cosI, 0.15), 5.0);
  let mirror = mix(mix(0.62, 0.42, scene.dark), 1.0, fres);
  let tint = vec3f(mix(0.5, 1.1, in.value));
  var col = studio(reflect(-v, in.normal)) * tint * mirror * foot;
  // On ink, a soft light from the left keeps the columns' sides from going black, so their
  // heights still read.
  col += tint * 0.22 * max(dot(in.normal, normalize(vec3f(-0.8, 0.5, 0.3))), 0.0) * foot * scene.dark;
  col += head * 0.25 * top * mix(vec3f(-0.4), vec3f(1.0), scene.dark);
  if (in.index < CLASSIC) {
    let lit = clamp(0.45 + (0.3 + 0.5 * top) * foot * 0.75, 0.0, 1.0);
    col = mix(scene.bg, scene.signal, lit);
  }
  // Fade the far rows into the background.
  let far = smoothstep(scene.fog, scene.fog + 34.0, distance(in.world, scene.eye));
  col = mix(col, scene.bg, far * 0.7);
  return vec4f(col, 1.0);
}
