///mettere inizializzazioni di variabili e funzioni prima, poi dichiariamo le funzioni

import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { init_fire } from "./modules/fire.js";
import { init_smoke } from "./modules/smoke.js";

let camera, scene, renderer, model;
let container, stats, clock, gui, mixer, actions, activeAction, previousAction;
let loadingManager;
let model_1,
  mixer_def_1,
  mixer_def_2,
  model_2,
  model_3,
  mixer_def_3,
  model_4,
  mixer_def_4,
  model_5,
  mixer_def_5,
  model_6,
  mixer_def_6;
let model_7,
  mixer_def_7,
  model_8,
  mixer_def_8,
  model_9,
  mixer_def_9,
  model_10,
  mixer_def_10,
  model_11,
  mixer_def_11,
  model_12,
  mixer_def_12;
let model_13,
  mixer_def_13,
  model_14,
  mixer_def_14,
  model_15,
  mixer_def_15,
  model_16,
  mixer_def_16,
  model_17,
  mixer_def_17,
  model_18,
  mixer_def_18;

const api = { state: "riposo" }; //animazione al caricamento

init();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  //LOADING MANAGER - tiene traccia del caricamento di tutti i modelli GLTF
  //e aggiorna la barra di progressione/testo definiti in index.html.
  //La schermata di loading resta visibile finche' onLoad non viene chiamato,
  //cioe' finche' TUTTE le risorse caricate tramite questo manager non sono pronte.
  const loadingScreen = document.getElementById("loading-screen");
  const loadingBarFill = document.getElementById("loading-bar-fill");
  const loadingPercentage = document.getElementById("loading-percentage");

  loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progress = Math.round((itemsLoaded / itemsTotal) * 100);
    if (loadingBarFill) loadingBarFill.style.width = progress + "%";
    if (loadingPercentage) loadingPercentage.textContent = progress + "%";
  };

  loadingManager.onLoad = function () {
    if (loadingBarFill) loadingBarFill.style.width = "100%";
    if (loadingPercentage) loadingPercentage.textContent = "100%";

    if (loadingScreen) {
      loadingScreen.classList.add("loading-screen--hidden");
      loadingScreen.addEventListener(
        "transitionend",
        () => loadingScreen.remove(),
        { once: true },
      );
    }
  };

  loadingManager.onError = function (url) {
    console.error("Errore nel caricamento della risorsa: " + url);
  };

  //DICHIARAZIONE CAMERA
  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.25,
    200,
  );
  camera.position.set(-63, -10, 20);
  camera.lookAt(0, 0, 0);

  //DICHIARAZIONE SCENA
  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0x000000, 100, 400); //creiamo una dissolvenza del colore sullo sfondo

  //CLOCK
  clock = new THREE.Clock();

  //LUCI
  const hemiLight = new THREE.HemisphereLight(0xdca190, 0xffffff, 0.1); //luce diffusa
  hemiLight.position.set(10, 30, 10);
  scene.add(hemiLight);

  const ambLight = new THREE.AmbientLight(0xffffff, 0.1); //luce diffusa
  scene.add(ambLight);

  const dirLight = new THREE.DirectionalLight(0xcd6c2f, 1.2); //luce direzionale spotlight
  dirLight.position.set(-10, 1, 10);
  scene.add(dirLight);

  //fuoco
  init_fire(scene, camera);

  //fumo
  init_smoke(scene, camera);

  //-----------------------------import dei vari modelli

  //SCENA
  const loader_scene = new GLTFLoader(loadingManager);
  loader_scene.load("/00_scena_pre_prova.glb", function (gltf) {
    model = gltf.scene;
    model.scale.set(0.7, 0.7, 0.7);
    model.position.set(0, 0, 0);
    model.rotation.set(0, 5, 0);
    scene.add(model);
  });

  //IMPORTARE IL MODELLO GLB2 - controllo utente con GUI

  const loader = new GLTFLoader(loadingManager);
  loader.load(
    "/01_primo_fratello_gui_def.glb",
    function (gltf) {
      model = gltf.scene;
      model.scale.set(0.8, 0.8, 0.8);
      model.position.set(-52, -1, 13);
      model.rotation.set(0, -0.5, 0);
      scene.add(model);

      createGUI(model, gltf.animations);
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //modelli con animazione di default

  //fratello 2 - davanti sx
  const loader2 = new GLTFLoader(loadingManager);
  loader2.load(
    "/02_fratello2_animazione.glb",
    function (gltf) {
      model_1 = gltf.scene;
      model_1.scale.set(0.8, 0.8, 0.8);
      model_1.position.set(-45, -1, 15);
      model_1.rotation.y = -1;
      scene.add(model_1);
      mixer_def_1 = new THREE.AnimationMixer(model_1);
      const desired_animation_1 = "attesa_guardandandosi_intorno";
      playAnimationDefault(
        model_1,
        gltf.animations,
        mixer_def_1,
        desired_animation_1,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato combatte davanti - sx
  const loader3 = new GLTFLoader(loadingManager);
  loader3.load(
    "/04_soldato_rosso_affondo.glb",
    function (gltf) {
      model_2 = gltf.scene;
      model_2.scale.set(0.8, 0.8, 0.8);
      model_2.position.set(-33, 0, 10);
      model_2.rotation.set(0, 0, 0);
      scene.add(model_2);
      mixer_def_2 = new THREE.AnimationMixer(model_2);
      const desired_animation_2 = "spada_affondo";
      playAnimationDefault(
        model_2,
        gltf.animations,
        mixer_def_2,
        desired_animation_2,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato combatte davanti - dx
  const loader4 = new GLTFLoader(loadingManager);
  loader4.load(
    "/05_soldato_avversario_affondo.glb",
    function (gltf) {
      model_3 = gltf.scene;
      model_3.scale.set(0.8, 0.8, 0.8);
      model_3.position.set(-31.5, 0, 13.5);
      model_3.rotation.set(0, 90, 0);
      scene.add(model_3);
      mixer_def_3 = new THREE.AnimationMixer(model_3);
      const desired_animation_3 = "spada_affondo";
      playAnimationDefault(
        model_3,
        gltf.animations,
        mixer_def_3,
        desired_animation_3,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato combatte vicino tempio sx - avanti
  const loader5 = new GLTFLoader(loadingManager);
  loader5.load(
    "/04_soldato_rosso_affondo.glb",
    function (gltf) {
      model_4 = gltf.scene;
      model_4.scale.set(0.8, 0.8, 0.8);
      model_4.position.set(-39, 0, 0);
      model_4.rotation.set(0, -0.3, 0);
      scene.add(model_4);
      mixer_def_4 = new THREE.AnimationMixer(model_4);
      const desired_animation_4 = "spada_affondo";
      playAnimationDefault(
        model_4,
        gltf.animations,
        mixer_def_4,
        desired_animation_4,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato combatte vicino tempio sx - indietro
  const loader6 = new GLTFLoader(loadingManager);
  loader6.load(
    "/05_soldato_avversario_affondo.glb",
    function (gltf) {
      model_5 = gltf.scene;
      model_5.scale.set(0.8, 0.8, 0.8);
      model_5.position.set(-37, 0, 3);
      model_5.rotation.set(0, 65, 0);
      scene.add(model_5);
      mixer_def_5 = new THREE.AnimationMixer(model_5);
      const desired_animation_5 = "spada_affondo";
      playAnimationDefault(
        model_5,
        gltf.animations,
        mixer_def_5,
        desired_animation_5,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato agonizzante a terra davanti
  const loader7 = new GLTFLoader(loadingManager);
  loader7.load(
    "/06_soldato_ferito_terra.glb",
    function (gltf) {
      model_6 = gltf.scene;
      model_6.scale.set(0.8, 0.8, 0.8);
      model_6.position.set(-35, 0, 20);
      model_6.rotation.set(0, 0, 0);
      scene.add(model_6);
      mixer_def_6 = new THREE.AnimationMixer(model_6);
      const desired_animation_6 = "ferito_a_terra";
      playAnimationDefault(
        model_6,
        gltf.animations,
        mixer_def_6,
        desired_animation_6,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato che muore - sotto porticato
  const loader8 = new GLTFLoader(loadingManager);
  loader8.load(
    "/10_soldato_ucciso.glb",
    function (gltf) {
      model_7 = gltf.scene;
      model_7.scale.set(0.8, 0.8, 0.8);
      model_7.position.set(-25, 0, 21);
      model_7.rotation.set(0, 130, 0);
      scene.add(model_7);
      mixer_def_7 = new THREE.AnimationMixer(model_7);
      const desired_animation_7 = "ucciso_spada";
      playAnimationDefault(
        model_7,
        gltf.animations,
        mixer_def_7,
        desired_animation_7,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato che uccide - sotto porticato
  const loader9 = new GLTFLoader(loadingManager);
  loader9.load(
    "/04_soldato_rosso_affondo.glb",
    function (gltf) {
      model_8 = gltf.scene;
      model_8.scale.set(0.8, 0.8, 0.8);
      model_8.position.set(-22, 0, 21);
      model_8.rotation.set(0, 60, 0);
      scene.add(model_8);
      mixer_def_8 = new THREE.AnimationMixer(model_8);
      const desired_animation_8 = "spada_affondo";
      playAnimationDefault(
        model_8,
        gltf.animations,
        mixer_def_8,
        desired_animation_8,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //civile spaventato - verde – di fianco tempio dx
  const loader10 = new GLTFLoader(loadingManager);
  loader10.load(
    "/10_civile_spaventato.glb",
    function (gltf) {
      model_9 = gltf.scene;
      model_9.scale.set(0.8, 0.8, 0.8);
      model_9.position.set(-29, 0, 6);
      model_9.rotation.set(0, 130, 0);
      scene.add(model_9);
      mixer_def_9 = new THREE.AnimationMixer(model_9);
      const desired_animation_9 = "disperazione";
      playAnimationDefault(
        model_9,
        gltf.animations,
        mixer_def_9,
        desired_animation_9,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //civile spaventato - gialla - dietro tempio sx
  const loader11 = new GLTFLoader(loadingManager);
  loader11.load(
    "/09_civile_giallo_spaventato.glb",
    function (gltf) {
      model_10 = gltf.scene;
      model_10.scale.set(0.8, 0.8, 0.8);
      model_10.position.set(-20, 3.5, -4);
      model_10.rotation.set(0, 0, 0);
      scene.add(model_10);
      mixer_def_10 = new THREE.AnimationMixer(model_10);
      const desired_animation_10 = "spaventato";
      playAnimationDefault(
        model_10,
        gltf.animations,
        mixer_def_10,
        desired_animation_10,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  // terzo fratello - dx - blu
  const loader12 = new GLTFLoader(loadingManager);
  loader12.load(
    "/03_terzo_fratello.glb",
    function (gltf) {
      model_11 = gltf.scene;
      model_11.scale.set(0.8, 0.8, 0.8);
      model_11.position.set(-46, -1, 18);
      model_11.rotation.set(0, 55, 0);
      scene.add(model_11);
      mixer_def_11 = new THREE.AnimationMixer(model_11);
      const desired_animation_11 = "sconcerto";
      playAnimationDefault(
        model_11,
        gltf.animations,
        mixer_def_11,
        desired_animation_11,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //donna agitata dietro tempio sx
  const loader13 = new GLTFLoader(loadingManager);
  loader13.load(
    "/donna2_waving.glb",
    function (gltf) {
      model_12 = gltf.scene;
      model_12.scale.set(0.8, 0.8, 0.8);
      model_12.position.set(-30, 3.5, -24);
      model_12.rotation.set(0, 0, 0);
      scene.add(model_12);
      mixer_def_12 = new THREE.AnimationMixer(model_12);
      const desired_animation_12 = "waving";
      playAnimationDefault(
        model_12,
        gltf.animations,
        mixer_def_12,
        desired_animation_12,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //donna in fondo che si agita
  const loader14 = new GLTFLoader(loadingManager);
  loader14.load(
    "/donna2_waving.glb",
    function (gltf) {
      model_13 = gltf.scene;
      model_13.scale.set(0.6, 0.6, 0.6);
      model_13.position.set(4, 9, -10);
      model_13.rotation.set(0, -1, 0);
      scene.add(model_13);
      mixer_def_13 = new THREE.AnimationMixer(model_13);
      const desired_animation_13 = "waving";
      playAnimationDefault(
        model_13,
        gltf.animations,
        mixer_def_13,
        desired_animation_13,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //civile verde vicino tempio dx
  const loader15 = new GLTFLoader(loadingManager);
  loader15.load(
    "/08_civile_verde_ferito.glb",
    function (gltf) {
      model_14 = gltf.scene;
      model_14.scale.set(0.8, 0.8, 0.8);
      model_14.position.set(-12, 4, 5.5);
      model_14.rotation.set(0, -2, 0);
      scene.add(model_14);
      mixer_def_14 = new THREE.AnimationMixer(model_14);
      const desired_animation_14 = "camminata_ferito";
      playAnimationDefault(
        model_14,
        gltf.animations,
        mixer_def_14,
        desired_animation_14,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato combatte davanti case 1
  const loader16 = new GLTFLoader(loadingManager);
  loader16.load(
    "/04_soldato_rosso_affondo.glb",
    function (gltf) {
      model_15 = gltf.scene;
      model_15.scale.set(0.8, 0.8, 0.8);
      model_15.position.set(-3.7, 4, -8.3);
      model_15.rotation.set(0, -0.3, 0);
      scene.add(model_15);
      mixer_def_15 = new THREE.AnimationMixer(model_15);
      const desired_animation_15 = "spada_affondo";
      playAnimationDefault(
        model_15,
        gltf.animations,
        mixer_def_15,
        desired_animation_15,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato combatte davanti case 2
  const loader17 = new GLTFLoader(loadingManager);
  loader17.load(
    "/05_soldato_avversario_affondo.glb",
    function (gltf) {
      model_16 = gltf.scene;
      model_16.scale.set(0.8, 0.8, 0.8);
      model_16.position.set(-4, 4, -4);
      model_16.rotation.set(0, 65, 0);
      scene.add(model_16);
      mixer_def_16 = new THREE.AnimationMixer(model_16);
      const desired_animation_16 = "spada_affondo";
      playAnimationDefault(
        model_16,
        gltf.animations,
        mixer_def_16,
        desired_animation_16,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato 2 scale sx
  const loader18 = new GLTFLoader(loadingManager);
  loader18.load(
    "/04_soldato_rosso_affondo.glb",
    function (gltf) {
      model_17 = gltf.scene;
      model_17.scale.set(0.8, 0.8, 0.8);
      model_17.position.set(-52, 1, -3);
      model_17.rotation.set(0, 0, 0);
      scene.add(model_17);
      mixer_def_17 = new THREE.AnimationMixer(model_17);
      const desired_animation_17 = "spada_affondo";
      playAnimationDefault(
        model_17,
        gltf.animations,
        mixer_def_17,
        desired_animation_17,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  //soldato 2 scale sx
  const loader19 = new GLTFLoader(loadingManager);
  loader19.load(
    "/05_soldato_avversario_affondo.glb",
    function (gltf) {
      model_18 = gltf.scene;
      model_18.scale.set(0.8, 0.8, 0.8);
      model_18.position.set(-46, 1.1, -5.3);
      model_18.rotation.set(0, 60, 0);
      scene.add(model_18);
      mixer_def_18 = new THREE.AnimationMixer(model_18);
      const desired_animation_18 = "spada_affondo";
      playAnimationDefault(
        model_18,
        gltf.animations,
        mixer_def_18,
        desired_animation_18,
      );
    },
    undefined,
    function (e) {
      console.error(e);
    },
  );

  ///////////////////////////////////////////////////////////////////////////

  //DICHIARAZIONE RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // For realistic tone mapping
  renderer.outputEncoding = THREE.sRGBEncoding; // Ensure proper color encoding
  container.appendChild(renderer.domElement); //consente di inserire scena in html

  //STATS del FRAME/SECONDS
  stats = new Stats();
  stats.dom.style.display = "none"; // nasconde il pannello
  container.appendChild(stats.dom);

  //RIDIMENSIONAMENTO IMMAGINE
  window.addEventListener("resize", onWindowResize);

  //CONTROLLI MOVIMENTO NELLA SCENA
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;

  orbitControls.enableZoom = true;
  orbitControls.zoomSpeed = 0.9;

  orbitControls.minDistance = 30;
  orbitControls.maxDistance = 76;

  orbitControls.enablePan = true;
  orbitControls.panSpeed = 0.9;

  const initialAzimuthAngle = orbitControls.getAzimuthalAngle();

  //intervallo di rotazione orizzontale (±10°)
  const limit = (10 * Math.PI) / 180;

  // Imposta i limiti orizzontali rispetto all'angolo iniziale
  orbitControls.minAzimuthAngle = initialAzimuthAngle - limit;
  orbitControls.maxAzimuthAngle = initialAzimuthAngle + limit;
  orbitControls.minPolarAngle = Math.PI / 2 - 0.05; // 90° in radianti
  orbitControls.maxPolarAngle = Math.PI / 2 - 0.05; // 90° in radianti

  orbitControls.update();
}

function playAnimationDefault(model, animations, mixer_def, desired_animation) {
  const states = [
    "spaventato",
    "sword_fight",
    "ucciso_spada",
    "addolorato",
    "sconcerto",
    "guardarsi intorno",
    "waving",
    "spada_affondo",
    "ferito_a_terra",
    "camminata_ferito",
    "disperazione",
  ];

  let actions_def = {};
  console.log(animations);

  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i];
    const action = mixer_def.clipAction(clip);
    actions_def[clip.name] = action;
    action.loop = THREE.LoopRepeat; //tutte le animazioni di defualt vengono riprodotte in loop
    action.clampWhenFinished = false;
  }

  let activeAction_def = actions_def[desired_animation];
  activeAction_def.play();
}

function createGUI(model, animations) {
  const states = [
    "forte sconforto",
    "riposo",
    "estraendo la spada",
    "mostrando la situazione",
    "sconforto",
  ];

  gui = new GUI();

  mixer = new THREE.AnimationMixer(model);

  actions = {};
  console.log(animations);
  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i];
    const action = mixer.clipAction(clip);
    actions[clip.name] = action;
    if (states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
    }
  }

  const statesFolder = gui.addFolder("States"); //visualizziamo tendina states
  const clipCtrl = statesFolder.add(api, "state").options(states); //visualizziamo dello stato di default

  //DROPDOWN
  clipCtrl.onChange(function () {
    fadeToAction(api.state, 0.5);
  });
  statesFolder.open();

  activeAction = actions["riposo"];
  activeAction.play();
}

function fadeToAction(name, duration) {
  previousAction = activeAction;
  activeAction = actions[name];

  if (previousAction != activeAction) {
    previousAction.fadeOut(duration);
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  const dt = clock.getDelta();

  if (mixer) mixer.update(dt);
  if (mixer_def_1) mixer_def_1.update(dt);
  if (mixer_def_2) mixer_def_2.update(dt);
  if (mixer_def_3) mixer_def_3.update(dt);
  if (mixer_def_4) mixer_def_4.update(dt);
  if (mixer_def_5) mixer_def_5.update(dt);
  if (mixer_def_6) mixer_def_6.update(dt);
  if (mixer_def_7) mixer_def_7.update(dt);
  if (mixer_def_8) mixer_def_8.update(dt);
  if (mixer_def_9) mixer_def_9.update(dt);
  if (mixer_def_10) mixer_def_10.update(dt);
  if (mixer_def_11) mixer_def_11.update(dt);
  if (mixer_def_12) mixer_def_12.update(dt);
  if (mixer_def_13) mixer_def_13.update(dt);
  if (mixer_def_14) mixer_def_14.update(dt);
  if (mixer_def_15) mixer_def_15.update(dt);
  if (mixer_def_16) mixer_def_16.update(dt);
  if (mixer_def_17) mixer_def_17.update(dt);
  if (mixer_def_18) mixer_def_18.update(dt);

  renderer.render(scene, camera);
  stats.update();
}