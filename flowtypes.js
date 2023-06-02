// --------------------------------------------------
// gSettings
// --------------------------------------------------
type GlobalSettings = {
  speed: number,
  xCm: number,
  yCm: number,
  zCm: number,
  teamsNumber: number,
  teamSize: number,
  workflowStatuses: Array<WorkflowStatuses>,
  workflowItem: WorkflowItemSettings,
};

type WorkflowItemSettings = {
  effort: {
    min: number,
    max: number,
  },
};

type WorkflowStatuses = {
  name: string,
  category: "open" | "wait" | "touch" | "external" | "complete",
};

// --------------------------------------------------
// gState
// --------------------------------------------------
type GlobalState = {
  sceneData: SceneData,
  objects: Objects,
};

type Objects = {
  startPosition: CubePosition,
  workflowItems: Array<WorkflowItem>,
  clickCube: SimpleCube,
};

type SimpleCube = {
  position: CubePosition,
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  bubble_value: number,
};

type WorkflowItem = {
  // Display properties
  position: CubePosition,
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  bubble_value: number,
  // Workflow properties
  name: string,
  effortTotal: number,
  effortRemaining: number,
  workflowStatusesIndex: number,
};

type CubePosition = {
  setFromMatrixPosition: (matrix: Object) => void,
  clone: () => CubePosition,
  x: number,
  y: number,
  z: number,
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
