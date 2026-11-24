// The hero: a sea of dots. Points on a grid over a liquid surface, seen from a little above it,
// each printed as a round halftone dot as large as the light it catches: small where the surface
// faces the viewer, larger toward the horizon where it mirrors the sky, largest in the glitter
// path of a low light ahead (which drifts with the pointer). Monochrome: ink dots on the page.
//
// Nothing moves it but the chain and the visitor: slow swells cross it all the time, each real
// testnet block drops a ripple at the point its hash chooses (sea-scene.ts), and a finalized
// epoch sends one swell in from the horizon. Scrolling carries the eye forward over it.

struct Params {
  resolution: vec2f,
  // The pointer, smoothed, -1 to 1 on each axis: it turns the eye and the light a little.
  pointer: vec2f,
  time: f32,
  // 0 to 1: how far the hero has scrolled out of view.
  scroll: f32,
  dark: f32,
  // How strongly the sea shows: 1 on the home hero, lower behind page titles.
  intensity: f32,
  bg: vec3f,
  // Seconds since an epoch was finalized (99: not while the page has been open).
  waveAge: f32,
  fg: vec3f,
  fade: f32,
  // Recent blocks' ripples: where they fell on the sea (x, z) and their age in seconds (w).
  ripples: array<vec4f, 8>,
}

@group(0) @binding(0) var<uniform> params: Params;

// World units between dots, the eye's height over the sea, the lens, how fast ripples run.
const GRID = 0.042;
const EYE = 1.0;
const FOCAL = 1.7;
const SPEED = 0.42;

/**
 * A tone (0 to about 0.8) printed as a fine halftone screen: round dots on a grid turned 45
 * degrees, as on newsprint, each as large as the tone. Where the sea's own dots are too small to
 * draw, their tone is printed with it.
 */
fn screenDot(pixel: vec2f, v: f32) -> f32 {
  let cell = 4.0;
  let q = mat2x2f(0.7071, 0.7071, -0.7071, 0.7071) * pixel / cell;
  let d = length(fract(q) - 0.5) * cell;
  let r = sqrt(max(v, 0.0) / 3.1416) * cell;
  return clamp(r - d + 0.5, 0.0, 1.0);
}

/** Where the horizon sits, from the top: higher on wide screens, lower on phones (below the headline). */
fn horizon(tall: f32) -> f32 {
  return mix(0.42, 0.55, tall);
}

/** The eye's distance forward over the sea: scrolling carries it on. */
fn eyeZ() -> f32 {
  return params.scroll * 1.4;
}

/** The surface at a point of the sea (x, z): its height, and how much the chain has lit it. */
fn surface(p: vec2f) -> vec2f {
  let t = params.time;
  // Long swells of different heights and headings, the longest bent by a slower one, so the
  // surface never settles into a grid.
  let bend = 1.3 * sin(dot(p, vec2f(0.5, -1.2)) + t * 0.27);
  var h = 0.02 * sin(dot(p, vec2f(1.7, 0.9)) + t * 0.7 + bend) + 0.008 * sin(dot(p, vec2f(-1.3, 2.5)) + t * 1.0 + 0.6 * bend) + 0.005 * sin(dot(p, vec2f(3.6, 1.2)) + t * 1.55 + 1.0) + 0.003 * sin(dot(p, vec2f(-2.8, -4.7)) + t * 2.2 + 2.0);
  var lift = 0.0;
  for (var i = 0; i < 8; i++) {
    let r = params.ripples[i];
    if (r.w > 9.0) {
      continue;
    }
    // A ring running out from where the block fell, fading as it widens.
    let off = distance(p, r.xz) - r.w * SPEED;
    let env = exp(-r.w * 0.5) * exp(-pow(off / 0.15, 2.0)) * smoothstep(0.0, 0.2, r.w);
    h += 0.026 * env * cos(off * 32.0);
    lift += env;
  }
  // A finalized epoch: one long swell in from the horizon, toward the viewer.
  let wa = params.waveAge;
  let front = eyeZ() + 6.5 - wa * 1.4;
  let swell = exp(-pow((p.y - front) / 0.35, 2.0)) * exp(-wa * 0.12) * step(0.0, wa);
  h += 0.035 * swell;
  lift += 0.7 * swell;
  return vec2f(h, lift);
}

/** How much light the dot at `p` (height and lift `s`) sends to the eye: its size, 0 to about 1. */
fn tone(p: vec2f, s: vec2f, eye: vec3f) -> f32 {
  let e = 0.004;
  let n = normalize(vec3f(-(surface(p + vec2f(e, 0.0)).x - s.x) / e, 1.0, -(surface(p + vec2f(0.0, e)).x - s.x) / e));
  let v = normalize(vec3f(p.x, s.x, p.y) - eye);
  let r = reflect(v, n);
  // A low light ahead, a little to the side the pointer is on.
  let sun = normalize(vec3f(0.18 + params.pointer.x * 0.4, 0.14, 1.0));
  let glitter = pow(max(dot(r, sun), 0.0), 80.0) * 2.4;
  // The sky is brightest at the horizon, so slopes facing it read as larger dots.
  let sky = 0.22 + 0.78 * exp(-max(r.y, 0.0) * 4.0);
  let fres = 0.02 + 0.98 * pow(1.0 - max(dot(-v, n), 0.0), 5.0);
  return 0.06 + mix(0.4, 1.0, fres) * sky * 0.9 + glitter + 0.6 * s.y;
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = params.resolution;
  let aspect = res.x / max(res.y, 1.0);
  let tall = smoothstep(1.05, 0.8, aspect);
  let c = vec2f((uv.x - 0.5) * aspect, 0.5 - uv.y) * 2.0;
  // The screen's units per device pixel.
  let px = 2.0 / max(res.y, 1.0);

  // The eye: pitched down so the horizon lands where `horizon` says; the pointer turns it a little.
  let pitch = atan((1.0 - 2.0 * horizon(tall)) / FOCAL) + params.pointer.y * 0.015;
  let yaw = params.pointer.x * 0.05;
  let fwd = vec3f(sin(yaw) * cos(pitch), -sin(pitch), cos(yaw) * cos(pitch));
  let up = vec3f(sin(yaw) * sin(pitch), cos(pitch), cos(yaw) * sin(pitch));
  let right = vec3f(cos(yaw), 0.0, -sin(yaw));
  let eye = vec3f(0.0, EYE, eyeZ());
  let rd = normalize(right * c.x + up * c.y + fwd * FOCAL);

  var ink = 0.0;
  if (rd.y < -0.001) {
    let dist = EYE / -rd.y;
    let hit = eye + rd * dist;
    let cell = round(hit.xz / GRID);
    // A dot lifted by a swell shows above where its point lies on the flat sea, so the points a
    // few rows nearer are candidates too.
    for (var k = -3; k <= 1; k++) {
      let p = vec2f(cell.x, cell.y + f32(k)) * GRID;
      let s = surface(p);
      let w = vec3f(p.x, s.x, p.y) - eye;
      let z = dot(w, fwd);
      if (z < 0.05) {
        continue;
      }
      let at = vec2f(dot(w, right), dot(w, up)) * FOCAL / z;
      // Half the spacing between dots here, on screen, across; rows are closer by the angle the
      // sea is seen at, so each dot is an ellipse lying on it.
      let half = GRID * 0.5 * FOCAL / z;
      let squash = clamp((EYE - s.x) / length(w), 0.06, 1.0);
      let e = (c - at) * vec2f(1.0, 1.0 / squash);
      let d = length(e);
      // Where rows close up below a pixel, a dot is drawn as the share of its cell it covers, an
      // even tone, rather than shimmering; near, as itself.
      let near = smoothstep(0.6, 1.6, half * squash / px);
      if (d > half && near > 0.99) {
        continue;
      }
      let size = clamp(sqrt(tone(p, s, eye)), 0.14, 1.0) * 0.94;
      let cover = select(0.0, clamp((half * size - d) * squash / px + 0.5, 0.0, 1.0), d <= half);
      let share = 0.785 * size * size;
      ink = max(ink, mix(screenDot(uv * res, share * exp(-max(z - 2.5, 0.0) * 0.12)), cover, near));
    }
  }

  // Keep the side the headline sits on calm: the left on wide screens, the top on phones.
  let wideCalm = mix(0.22, 1.0, smoothstep(0.2, 0.72, uv.x));
  let narrowCalm = mix(0.35, 1.0, smoothstep(0.6, 0.92, uv.y));
  let calm = mix(wideCalm, narrowCalm, tall) * params.intensity * params.fade;
  let strength = mix(0.62, 0.8, params.dark);
  return vec4f(mix(params.bg, params.fg, ink * strength * calm), 1.0);
}
