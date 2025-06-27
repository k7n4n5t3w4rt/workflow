// @flow
import { h } from "../web_modules/preact.js";
import Router from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
import { AppProvider } from "./AppContext.js";
import FlwAttrctr from "./flwAttrctr/FlwAttrctr.js";
import Settings from "./flwAttrctr/Settings/Config.js";
import { useEffect, useState } from "../web_modules/preact/hooks.js";
// import registerServiceWorker from "./registerServiceWorker.js";
const finishCounter = {
  ALGORITHMS: [],
  COUNT: 0,
};

/*::
type Props = {
  url: string,
  share: string
};
*/
const App /*: function */ = (props /*: Props */) => {
  const [arSupported, setArSupported] = useState(null);

  useEffect(() => {
    (async () => {
      // $FlowFixMe
      if (navigator.xr && navigator.xr.isSessionSupported) {
        try {
          // $FlowFixMe
          const supported = await navigator.xr.isSessionSupported(
            "immersive-ar",
          );
          setArSupported(!!supported);
        } catch (e) {
          setArSupported(false);
        }
      } else {
        setArSupported(false);
      }
    })();
  }, []);

  if (arSupported === null) {
    return html`<div>Loading...</div>`;
  }

  if (!arSupported) {
    return html`
      <div style="padding:2rem; text-align:center;">
        <h2>2D Experience</h2>
        <p>
          Augmented Reality is not supported on this device. You are viewing the
          2D desktop experience.
        </p>
      </div>
    `;
  }

  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
        <${FlwAttrctr} path="/" />
        <${Settings} path="/config" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
