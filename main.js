///mettere inizializzazioni di variabili e funzioni prima, poi dichiariamo le funzioni

import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
let loadingScreenHidden = false;
const modelCache = new Map();
const defaultMixers = [];

init();

function hideLoadingScreen() {
  if (loadingScreenHidden) return;
  loadingScreenHidden = true;

  const loadingScreen = document.getElementById("loading-screen");
  const loadingBarFill = document.getElementById("loading-bar-fill");
  const loadingPercentage = document.getElementById("loading-percentage");

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
}

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
  const totalLoadingSteps = 20;
  let completedLoadingSteps = 0;

  loadingManager = new THREE.LoadingManager();

  function updateLoadingProgress(progress) {
    if (loadingBarFill) loadingBarFill.style.width = progress + "%";
    if (loadingPercentage) loadingPercentage.textContent = progress + "%";
  }

  function completeLoadingStep() {
    completedLoadingSteps += 1;
    const progress = Math.min(
      99,
      Math.round((completedLoadingSteps / totalLoadingSteps) * 100),
    );
    updateLoadingProgress(progress);
  }

  loadingManager.onProgress = function () {
    if (completedLoadingSteps === 0) {
      updateLoadingProgress(1);
    }
  };

  loadingManager.onLoad = function () {
    if (!loadingScreenHidden && completedLoadingSteps >= totalLoadingSteps) {
      updateLoadingProgress(100);
      hideLoadingScreen();
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

  const loader = new GLTFLoader(loadingManager);
  loader.setMeshoptDecoder(MeshoptDecoder);

  function loadGLTF(url) {
    if (!modelCache.has(url)) {
      modelCache.set(
        url,
        new Promise((resolve, reject) => {
          loader.load(url, resolve, undefined, reject);
        }),
      );
    }

    return modelCache.get(url);
  }

  function placeModel(target, transform) {
    target.scale.set(...transform.scale);
    target.position.set(...transform.position);
    target.rotation.set(...transform.rotation);
    scene.add(target);
  }

  function addAnimatedModel(config) {
    return loadGLTF(config.url)
      .then((gltf) => {
        const loadedModel = cloneSkeleton(gltf.scene);
        placeModel(loadedModel, config);

        const loadedMixer = new THREE.AnimationMixer(loadedModel);
        defaultMixers.push(loadedMixer);
        playAnimationDefault(
          loadedModel,
          gltf.animations,
          loadedMixer,
          config.animation,
        );

        config.assign(loadedModel, loadedMixer);
        completeLoadingStep();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async function loadWithConcurrency(items, worker, concurrency = 3) {
    let nextIndex = 0;

    async function runNext() {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= items.length) return;

      await worker(items[currentIndex]);
      await runNext();
    }

    await Promise.all(
      Array.from(
        { length: Math.min(concurrency, items.length) },
        () => runNext(),
      ),
    );
  }

  function loadInteractiveBrother() {
    return loadGLTF("./public/01_primo_fratello_gui_def.glb")
      .then((gltf) => {
        model = gltf.scene;
        placeModel(model, {
          scale: [0.8, 0.8, 0.8],
          position: [-52, -1, 13],
          rotation: [0, -0.5, 0],
        });

        createGUI(model, gltf.animations);
        completeLoadingStep();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  function loadDefaultCharacters() {
    const defaultCharacters = [
      {
        url: "./public/02_fratello2_animazione.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-45, -1, 15],
        rotation: [0, -1, 0],
        animation: "attesa_guardandandosi_intorno",
        assign: (loadedModel, loadedMixer) => {
          model_1 = loadedModel;
          mixer_def_1 = loadedMixer;
        },
      },
      {
        url: "./public/04_soldato_rosso_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-33, 0, 10],
        rotation: [0, 0, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_2 = loadedModel;
          mixer_def_2 = loadedMixer;
        },
      },
      {
        url: "./public/05_soldato_avversario_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-31.5, 0, 13.5],
        rotation: [0, 90, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_3 = loadedModel;
          mixer_def_3 = loadedMixer;
        },
      },
      {
        url: "./public/04_soldato_rosso_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-39, 0, 0],
        rotation: [0, -0.3, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_4 = loadedModel;
          mixer_def_4 = loadedMixer;
        },
      },
      {
        url: "./public/05_soldato_avversario_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-37, 0, 3],
        rotation: [0, 65, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_5 = loadedModel;
          mixer_def_5 = loadedMixer;
        },
      },
      {
        url: "./public/06_soldato_ferito_terra.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-35, 0, 20],
        rotation: [0, 0, 0],
        animation: "ferito_a_terra",
        assign: (loadedModel, loadedMixer) => {
          model_6 = loadedModel;
          mixer_def_6 = loadedMixer;
        },
      },
      {
        url: "./public/10_soldato_ucciso.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-25, 0, 21],
        rotation: [0, 130, 0],
        animation: "ucciso_spada",
        assign: (loadedModel, loadedMixer) => {
          model_7 = loadedModel;
          mixer_def_7 = loadedMixer;
        },
      },
      {
        url: "./public/04_soldato_rosso_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-22, 0, 21],
        rotation: [0, 60, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_8 = loadedModel;
          mixer_def_8 = loadedMixer;
        },
      },
      {
        url: "./public/10_civile_spaventato.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-29, 0, 6],
        rotation: [0, 130, 0],
        animation: "disperazione",
        assign: (loadedModel, loadedMixer) => {
          model_9 = loadedModel;
          mixer_def_9 = loadedMixer;
        },
      },
      {
        url: "./public/09_civile_giallo_spaventato.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-20, 3.5, -4],
        rotation: [0, 0, 0],
        animation: "spaventato",
        assign: (loadedModel, loadedMixer) => {
          model_10 = loadedModel;
          mixer_def_10 = loadedMixer;
        },
      },
      {
        url: "./public/03_terzo_fratello.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-46, -1, 18],
        rotation: [0, 55, 0],
        animation: "sconcerto",
        assign: (loadedModel, loadedMixer) => {
          model_11 = loadedModel;
          mixer_def_11 = loadedMixer;
        },
      },
      {
        url: "./public/donna2_waving.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-30, 3.5, -24],
        rotation: [0, 0, 0],
        animation: "waving",
        assign: (loadedModel, loadedMixer) => {
          model_12 = loadedModel;
          mixer_def_12 = loadedMixer;
        },
      },
      {
        url: "./public/donna2_waving.glb",
        scale: [0.6, 0.6, 0.6],
        position: [4, 9, -10],
        rotation: [0, -1, 0],
        animation: "waving",
        assign: (loadedModel, loadedMixer) => {
          model_13 = loadedModel;
          mixer_def_13 = loadedMixer;
        },
      },
      {
        url: "./public/08_civile_verde_ferito.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-12, 4, 5.5],
        rotation: [0, -2, 0],
        animation: "camminata_ferito",
        assign: (loadedModel, loadedMixer) => {
          model_14 = loadedModel;
          mixer_def_14 = loadedMixer;
        },
      },
      {
        url: "./public/04_soldato_rosso_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-3.7, 4, -8.3],
        rotation: [0, -0.3, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_15 = loadedModel;
          mixer_def_15 = loadedMixer;
        },
      },
      {
        url: "./public/05_soldato_avversario_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-4, 4, -4],
        rotation: [0, 65, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_16 = loadedModel;
          mixer_def_16 = loadedMixer;
        },
      },
      {
        url: "./public/04_soldato_rosso_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-52, 1, -3],
        rotation: [0, 0, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_17 = loadedModel;
          mixer_def_17 = loadedMixer;
        },
      },
      {
        url: "./public/05_soldato_avversario_affondo.glb",
        scale: [0.8, 0.8, 0.8],
        position: [-46, 1.1, -5.3],
        rotation: [0, 60, 0],
        animation: "spada_affondo",
        assign: (loadedModel, loadedMixer) => {
          model_18 = loadedModel;
          mixer_def_18 = loadedMixer;
        },
      },
    ];

    return loadWithConcurrency(defaultCharacters, addAnimatedModel, 3);
  }

  loadGLTF("./public/00_scena_pre_prova.glb")
    .then(async (gltf) => {
      model = gltf.scene;
      placeModel(model, {
        scale: [0.7, 0.7, 0.7],
        position: [0, 0, 0],
        rotation: [0, 5, 0],
      });
      completeLoadingStep();
      await Promise.all([loadInteractiveBrother(), loadDefaultCharacters()]);
      updateLoadingProgress(100);
      hideLoadingScreen();
    })
    .catch((e) => console.error(e));

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
  for (let i = 0; i < defaultMixers.length; i++) {
    defaultMixers[i].update(dt);
  }

  renderer.render(scene, camera);
  stats.update();
}
