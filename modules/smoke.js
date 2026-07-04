import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";
import { getParticleSystem_smoke } from "../particle_systems/getParticleSystem_smoke.js";

export function init_smoke(scene, camera) {
  //tempio dx - sopa piccoli fuochi

  const smoke_emission_mesh_tempio_dx = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_tempio_dx.position.set(-15, 5.4, 16);
  scene.add(smoke_emission_mesh_tempio_dx);

  const smoke_effect_tempio_dx = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_tempio_dx,
    parent: scene,
    rate: 2,
    texture: "textures/smoke.png",
    opacity: 0.2,
    transparent: true,
  });

  function smoke_animation_tempio_dx() {
    requestAnimationFrame(smoke_animation_tempio_dx);
    smoke_effect_tempio_dx.update(0.016);
  }

  smoke_animation_tempio_dx();

  //tempio dx

  const smoke_emission_mesh_tempio_dx_02 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_tempio_dx_02.position.set(-9, 4.4, 4);
  scene.add(smoke_emission_mesh_tempio_dx_02);

  const smoke_effect_tempio_dx_02 = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_tempio_dx_02,
    parent: scene,
    rate: 20,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_tempio_dx_02() {
    requestAnimationFrame(smoke_animation_tempio_dx_02);
    smoke_effect_tempio_dx_02.update(0.016);
  }

  smoke_animation_tempio_dx_02();

  //smoke 2: tempio sinistra
  const smoke_emission_mesh_tempio_sx = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_tempio_sx.position.set(-33, 5, -8);
  scene.add(smoke_emission_mesh_tempio_dx_02);

  const smoke_effect_tempio_sx = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_tempio_sx,
    parent: scene,
    rate: 10,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_tempio_sx() {
    requestAnimationFrame(smoke_animation_tempio_sx);
    smoke_effect_tempio_sx.update(0.016);
  }

  smoke_animation_tempio_sx();

  //fondo
  const smoke_emission_mesh_fondo = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_fondo.position.set(-3, 9.1, -18);
  scene.add(smoke_emission_mesh_fondo);

  const smoke_effect_fondo = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_fondo,
    parent: scene,
    rate: 15,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_fondo() {
    requestAnimationFrame(smoke_animation_fondo);
    smoke_effect_fondo.update(0.016);
  }

  smoke_animation_fondo();

  //fondo
  const smoke_emission_mesh_fondo_2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_fondo_2.position.set(-5, 9.2, -18);
  scene.add(smoke_emission_mesh_fondo_2);

  const smoke_effect_fondo_2 = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_fondo_2,
    parent: scene,
    rate: 15,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_fondo_2() {
    requestAnimationFrame(smoke_animation_fondo_2);
    smoke_effect_fondo_2.update(0.016);
  }

  smoke_animation_fondo_2();

  //fondo
  const smoke_emission_mesh_fondo_3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_fondo_3.position.set(1.4, 9, -12.6);
  scene.add(smoke_emission_mesh_fondo_3);

  const smoke_effect_fondo_3 = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_fondo_3,
    parent: scene,
    rate: 20,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_fondo_3() {
    requestAnimationFrame(smoke_animation_fondo_3);
    smoke_effect_fondo_3.update(0.016);
  }

  smoke_animation_fondo_3();

  //portico
  const smoke_emission_mesh_portico = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_portico.position.set(-32, 0.9, 25.3);
  scene.add(smoke_emission_mesh_portico);

  const smoke_effect_portico = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_portico,
    parent: scene,
    rate: 5,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_portico() {
    requestAnimationFrame(smoke_animation_portico);
    smoke_effect_portico.update(0.016);
  }

  smoke_animation_portico();

  //portico2
  const smoke_emission_mesh_portico_2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_portico_2.position.set(-32, 0.9, 24);
  scene.add(smoke_emission_mesh_portico_2);

  const smoke_effect_portico_2 = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_portico_2,
    parent: scene,
    rate: 5,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_portico_2() {
    requestAnimationFrame(smoke_animation_portico_2);
    smoke_effect_portico_2.update(0.016);
  }

  smoke_animation_portico_2();

  //

  //dietro tempio sx
  const smoke_emission_mesh_tempio_dietro = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_tempio_dietro.position.set(-32, 3.8, -27);
  scene.add(smoke_emission_mesh_tempio_dietro);

  const smoke_effect_portico_tempio_dietro = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_tempio_dietro,
    parent: scene,
    rate: 5,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_tempio_dietro() {
    requestAnimationFrame(smoke_animation_tempio_dietro);
    smoke_effect_portico_tempio_dietro.update(0.016);
  }

  smoke_animation_tempio_dietro();

  //

  const smoke_emission_mesh_tempio_dietro_2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  smoke_emission_mesh_tempio_dietro_2.position.set(-28, 3.8, -27);
  scene.add(smoke_emission_mesh_tempio_dietro_2);

  const smoke_effect_portico_tempio_dietro_2 = getParticleSystem_smoke({
    camera,
    emitter: smoke_emission_mesh_tempio_dietro_2,
    parent: scene,
    rate: 10,
    texture: "textures/smoke.png",
    opacity: 0.2,
  });

  function smoke_animation_tempio_dietro_2() {
    requestAnimationFrame(smoke_animation_tempio_dietro_2);
    smoke_effect_portico_tempio_dietro_2.update(0.016);
  }

  smoke_animation_tempio_dietro_2();
}
