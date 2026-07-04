import * as THREE from "three";
import { getParticleSystem } from "../particle_systems/getParticleSystem.js";
import { getParticleSystem_fire_linear } from "../particle_systems/getParticleSystem_fire_linear.js";

export function init_fire(scene, camera) {
  ////////////////////////////////////////////////////////////////
  const fire_emission_mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 0.1, 0.1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh.position.set(-21, 3.5, -6);
  scene.add(fire_emission_mesh);

  const fire_effect = getParticleSystem({
    camera,
    emitter: fire_emission_mesh,
    parent: scene,
    rate: 100,
    texture: "textures/flame2.png",
  });

  function fire_animation1() {
    requestAnimationFrame(fire_animation1);
    fire_effect.update(0.016);
  }

  fire_animation1();

  ////////////////////////////////////////////////////////////////
  const fire_emission_mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh2.position.set(-15, 4, 10);
  scene.add(fire_emission_mesh2);

  const fire_effect2 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh2,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation2() {
    requestAnimationFrame(fire_animation2);
    fire_effect2.update(0.016);
  }

  fire_animation2();

  ////////////////////////////////////////////////////////////////
  const fire_emission_mesh3 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh3.position.set(-13, 5.5, 18);
  scene.add(fire_emission_mesh3);

  const fire_effect3 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh3,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation3() {
    requestAnimationFrame(fire_animation3);
    fire_effect3.update(0.016);
  }

  fire_animation3();

  ////////////////////////////////////////////////////////////////// Fire effect 4: tempio a destra

  const fire_emission_mesh4 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh4.position.set(-13.8, 5.5, 16.5);
  scene.add(fire_emission_mesh4);

  const fire_effect4 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh4,
    parent: scene,
    rate: 200,
    texture: "textures/flame2.png",
  });

  function fire_animation4() {
    requestAnimationFrame(fire_animation4);
    fire_effect4.update(0.016);
  }

  fire_animation4();

  ////////////////////////////////////////////////////////////////// Fire effect 5: tempio a destra
  const fire_emission_mesh5 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh5.position.set(-15, 5.5, 15);
  scene.add(fire_emission_mesh5);

  const fire_effect5 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh5,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation5() {
    requestAnimationFrame(fire_animation5);
    fire_effect5.update(0.016);
  }

  fire_animation5();

  ////////////////////////////////////////////////////////////////// Fire effect 6: tempio sx
  const fire_emission_mesh6 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh6.position.set(-31, 4, -6);
  scene.add(fire_emission_mesh6);

  const fire_effect6 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh6,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation6() {
    requestAnimationFrame(fire_animation6);
    fire_effect6.update(0.016);
  }

  fire_animation6();

  ////////////////////////////////////////////////////////////////// Fire effect 6: tempio sx
  const fire_emission_mesh7 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh7.position.set(-36, 4.3, -3);
  scene.add(fire_emission_mesh7);

  const fire_effect7 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh7,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation7() {
    requestAnimationFrame(fire_animation7);
    fire_effect7.update(0.016);
  }

  fire_animation7();

  ////////////////////////////////////////////////////////////////// Fire effect 8: tempio sx
  const fire_emission_mesh8 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh8.position.set(-40, 4, -5);
  scene.add(fire_emission_mesh8);

  const fire_effect8 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh8,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation8() {
    requestAnimationFrame(fire_animation8);
    fire_effect8.update(0.016);
  }

  fire_animation8();

  ////////////////////////////////////////////////////////////////// Fire effect 9: tempio sx scale
  const fire_emission_mesh9 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh9.position.set(-42, 1, -5);
  scene.add(fire_emission_mesh9);

  const fire_effect9 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh9,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation9() {
    requestAnimationFrame(fire_animation9);
    fire_effect9.update(0.016);
  }

  fire_animation9();

  ////////////////////////////////////////////////////////////////// tempio sx scale mezzo

  const fire_emission_mesh9_bis = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh9_bis.position.set(-42, 2.1, -7);
  scene.add(fire_emission_mesh9_bis);

  const fire_effect9_bis = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh9_bis,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation9_bis() {
    requestAnimationFrame(fire_animation9_bis);
    fire_effect9_bis.update(0.016);
  }

  fire_animation9_bis();

  //////////////////////////////////////////////////////////////////

  const fire_emission_mesh9_bis_sopra = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh9_bis_sopra.position.set(-44, 3, -7);
  scene.add(fire_emission_mesh9_bis);

  const fire_effect9_bis_sopra = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh9_bis_sopra,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation9_bis_sopra() {
    requestAnimationFrame(fire_animation9_bis_sopra);
    fire_effect9_bis_sopra.update(0.016);
  }

  fire_animation9_bis_sopra();

  //////////////////////////////////////////////////////////////////  Fire effect 10: porticato
  const fire_emission_mesh10 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh10.position.set(-35, 0.7, 26);
  scene.add(fire_emission_mesh10);

  const fire_effect10 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh10,
    parent: scene,
    rate: 400,
    texture: "textures/flame2.png",
  });

  function fire_animation10() {
    requestAnimationFrame(fire_animation10);
    fire_effect10.update(0.016);
  }

  fire_animation10();

  //////////////////////////////////////////////////////////////////  Fire effect 11: porticato
  const fire_emission_mesh11 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh11.position.set(-32, 0.7, 24);
  scene.add(fire_emission_mesh11);

  const fire_effect11 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh11,
    parent: scene,
    rate: 400,
    texture: "textures/flame2.png",
  });

  function fire_animation11() {
    requestAnimationFrame(fire_animation11);
    fire_effect11.update(0.016);
  }

  fire_animation11();

  ////////////////////////////////////////////////////////////////// Fire effect 12: porticato
  const fire_emission_mesh_portico3 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_portico3.position.set(-32, 0.7, 25.3);
  scene.add(fire_emission_mesh_portico3);

  const fire_effect_portico3 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh_portico3,
    parent: scene,
    rate: 400,
    texture: "textures/flame2.png",
  });

  function fire_animation_portico3() {
    requestAnimationFrame(fire_animation_portico3);
    fire_effect_portico3.update(0.016);
  }

  fire_animation_portico3();

  ////////////////////////////////////////////////////////////////// Fire effect 5: tempio a destra
  const fire_emission_mesh12 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh12.position.set(7, 6, -2);
  scene.add(fire_emission_mesh12);

  const fire_effect12 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh12,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation12() {
    requestAnimationFrame(fire_animation12);
    fire_effect12.update(0.016);
  }

  fire_animation12();

  ////////////////////////////////////////////////////////////////// tempio dx dietro
  const fire_emission_mesh13 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh13.position.set(-9, 3.8, 4);
  scene.add(fire_emission_mesh13);

  const fire_effect13 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh13,
    parent: scene,
    rate: 400,
    texture: "textures/flame2.png",
  });

  function fire_animation13() {
    requestAnimationFrame(fire_animation13);
    fire_effect13.update(0.016);
  }

  fire_animation13();

  //////////////////////////////////////////////////////////////////

  const fire_emission_mesh13_bis = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh13_bis.position.set(-7, 3.8, 3);
  scene.add(fire_emission_mesh13);

  const fire_effect13_bis = getParticleSystem({
    camera,
    emitter: fire_emission_mesh13_bis,
    parent: scene,
    rate: 100,
    texture: "textures/flame2.png",
  });

  function fire_animation13_bis() {
    requestAnimationFrame(fire_animation13_bis);
    fire_effect13_bis.update(0.016);
  }

  fire_animation13_bis();

  ////////////////////////////////////////////////////////////////// dietro tempio dx
  const fire_emission_mesh14 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh14.position.set(-7, 3.8, 2);
  scene.add(fire_emission_mesh14);

  const fire_effect14 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh14,
    parent: scene,
    rate: 400,
    texture: "textures/flame2.png",
  });

  function fire_animation14() {
    requestAnimationFrame(fire_animation14);
    fire_effect14.update(0.016);
  }

  fire_animation14();

  //////////////////////////////////////////////////////////////////

  const fire_emission_mesh14_bis = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh14_bis.position.set(-6, 3.8, 2);
  scene.add(fire_emission_mesh14_bis);

  const fire_effect14_bis = getParticleSystem({
    camera,
    emitter: fire_emission_mesh14_bis,
    parent: scene,
    rate: 400,
    texture: "textures/flame2.png",
  });

  function fire_animation14_bis() {
    requestAnimationFrame(fire_animation14_bis);
    fire_effect14_bis.update(0.016);
  }

  fire_animation14_bis();

  //////////////////////////////////////////////////////////////////
  const fire_emission_mesh15 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh15.position.set(-6, 3.8, 1);
  scene.add(fire_emission_mesh15);

  const fire_effect15 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh15,
    parent: scene,
    rate: 400,
    texture: "textures/flame2.png",
  });

  function fire_animation15() {
    requestAnimationFrame(fire_animation15);
    fire_effect15.update(0.016);
  }

  fire_animation15();

  ////////////////////////////////////////////////////////////////// fondo della scena
  const fire_emission_mesh16 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh16.position.set(-2, 8.9, -12.5);
  scene.add(fire_emission_mesh16);

  const fire_effect16 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh16,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation16() {
    requestAnimationFrame(fire_animation16);
    fire_effect16.update(0.016);
  }

  fire_animation16();

  ////////////////////////////////////////////////////////////////// fondo della scena
  const fire_emission_mesh17 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh17.position.set(1.2, 8.9, -12.6);
  scene.add(fire_emission_mesh17);

  const fire_effect17 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh17,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation17() {
    requestAnimationFrame(fire_animation17);
    fire_effect17.update(0.016);
  }

  fire_animation17();

  ////////////////////////////////////////////////////////////////// fodno della scena
  const fire_emission_mesh18 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh18.position.set(-5, 8.9, -18);
  scene.add(fire_emission_mesh18);

  const fire_effect18 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh18,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation18() {
    requestAnimationFrame(fire_animation18);
    fire_effect18.update(0.016);
  }

  fire_animation18();

  ////////////////////////////////////////////////////////////////// fondo della scena
  const fire_emission_mesh19 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh19.position.set(-3, 8.9, -18);
  scene.add(fire_emission_mesh19);

  const fire_effect19 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh19,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation19() {
    requestAnimationFrame(fire_animation19);
    fire_effect19.update(0.016);
  }

  fire_animation19();

  ////////////////////////////////////////////////////////////////// vicino civile giallo

  const fire_emission_mesh_civile_giallo_01 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_civile_giallo_01.position.set(-20, 3.5, -5);
  scene.add(fire_emission_mesh_civile_giallo_01);

  const fire_effect_civile_giallo_01 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh_civile_giallo_01,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation_civile_giallo_01() {
    requestAnimationFrame(fire_animation_civile_giallo_01);
    fire_effect_civile_giallo_01.update(0.016);
  }

  fire_animation_civile_giallo_01();

  ////////////////////////////////////////////////////////////////// vicino a civile giallo
  const fire_emission_mesh21 = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 0.1, 0.1),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh21.position.set(-18, 3.5, -5);
  scene.add(fire_emission_mesh21);

  const fire_effect21 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh21,
    parent: scene,
    rate: 100,
    texture: "textures/flame2.png",
  });

  function fire_animation21() {
    requestAnimationFrame(fire_animation21);
    fire_effect21.update(0.016);
  }

  fire_animation21();

  ////////////////////////////////////////////////////////////////// tempio sx
  const fire_emission_mesh_tempio_sx = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_tempio_sx.position.set(-31, 4.3, -6);
  scene.add(fire_emission_mesh_tempio_sx);

  const fire_effect_tempio_sx = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh_tempio_sx,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation_tempio_sx() {
    requestAnimationFrame(fire_animation_tempio_sx);
    fire_effect_tempio_sx.update(0.016);
  }

  fire_animation_tempio_sx();

  //////////////////////////////////////////////////////////////////
  const fire_emission_mesh_tempio_sx_2 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_tempio_sx_2.position.set(-33, 4.3, -7);
  scene.add(fire_emission_mesh_tempio_sx_2);

  const fire_effect_tempio_sx_2 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh_tempio_sx_2,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation_tempio_sx_2() {
    requestAnimationFrame(fire_animation_tempio_sx_2);
    fire_effect_tempio_sx_2.update(0.016);
  }

  fire_animation_tempio_sx_2();

  //////////////////////////////////////////////////////////////////

  const fire_emission_mesh_tempio_sx_3 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_tempio_sx_3.position.set(-33, 4.3, -8);
  scene.add(fire_emission_mesh_tempio_sx_2);

  const fire_effect_tempio_sx_3 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh_tempio_sx_3,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation_tempio_sx_3() {
    requestAnimationFrame(fire_animation_tempio_sx_3);
    fire_effect_tempio_sx_3.update(0.016);
  }

  fire_animation_tempio_sx_3();

  //////////////////////////////////////////////////////////////////

  const fire_emission_mesh_tempio_sx_4 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_tempio_sx_4.position.set(-33.5, 4.3, -9);
  scene.add(fire_emission_mesh_tempio_sx_4);

  const fire_effect_tempio_sx_4 = getParticleSystem_fire_linear({
    camera,
    emitter: fire_emission_mesh_tempio_sx_4,
    parent: scene,
    rate: 500,
    texture: "textures/flame2.png",
  });

  function fire_animation_tempio_sx_4() {
    requestAnimationFrame(fire_animation_tempio_sx_4);
    fire_effect_tempio_sx_4.update(0.016);
  }

  fire_animation_tempio_sx_4();

  ////////////////////////////////////////////////////////////////// fuochi dietro tempio sx

  const fire_emission_mesh_tempio_sx_dietro = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_tempio_sx_dietro.position.set(-30, 3.5, -27);
  scene.add(fire_emission_mesh_tempio_sx_dietro);

  const fire_effect_tempio_sx_dietro = getParticleSystem({
    camera,
    emitter: fire_emission_mesh_tempio_sx_dietro,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation_tempio_sx_dietro() {
    requestAnimationFrame(fire_animation_tempio_sx_dietro);
    fire_effect_tempio_sx_dietro.update(0.016);
  }

  fire_animation_tempio_sx_dietro();

  //////////////////////////////////////////////////////////////////

  const fire_emission_mesh_tempio_sx_dietro_2 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_tempio_sx_dietro_2.position.set(-28, 3.5, -27);
  scene.add(fire_emission_mesh_tempio_sx_dietro_2);

  const fire_effect_tempio_sx_dietro_2 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh_tempio_sx_dietro_2,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation_tempio_sx_dietro_2() {
    requestAnimationFrame(fire_animation_tempio_sx_dietro_2);
    fire_effect_tempio_sx_dietro_2.update(0.016);
  }

  fire_animation_tempio_sx_dietro_2();

  //////////////////////////////////////////////////////////////////

  const fire_emission_mesh_tempio_sx_dietro_3 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 })
  );
  fire_emission_mesh_tempio_sx_dietro_3.position.set(-32, 3.5, -27);
  scene.add(fire_emission_mesh_tempio_sx_dietro_3);

  const fire_effect_tempio_sx_dietro_3 = getParticleSystem({
    camera,
    emitter: fire_emission_mesh_tempio_sx_dietro_3,
    parent: scene,
    rate: 300,
    texture: "textures/flame2.png",
  });

  function fire_animation_tempio_sx_dietro_3() {
    requestAnimationFrame(fire_animation_tempio_sx_dietro_3);
    fire_effect_tempio_sx_dietro_3.update(0.016);
  }

  fire_animation_tempio_sx_dietro_3();
}
