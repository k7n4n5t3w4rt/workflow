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
};

// --------------------------------------------------
// gState
// --------------------------------------------------
type GlobalState = {
  clicks: number,
  sceneData: SceneData,
  vQueue: VQueue,
  startPosition: CubePosition,
  endPosition: CubePosition,
  flwItems: Array<FlwItem>,
  flwStepTotals: {
    [string]: number,
    touchTotal: number,
    doneTotal: number,
  },
  clickCubeGroup: ClickCubeGroup,
  vSphere: VSphere,
};

type ClickCubeGroup = {
  add: (VSphere | FlwItem) => void,
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  material: { color: CubeColor },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  clickCube: ClickCube,
};

type ClickCube = {
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
  geometry: {
    scale: (x: number, y: number, z: number) => void,
    dispose: () => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  volume: number,
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  rollingTotal: number,
};

type FlwItem = {
  // Display properties
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  volume: number,
  material: { color: CubeColor, opacity: number, needsUpdate: boolean },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  bubble_value: number,
  // Flw properties
  name: string,
  age: number,
  effortTotal: number,
  effortRemaining: number,
  flwStepsIndex: number,
};

type SimplePosition = {
  x: number,
  y: number,
  z: number,
};

type SimpleScale = {
  x: number,
  y: number,
  z: number,
  set: (number, number, number) => void,
};

type CubePosition = {
  setFromMatrixPosition: (matrix: Object) => void,
  clone: () => CubePosition,
  x: number,
  y: number,
  z: number,
};

type CubeColor = {
  r: number,
  g: number,
  b: number,
};

type CubeRotation = {
  x: number,
  y: number,
  z: number,
};

type ReticleStuff = {
  reticle: Object,
  hitTestSource?: Object,
  localSpace?: Object,
  viewerSpace?: Object,
  hitTestSourceInitialized?: Object,
  active: boolean,
};

type SceneData = {
  stats: Object,
  scene: Object,
  camera: Object,
  renderer: Object,
  reticleStuff: ReticleStuff,
};

type VQueue = {
  dequeue: () => void,
  enqueue: (item: number) => void,
  total: () => number,
  length: () => number,
};

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
