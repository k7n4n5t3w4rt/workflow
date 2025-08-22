// build.js
import { build } from "esbuild";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { resolve as resolveImport } from "import-meta-resolve";

const WEB_MODULES_DIR = "web_modules";

const DEPS = [
  "@tensorflow/tfjs",
  "animejs",
  "history",
  "htm",
  "immer",
  "lit",
  "preact",
  "preact/hooks",
  "htm/preact",
  "preact-render-to-string",
  "preact-router",
  "rxjs",
  "simplestyle-js",
  "three",
];

// Three.js examples/modules to bundle separately
const THREE_MODULES = [
  "three/examples/jsm/libs/stats.module",
  "three/examples/jsm/controls/OrbitControls",
  "three/examples/jsm/loaders/TGALoader",
  "three/examples/jsm/renderers/CSS2DRenderer",
];

async function buildDeps() {
  await fs.mkdir(WEB_MODULES_DIR, { recursive: true });

  // Build main dependencies
  for (const dep of DEPS) {
    const specifier = dep;
    const resolvedUrl = await resolveImport(specifier, import.meta.url);
    const entry = fileURLToPath(resolvedUrl);
    const outfile = path.join(WEB_MODULES_DIR, `${dep}.js`);

    await build({
      entryPoints: [entry],
      outfile,
      format: "esm",
      bundle: true,
      minify: false,
    });

    // console.log(`✅ ${dep} → ${outfile}`);
  }

  // Build Three.js modules
  for (const module of THREE_MODULES) {
    const specifier = module;
    const resolvedUrl = await resolveImport(specifier, import.meta.url);
    const entry = fileURLToPath(resolvedUrl);

    // Create directory structure
    const dirname = path.dirname(path.join(WEB_MODULES_DIR, `${module}.js`));
    await fs.mkdir(dirname, { recursive: true });

    const outfile = path.join(WEB_MODULES_DIR, `${module}.js`);

    await build({
      entryPoints: [entry],
      outfile,
      format: "esm",
      bundle: true,
      minify: false,
    });

    // console.log(`✅ ${module} → ${outfile}`);
  }
}

buildDeps().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
