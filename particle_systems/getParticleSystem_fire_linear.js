import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

const _VS = `
uniform float pointMultiplier;

attribute float size;
attribute float angle;
attribute vec4 aColor;

varying vec4 vColor;
varying vec2 vAngle;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;

  vAngle = vec2(cos(angle), sin(angle));
  vColor = aColor;
}`;

const _FS = `
uniform sampler2D diffuseTexture;

varying vec4 vColor;
varying vec2 vAngle;

void main() {
  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
  gl_FragColor = texture2D(diffuseTexture, coords) * vColor;
}`;

function getLinearSpline(lerp) {
  const points = [];
  const _lerp = lerp;

  function addPoint(t, d) {
    points.push([t, d]);
  }

  function getValueAt(t) {
    let p1 = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i][0] >= t) break;
      p1 = i;
    }
    const p2 = Math.min(points.length - 1, p1 + 1);
    if (p1 == p2) return points[p1][1];
    return _lerp(
      (t - points[p1][0]) / (points[p2][0] - points[p1][0]),
      points[p1][1],
      points[p2][1],
    );
  }
  return { addPoint, getValueAt };
}

function getParticleSystem_fire_linear(params) {
  const { camera, emitter, parent, rate, texture } = params;

  const uniforms = {
    diffuseTexture: {
      value: new THREE.TextureLoader().load(texture),
    },
    pointMultiplier: {
      value: window.innerHeight / (2.0 * Math.tan((30.0 * Math.PI) / 180.0)),
    },
  };

  const _material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: _VS,
    fragmentShader: _FS,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
    transparent: true,
    vertexColors: true,
  });

  // --- parametri del sistema (uguali all'originale) ---
  const radius = 0.7;
  const maxLife = 0.5;
  const maxSize = 3.0;

  // --- NUOVO: capacità massima del buffer, calcolata dal rate ---
  const MAX_PARTICLES = Math.ceil(rate * maxLife * 1.5) + 20;

  let _particles = [];

  // --- NUOVO: buffer pre-allocati, riutilizzati per tutta la durata ---
  const positions = new Float32Array(MAX_PARTICLES * 3);
  const sizes = new Float32Array(MAX_PARTICLES);
  const colours = new Float32Array(MAX_PARTICLES * 4);
  const angles = new Float32Array(MAX_PARTICLES);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colours, 4));
  geometry.setAttribute("angle", new THREE.BufferAttribute(angles, 1));
  geometry.setDrawRange(0, 0);

  const _points = new THREE.Points(geometry, _material);
  parent.add(_points);

  const alphaSpline = getLinearSpline((t, a, b) => a + t * (b - a));
  alphaSpline.addPoint(0.0, 0.0);
  alphaSpline.addPoint(0.6, 1.0);
  alphaSpline.addPoint(1.0, 0.0);

  const colorSpline = getLinearSpline((t, a, b) => {
    const c = a.clone();
    return c.lerp(b, t);
  });
  colorSpline.addPoint(0.0, new THREE.Color(0xffffff));
  colorSpline.addPoint(1.0, new THREE.Color(0xff8080));

  const sizeSpline = getLinearSpline((t, a, b) => a + t * (b - a));
  sizeSpline.addPoint(0.0, 0.0);
  sizeSpline.addPoint(1.0, 1.0);

  let gdfsghk = 0.0;

  function _AddParticles(timeElapsed) {
    gdfsghk += timeElapsed;
    let n = Math.floor(gdfsghk * rate);
    gdfsghk -= n / rate;

    // NUOVO: non superare la capacità del buffer
    const free = MAX_PARTICLES - _particles.length;
    if (n > free) n = free;

    for (let i = 0; i < n; i += 1) {
      const life = (Math.random() * 0.75 + 0.25) * maxLife;
      _particles.push({
        position: new THREE.Vector3(
          (Math.random() * 2 - 1) * radius,
          (Math.random() * 2 - 1) * radius,
          (Math.random() * 2 - 1) * radius,
        ).add(emitter.position),
        size: (Math.random() * 0.5 + 0.5) * maxSize,
        colour: new THREE.Color(),
        alpha: 1.0,
        life: life,
        maxLife: life,
        rotation: Math.random() * 2.0 * Math.PI,
        rotationRate: Math.random() * 0.01 - 0.005,
        velocity: new THREE.Vector3(0, 1.5, 0),
        currentSize: 0,
      });
    }
  }

  // NUOVO: scrive direttamente nei TypedArray esistenti, nessuna allocazione
  function _UpdateGeometry() {
    const posAttr = geometry.getAttribute("position");
    const sizeAttr = geometry.getAttribute("size");
    const colorAttr = geometry.getAttribute("aColor");
    const angleAttr = geometry.getAttribute("angle");

    const count = _particles.length;

    for (let i = 0; i < count; i++) {
      const p = _particles[i];

      posAttr.array[i * 3 + 0] = p.position.x;
      posAttr.array[i * 3 + 1] = p.position.y;
      posAttr.array[i * 3 + 2] = p.position.z;

      colorAttr.array[i * 4 + 0] = p.colour.r;
      colorAttr.array[i * 4 + 1] = p.colour.g;
      colorAttr.array[i * 4 + 2] = p.colour.b;
      colorAttr.array[i * 4 + 3] = p.alpha;

      sizeAttr.array[i] = p.currentSize;
      angleAttr.array[i] = p.rotation;
    }

    geometry.setDrawRange(0, count);

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    angleAttr.needsUpdate = true;
  }

  let _frameCount = 0;

  function _UpdateParticles(timeElapsed) {
    for (let p of _particles) {
      p.life -= timeElapsed;
    }

    _particles = _particles.filter((p) => p.life > 0.0);

    for (let p of _particles) {
      const t = 1.0 - p.life / p.maxLife;
      p.rotation += p.rotationRate;
      p.alpha = alphaSpline.getValueAt(t);
      p.currentSize = p.size * sizeSpline.getValueAt(t);
      p.colour.copy(colorSpline.getValueAt(t));

      // NUOVO: niente clone(), aggiornamento diretto dei componenti
      p.position.x += p.velocity.x * timeElapsed;
      p.position.y += p.velocity.y * timeElapsed;
      p.position.z += p.velocity.z * timeElapsed;

      const dragFactor = timeElapsed * 0.1;
      const dragX =
        Math.sign(p.velocity.x) *
        Math.min(Math.abs(p.velocity.x * dragFactor), Math.abs(p.velocity.x));
      const dragY =
        Math.sign(p.velocity.y) *
        Math.min(Math.abs(p.velocity.y * dragFactor), Math.abs(p.velocity.y));
      const dragZ =
        Math.sign(p.velocity.z) *
        Math.min(Math.abs(p.velocity.z * dragFactor), Math.abs(p.velocity.z));

      p.velocity.x -= dragX;
      p.velocity.y -= dragY;
      p.velocity.z -= dragZ;
    }

    // NUOVO: ordina ogni 3 frame invece di ogni frame
    _frameCount++;
    if (_frameCount % 3 === 0) {
      _particles.sort((a, b) => {
        const d1 = camera.position.distanceTo(a.position);
        const d2 = camera.position.distanceTo(b.position);
        if (d1 > d2) return -1;
        if (d1 < d2) return 1;
        return 0;
      });
    }
  }

  function update(timeElapsed) {
    _AddParticles(timeElapsed);
    _UpdateParticles(timeElapsed);
    _UpdateGeometry();
  }

  return { update };
}

export { getParticleSystem_fire_linear };
