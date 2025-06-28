// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../web_modules/three.js";
import Stats from "../../web_modules/three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import { TGALoader } from "../../web_modules/three/examples/jsm/loaders/TGALoader.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// COMPONENTS
//------------------------------------------------------------------
import Metrics from "./Metrics/Metrics.js";
import Share from "./Share.js";
import Controls from "./Controls.js";
import Params from "./Settings/Params.js";
import Sttngs from "./Settings/Settings.js";
import Config from "./Settings/Config.js";
import LinkedIn from "./LinkedIn.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import createStats from "../create_stats.js";
import init from "./actions/init.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";
import populateStepsGlobal from "./Settings/populateStepsGlobal.js";
import setUpFlwMap from "./actions/setUpFlwMap.js";
//------------------------------------------------------------------
// FUNCTION: FlwAttrctr()
//------------------------------------------------------------------
/*::
type Props = {
	sid?: string,
	share?: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  console.log("FlwAttrctr rendering");
  const styles = cssStyles();
  const [shortcutsToggle, setShortcutsToggle] = useState(true);
  // Initialize global settings and state
  useEffect(() => {
    console.log("FlwAttrctr useEffect: init");
    // setupMobileDebug();
    let stats = createStats();
    init();
  }, []);
  useEffect(() => {
    console.log("FlwAttrctr useEffect: loadSharedSettings");
    loadSharedSettings(props.sid, props.share)();
    populateStepsGlobal();
  }, [props.share]);
  useEffect(() => {
    console.log("FlwAttrctr useEffect: hideOrShowShortcutsDivs");
    hideOrShowShortcutsDivs(shortcutsToggle)();
  }, [shortcutsToggle]);
  //------------------------------------------------------------------
  // updateShortcutsOnClickInterval()
  //------------------------------------------------------------------
  const updateShortcutsOnClickInterval = (quickLinksToggle /*: boolean */) => {
    setInterval(() => {
      // Make the metrics visible
      if (gState().get("started") === true) {
        setShortcutsToggle(false);
      } else {
        setShortcutsToggle(true);
      }
    }, 1000);
  };
  useEffect(() => {
    console.log("FlwAttrctr useEffect: updateShortcutsOnClickInterval");
    updateShortcutsOnClickInterval(shortcutsToggle);
  }, []);

  useEffect(() => {
    console.log("FlwAttrctr useEffect: stats dom overlay");
    const stats = createStats();
    // Add it to the scnData object in the global state for use
    // in `js/flwAttrctr/actions/render.js`
    const scnData = gState().get("scnData");
    scnData.stats = stats;
    const domOverlayDiv = document.getElementById("dom-overlay");
    if (
      domOverlayDiv === null ||
      window === undefined ||
      window.location.hostname !== "localhost"
    ) {
      return;
    }
    domOverlayDiv.appendChild(stats.dom);
  }, []);
  return html`
    <div id="flw" className="${styles.flw}">
      <div id="landing-container">
        <div id="logo" className="${styles.logoDiv}">
          <div>
            <img src="/img/logo_final_05.png" className="${styles.logo}" />
          </div>
        </div>
        <div id="shortcuts-container" className="${styles.shortcutsDiv}">
          <select
            class="browser-default"
            className="${styles.shortcutsSelect}"
            onChange=${handleChange}
          >
            <option value="" disabled selected>Presets:</option>
            <option value=${EXAMPLE_0}>
              EXAMPLE_0: No WIP Limit (Hint: 1. Set WIP limit to 8)
            </option>
            <option value=${EXAMPLE_1}>
              EXAMPLE_1: Time Period & Little's Law (Hint: 1. Set TimeBox to 12)
            </option>
            <option value=${EXAMPLE_2}>
              EXAMPLE_2: Bottleneck in Test (Hint: 1. People can move 2. Set WIP
              limit in)
            </option>
            <option value=${EXAMPLE_3}>
              EXAMPLE_3: Initiative WIP (Hont: 1. Set WIP limit to 25 2. Set max
              size limit to 20%)
            </option>
          </select>
        </div>
      </div>
      <div id="dom-overlay">
        <${Metrics} />
        <${Share} />
        <${Controls} />
        <${LinkedIn} />
        <${Config} />
        <${Sttngs} />
        <${Params} />
      </div>
    </div>
  `;
};
//------------------------------------------------------------------
// handleChange()
//------------------------------------------------------------------
const handleChange = (event /*: SyntheticEvent<HTMLSelectElement> */) => {
  const selectedValue = event.currentTarget.value;
  window.location.href = selectedValue;
};

const EXAMPLE_0 =
  "/?sid=EXAMPLE_0&share=eyJkZXZQb3dlckZpeCI6MSwiZHJhZyI6MC4yLCJkcmFnUG9pbnQiOjAuNSwicGFyZXRvUG9pbnQiOjAuOCwiYXJyaXZhbFJhdGUiOjIsImZsd1RpbWVNaW4iOjEsInRpbWVCb3giOjEwLCJleHBkdFF1ZXVlTGVuZ3RoIjowLCJleHBkdER2VW5pdHNGYWN0b3IiOjEsImZsd0l0bVNpemVMaW1pdCI6MSwibnVtYmVyT2ZTdGVwcyI6MywicmFuZ2VNYXgiOjEwLCJyYW5nZUluY3JlYXNlUmF0ZSI6MC4xLCJyYW5nZU1pZHBvaW50IjowLjEsImZwcyI6MSwic2hvd01ldHJpY3MiOnRydWUsImNvbG9yR29sZCI6ImY2YmEwMCIsImNvbG9yR3JleSI6IjgwODA4MCIsImNvbG9yR3JlZW4iOiIwMGZmMDAiLCJjb2xvckJsdWUiOiIxZDI1NzAiLCJwYXJhbXNNYXhXaXAiOjMwLCJzY2FsZUNtIjo3LCJzY2FsZSI6MC4wNywieCI6MC4wNywieSI6MC4wNywieiI6MC4wNywic3RlcCI6MC4zNSwieU9mZnNldCI6MC43LCJkZWF0aCI6MCwiYmFja2xvZ0RlYXRoIjowLCJzdGVwcyI6W3sibmFtZSI6IkJhY2tsb2ciLCJzdGF0dXMiOiJiYWNrbG9nIiwibGltaXQiOjgsIm1vdmluZ0xpbWl0Ijo4LCJhdkFnZSI6NDAuNTgsImRldlVuaXRzIjowLCJmbHdUaW1lQXRTdGFydCI6MCwiYWN0dWFsRmx3VGltZSI6MCwibW92aW5nRGV2VW5pdHMiOjB9LHsibmFtZSI6IkluIFByb2dyZXNzIiwic3RhdHVzIjoidG91Y2giLCJsaW1pdCI6MCwibW92aW5nTGltaXQiOjAsImF2QWdlIjo1LjcsImRldlVuaXRzIjo4LCJtb3ZpbmdEZXZVbml0cyI6OCwiZmx3VGltZUF0U3RhcnQiOjUsImFjdHVhbEZsd1RpbWUiOjV9LHsibmFtZSI6IkRvbmUiLCJzdGF0dXMiOiJkb25lIiwibGltaXQiOjAsImF2QWdlIjoxMDAuNjUsIm1vdmluZ0xpbWl0IjowLCJkZXZVbml0cyI6MCwiZmx3VGltZUF0U3RhcnQiOjAsImFjdHVhbEZsd1RpbWUiOjAsIm1vdmluZ0RldlVuaXRzIjowfV0sImRldlBvd2VyRml4UGFyYW0iOmZhbHNlLCJkcmFnUGFyYW0iOnRydWUsImRyYWdQb2ludFBhcmFtIjp0cnVlLCJwYXJldG9Qb2ludFBhcmFtIjpmYWxzZSwiYXJyaXZhbFJhdGVQYXJhbSI6ZmFsc2UsInRpbWVCb3hQYXJhbSI6ZmFsc2UsImV4cGR0UXVldWVMZW5ndGhQYXJhbSI6ZmFsc2UsImV4cGR0RHZVbml0c0ZhY3RvclBhcmFtIjpmYWxzZSwiZmx3SXRtU2l6ZUxpbWl0UGFyYW0iOmZhbHNlLCJiYWNrbG9nRGVhdGhQYXJhbSI6ZmFsc2UsIm1vdmluZ1dpcExpbWl0c1BhcmFtIjp0cnVlLCJtb3ZpbmdEZXZVbml0c1BhcmFtIjpmYWxzZSwiZnBzUGFyYW0iOnRydWV9";
const EXAMPLE_1 =
  "/?sid=EXAMPLE_1&share=eyJkZXZQb3dlckZpeCI6MSwiZHJhZyI6MCwiZHJhZ1BvaW50IjowLjUsInBhcmV0b1BvaW50IjowLjgsImFycml2YWxSYXRlIjoxMiwiZmx3VGltZU1pbiI6NiwidGltZUJveCI6MTAsImV4cGR0UXVldWVMZW5ndGgiOjAsImV4cGR0RHZVbml0c0ZhY3RvciI6MSwiZmx3SXRtU2l6ZUxpbWl0IjoxLCJudW1iZXJPZlN0ZXBzIjozLCJyYW5nZU1heCI6MTAsInJhbmdlSW5jcmVhc2VSYXRlIjowLjEsInJhbmdlTWlkcG9pbnQiOjAuMSwiZnBzIjoxLCJzaG93TWV0cmljcyI6dHJ1ZSwiY29sb3JHb2xkIjoiZjZiYTAwIiwiY29sb3JHcmV5IjoiODA4MDgwIiwiY29sb3JHcmVlbiI6IjAwZmYwMCIsImNvbG9yQmx1ZSI6IjFkMjU3MCIsInBhcmFtc01heFdpcCI6MTIsInNjYWxlQ20iOjcsInNjYWxlIjowLjA3LCJ4IjowLjA3LCJ5IjowLjA3LCJ6IjowLjA3LCJzdGVwIjowLjM1LCJ5T2Zmc2V0IjowLjcsImRlYXRoIjowLCJiYWNrbG9nRGVhdGgiOjAsInN0ZXBzIjpbeyJuYW1lIjoiQmFja2xvZyIsInN0YXR1cyI6ImJhY2tsb2ciLCJsaW1pdCI6MTIsIm1vdmluZ0xpbWl0IjoxMiwiYXZBZ2UiOjB9LHsibmFtZSI6IkluIFByb2dyZXNzIiwic3RhdHVzIjoidG91Y2giLCJsaW1pdCI6MTIsIm1vdmluZ0xpbWl0IjoxMiwiYXZBZ2UiOjAsImRldlVuaXRzIjo2LCJtb3ZpbmdEZXZVbml0cyI6NiwiZmx3VGltZUF0U3RhcnQiOjYsImFjdHVhbEZsd1RpbWUiOjZ9LHsibmFtZSI6IkRvbmUiLCJzdGF0dXMiOiJkb25lIiwibGltaXQiOjAsImF2QWdlIjowLCJtb3ZpbmdMaW1pdCI6MH1dLCJkZXZQb3dlckZpeFBhcmFtIjpmYWxzZSwiZHJhZ1BhcmFtIjpmYWxzZSwiZHJhZ1BvaW50UGFyYW0iOmZhbHNlLCJwYXJldG9Qb2ludFBhcmFtIjpmYWxzZSwiYXJyaXZhbFJhdGVQYXJhbSI6ZmFsc2UsInRpbWVCb3hQYXJhbSI6dHJ1ZSwiZXhwZHRRdWV1ZUxlbmd0aFBhcmFtIjpmYWxzZSwiZXhwZHREdlVuaXRzRmFjdG9yUGFyYW0iOmZhbHNlLCJmbHdJdG1TaXplTGltaXRQYXJhbSI6ZmFsc2UsImJhY2tsb2dEZWF0aFBhcmFtIjpmYWxzZSwibW92aW5nV2lwTGltaXRzUGFyYW0iOnRydWUsIm1vdmluZ0RldlVuaXRzUGFyYW0iOnRydWUsImZwc1BhcmFtIjp0cnVlfQ==";
const EXAMPLE_2 =
  "/?sid=EXAMPLE_2&share=eyJkZXZQb3dlckZpeCI6My4xLCJkcmFnIjowLjUsImRyYWdQb2ludCI6MC41LCJwYXJldG9Qb2ludCI6MC44LCJhcnJpdmFsUmF0ZSI6MjAsImZsd1RpbWVNaW4iOjMsInRpbWVCb3giOjEwLCJleHBkdFF1ZXVlTGVuZ3RoIjowLCJleHBkdER2VW5pdHNGYWN0b3IiOjEsImZsd0l0bVNpemVMaW1pdCI6MSwibnVtYmVyT2ZTdGVwcyI6NiwicmFuZ2VNYXgiOjEwLCJyYW5nZUluY3JlYXNlUmF0ZSI6MC4xLCJyYW5nZU1pZHBvaW50IjowLjEsImZwcyI6MSwic2hvd01ldHJpY3MiOnRydWUsImNvbG9yR29zZCI6ImY2YmEwMCIsImNvbG9yR3JleSI6IjgwODA4MCIsImNvbG9yR3JlZW4iOiIwMGZmMDAiLCJjb2xvckJsdWUiOiIxZDI1NzAiLCJwYXJhbXNNYXhXaXAiOjIwLCJzY2FsZUNtIjo3LCJzY2FsZSI6MC4wNywieCI6MC4wNywieSI6MC4wNywieiI6MC4wNywic3RlcCI6MC4zNSwieU9mZnNldCI6MC43LCJkZWF0aCI6MCwiYmFja2xvZ0RlYXRoIjowLCJzdGVwcyI6W3sibmFtZSI6IlRvIERvIiwic3RhdHVzIjoiYmFja2xvZyIsImxpbWl0IjoxMCwibW92aW5nTGltaXQiOjEwLCJhdkFnZSI6MCwiZGV2VW5pdHMiOjAsImZsd1RpbWVBdFN0YXJ0IjowLCJhY3R1YWxGbHdUaW1lIjowLCJtb3ZpbmdEZXZVbml0cyI6MH0seyJuYW1lIjoiUmVhZHkiLCJzdGF0dXMiOiJ3YWl0IiwibGltaXQiOjEwLCJtb3ZpbmdMaW1pdCI6MTAsImF2QWdlIjowLCJkZXZVbml0cyI6MCwiZmx3VGltZUF0U3RhcnQiOjAsImFjdHVhbEZsd1RpbWUiOjAsIm1vdmluZ0RldlVuaXRzIjowfSx7Im5hbWUiOiJJbiBQcm9ncmVzcyIsInN0YXR1cyI6InRvdWNoIiwibGltaXQiOjEwLCJtb3ZpbmdMaW1pdCI6MTAsImRldlVuaXRzIjo1LCJtb3ZpbmdEZXZVbml0cyI6NSwiZmx3VGltZUF0U3RhcnQiOjUsImFjdHVhbEZsd1RpbWUiOjUsImF2QWdlIjowfSx7Im5hbWUiOiJSZWFkeSBmb3IgVGVzdCIsInN0YXR1cyI6IndhaXQiLCJsaW1pdCI6MCwibW92aW5nTGltaXQiOjAsImF2QWdlIjowLCJkZXZVbml0cyI6MCwiZmx3VGltZUF0U3RhcnQiOjAsImFjdHVhbEZsd1RpbWUiOjAsIm1vdmluZ0RldlVuaXRzIjowfSx7Im5hbWUiOiJJbiBUZXN0Iiwic3RhdHVzIjoidG91Y2giLCJsaW1pdCI6MTAsIm1vdmluZ0xpbWl0IjoxMCwiZGV2VW5pdHMiOjUsIm1vdmluZ0RldlVuaXRzIjo1LCJmbHdUaW1lQXRTdGFydCI6NSwiYWN0dWFsRmx3VGltZSI6NywiYXZBZ2UiOjB9LHsibmFtZSI6IkRvbmUiLCJzdGF0dXMiOiJkb25lIiwibGltaXQiOjAsImF2QWdlIjowLCJtb3ZpbmdMaW1pdCI6MCwiZGV2VW5pdHMiOjAsImZsd1RpbWVBdFN0YXJ0IjowLCJhY3R1YWxGbHdUaW1lIjowLCJtb3ZpbmdEZXZVbml0cyI6MH1dLCJkZXZQb3dlckZpeFBhcmFtIjp0cnVlLCJkcmFnUGFyYW0iOmZhbHNlLCJkcmFnUG9pbnRQYXJhbSI6ZmFsc2UsInBhcmV0b1BvaW50UGFyYW0iOmZhbHNlLCJhcnJpdmFsUmF0ZVBhcmFtIjpmYWxzZSwidGltZUJveFBhcmFtIjpmYWxzZSwiZXhwZHRRdWV1ZUxlbmd0aFBhcmFtIjpmYWxzZSwiZXhwZHREdlVuaXRzRmFjdG9yUGFyYW0iOmZhbHNlLCJmbHdJdG1TaXplTGltaXRQYXJhbSI6ZmFsc2UsImJhY2tsb2dEZWF0aFBhcmFtIjpmYWxzZSwibW92aW5nV2lwTGltaXRzUGFyYW0iOnRydWUsIm1vdmluZ0RldlVuaXRzUGFyYW0iOnRydWUsImZwc1BhcmFtIjp0cnVlfQ==";
const EXAMPLE_3 =
  "/?sid=EXAMPLE_3&share=eyJkZXZQb3dlckZpeCI6My4zLCJkcmFnIjowLjQsImRyYWdQb2ludCI6MC41LCJwYXJldG9Qb2ludCI6MC4yLCJhcnJpdmFsUmF0ZSI6MTAsImZsd1RpbWVNaW4iOjEwLCJ0aW1lQm94Ijo2MCwiZXhwZHRRdWV1ZUxlbmd0aCI6MCwiZXhwZHREdlVuaXRzRmFjdG9yIjoxLCJmbHdJdG1TaXplTGltaXQiOjEsIm51bWJlck9mU3RlcHMiOjQsInJhbmdlTWF4IjoxMCwicmFuZ2VJbmNyZWFzZVJhdGUiOjAuMSwicmFuZ2VNaWRwb2ludCI6MC4xLCJmcHMiOjEsInNob3dNZXRyaWNzIjp0cnVlLCJjb2xvckdvbGQiOiJmNmJhMDAiLCJjb2xvckdyZXkiOiI4MDgwODAiLCJjb2xvckdyZWVuIjoiMDBmZjAwIiwiY29sb3JCbHVlIjoiMWQyNTcwIiwicGFyYW1zTWF4V2lwIjoyMCwic2NhbGVDbSI6Nywic2NhbGUiOjAuMDcsIngiOjAuMDcsInkiOjAuMDcsInoiOjAuMDcsInN0ZXAiOjAuMzUsInlPZmZzZXQiOjAuNywiZGVhdGgiOjAsImJhY2tsb2dEZWF0aCI6MCwic3RlcHMiOlt7Im5hbWUiOiJPcGVuIiwic3RhdHVzIjoiYmFja2xvZyIsImxpbWl0Ijo2OCwibW92aW5nTGltaXQiOjY4LCJhdkFnZSI6NDAuNTgsImRldlVuaXRzIjowLCJmbHdUaW1lQXRTdGFydCI6MCwiYWN0dWFsRmx3VGltZSI6MCwibW92aW5nRGV2VW5pdHMiOjB9LHsibmFtZSI6IlJlYWR5Iiwic3RhdHVzIjoid2FpdCIsImxpbWl0IjoxMCwibW92aW5nTGltaXQiOjEwLCJhdkFnZSI6NS43LCJkZXZVbml0cyI6MCwiZmx3VGltZUF0U3RhcnQiOjAsImFjdHVhbEZsd1RpbWUiOjAsIm1vdmluZ0RldlVuaXRzIjowfSx7Im5hbWUiOiJJbiBQcm9ncmVzcyIsInN0YXR1cyI6InRvdWNoIiwibGltaXQiOjEzMCwibW92aW5nTGltaXQiOjEzMCwiZGV2VW5pdHMiOjI1LCJtb3ZpbmdEZXZVbml0cyI6MjUsImZsd1RpbWVBdFN0YXJ0IjoxODAsImFjdHVhbEZsd1RpbWUiOjE4MCwiYXZBZ2UiOjEwMC42NX0seyJuYW1lIjoiRG9uZSIsInN0YXR1cyI6ImRvbmUiLCJsaW1pdCI6MCwiYXZBZ2UiOjAsIm1vdmluZ0xpbWl0IjowLCJkZXZVbml0cyI6MCwiZmx3VGltZUF0U3RhcnQiOjAsImFjdHVhbEZsd1RpbWUiOjAsIm1vdmluZ0RldlVuaXRzIjowfV0sImRldlBvd2VyRml4UGFyYW0iOmZhbHNlLCJkcmFnUGFyYW0iOmZhbHNlLCJkcmFnUG9pbnRQYXJhbSI6ZmFsc2UsInBhcmV0b1BvaW50UGFyYW0iOmZhbHNlLCJhcnJpdmFsUmF0ZVBhcmFtIjpmYWxzZSwidGltZUJveFBhcmFtIjpmYWxzZSwiZXhwZHRRdWV1ZUxlbmd0aFBhcmFtIjpmYWxzZSwiZXhwZHREdlVuaXRzRmFjdG9yUGFyYW0iOmZhbHNlLCJmbHdJdG1TaXplTGltaXRQYXJhbSI6dHJ1ZSwiYmFja2xvZ0RlYXRoUGFyYW0iOmZhbHNlLCJtb3ZpbmdXaXBMaW1pdHNQYXJhbSI6dHJ1ZSwibW92aW5nRGV2VW5pdHNQYXJhbSI6ZmFsc2UsImZwc1BhcmFtIjp0cnVlfQ==";
//------------------------------------------------------------------
// removeQueryString()
//------------------------------------------------------------------
const removeQueryString = () => {
  const currentUrl =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "") +
    window.location.pathname;
  window.history.replaceState({}, null, currentUrl);
};
if (typeof process === "undefined") {
  window.addEventListener("load", () => {
    removeQueryString();
  });
}

//------------------------------------------------------------------
// loadSharedSettings()
//------------------------------------------------------------------
const loadSharedSettings =
  (
    sid /*: string | typeof undefined */,
    share /*: string | typeof undefined */,
  ) /*: () => void */ =>
  () /*: void */ => {
    // This is a random asynchronous setting to check
    const death = gSttngs().get("death");
    if (death !== undefined) {
      if (sid !== undefined && share !== undefined) {
        gSttngs().setSid(sid);
        const keyValuePairs = JSON.parse(atob(share));
        Object.keys(keyValuePairs).forEach((key /*: string */) /*: void */ => {
          gSttngs().set(key, keyValuePairs[key]);
        });
        // Reinitalize the simulation
        setUpFlwMap();
      }
    } else {
      setTimeout(loadSharedSettings(sid, share), 1000);
    }
  };
//------------------------------------------------------------------
// hideOrShowShortcutsDiv()
//------------------------------------------------------------------
const hideOrShowShortcutsDivs =
  (shortcutsToggle) /*: () => void */ => () /*: void */ => {
    const shortcutsContainer = document.getElementById("shortcuts-container");
    if (shortcutsContainer !== null) {
      if (shortcutsToggle === true) {
        shortcutsContainer.style.display = "flex";
      } else {
        shortcutsContainer.style.display = "none";
      }
    }
  };
//------------------------------------------------------------------
// cssStyles()
//------------------------------------------------------------------
const cssStyles = () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flw"));

  const [styles] = createStyles({
    flw: {
      width: "100%",
      height: "100%",
      backgroundImage: "url(/img/bg3.png)",
      backgroundClip: "border-box",
      backgroundSize: "cover",
      backgroundRepeat: "none",
      position: "absolute",
      backgroundPosition: "center",
    },
    logoDiv: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      marginTop: "-20px",
      marginBottom: "-60px",
    },
    logo: {
      width: "100vw",
      maxWidth: "100vh",
      minWidth: "80vh",
      height: "auto",
      marginTop: "0vh",
    },
    shortcutsDiv: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "130px",
      zIndex: "2",
      paddingTop: "0px",
      paddingLeft: "20px",
      paddingRight: "20px",
      boxSizing: "border-box",
    },
    shortcutsSelect: {
      display: "block",
      maxWidth: "400px",
    },
  });
  return styles;
};
