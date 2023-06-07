// --------------------------------------------------
// gSttngs
// --------------------------------------------------
type GlobalSettings = {
  speed: number,
  death: number,
  x: number,
  y: number,
  z: number,
  xCm: number,
  yCm: number,
  zCm: number,
  scale: number,
  scaleCm: number,
  step: number,
  teamsNumber: number,
  teamSize: number,
  flwSteps: Array<FlwStep>,
  flwItem: FlwItemSettings,
  valueUpdateInterval: number,
};

type FlwItemSettings = {
  effort: {
    min: number,
    max: number,
  },
};

type FlwStep = {
  name: string,
  status: "open" | "wait" | "touch" | "external" | "done",
  limit: number,
};

// --------------------------------------------------
// gState
// --------------------------------------------------
type GlobalState = {
  // -----------------------
  // Data:
  // -----------------------
  clicks: number,
  scnData: SceneData,
  vSphere: VSphere,
  startPosition: CubePosition,
  endPosition: CubePosition,
  flwItems: Array<FlwItem>,
  flwStepTotals: FlwStepTotals,
  clickCubeGroup: ClickCubeGroup,
  // vQueue: VQueue,
};

type FlwStepTotals = {
  // -----------------------
  // Data:
  // -----------------------
  [string]: number,
  touchTotal: number,
  doneTotal: number,
};

type ClickCubeGroup = {
  // -----------------------
  // Data:
  // -----------------------
  clickCube: ClickCube,
  // -----------------------
  // Three.js:
  // -----------------------
  add: (VSphere | FlwItem) => void,
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  material: { color: CubeColor },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
};

type ClickCube = {
  // -----------------------
  // Three.js:
  // -----------------------
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  material: { color: CubeColor },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
};

type VSphere = {
  // -----------------------
  // Data:
  // -----------------------
  dVolume: number,
  dRllngTtlVolume: number,
  // -----------------------
  // Three.js:
  // -----------------------
  geometry: {
    scale: (x: number, y: number, z: number) => void,
    dispose: () => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
};

type FlwItem = {
  // -----------------------
  // Data:
  // -----------------------
  name: string,
  age: number,
  effortTotal: number,
  effortRemaining: number,
  flwStepsIndex: number,
  // -----------------------
  // Three.js:
  // -----------------------
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  dVolume: number,
  material: { color: CubeColor, opacity: number, needsUpdate: boolean },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
};

type SimplePosition = {
  // -----------------------
  // Three.js:
  // -----------------------
  x: number,
  y: number,
  z: number,
};

type SimpleScale = {
  // -----------------------
  // Three.js:
  // -----------------------
  x: number,
  y: number,
  z: number,
  set: (number, number, number) => void,
};

type CubePosition = {
  // -----------------------
  // Three.js:
  // -----------------------
  setFromMatrixPosition: (matrix: Object) => void,
  clone: () => CubePosition,
  x: number,
  y: number,
  z: number,
};

type CubeColor = {
  // -----------------------
  // Three.js:
  // -----------------------
  r: number,
  g: number,
  b: number,
};

type CubeRotation = {
  // -----------------------
  // Three.js:
  // -----------------------
  x: number,
  y: number,
  z: number,
};

type ReticleStuff = {
  // -----------------------
  // Three.js:
  // -----------------------
  reticle: Object,
  hitTestSource?: Object,
  localSpace?: Object,
  viewerSpace?: Object,
  hitTestSourceInitialized?: Object,
  active: boolean,
};

type SceneData = {
  // -----------------------
  // Three.js:
  // -----------------------
  stats: Object,
  scene: Object,
  camera: Object,
  renderer: Object,
  reticleStuff: ReticleStuff,
};

// type VQueue = {
//   // -----------------------
//   // Data:
//   // -----------------------
//   dequeue: () => void,
//   enqueue: (item: number) => void,
//   total: () => number,
//   length: () => number,
// };

// --------------------------------------------------
// MODULES
// --------------------------------------------------
declare module "finalhandler" {
  declare module.exports: any;
}

declare module "../web_modules/immer.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-render-to-string.js" {
  declare module.exports: any;
}

declare module "serve-static" {
  declare module.exports: any;
}

declare module "glob" {
  declare module.exports: any;
}

declare module "../web_modules/should/as-function.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../../web_modules/simplestyle-js.js" {
  declare module.exports: any;
}

declare module "../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-router.js" {
  declare module.exports: any;
}

declare module "../web_modules/history.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/libs/stats.module.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/loaders/TGALoader.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/animejs.js" {
  declare module.exports: any;
}
