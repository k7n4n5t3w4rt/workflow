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
import Params from "./Settings/Params.js";
import Sttngs from "./Settings/Settings.js";
import LinkedIn from "./LinkedIn.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
// import setupMobileDebug from "../setup_mobile_debug.js";
import AppReducer from "../appReducer.js";
import createStats from "../create_stats.js";
import init from "./actions/init.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";
import populateStepsGlobal from "./Settings/populateStepsGlobal.js";

/*::
type Props = {
	sid?: string,
	share?: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  // Initialize global settings and state
  useEffect(() => {
    // setupMobileDebug();
    let stats = createStats();
    init();
  }, []);
  useEffect(() => {
    loadSharedSettings(props.sid, props.share)();
    populateStepsGlobal();
  }, [props.share]);

  return html`
    <div id="flw" className="${styles.flw}">
      <div id="logo" className="${styles.logoDiv}">
        <img src="/img/logo_web_white.png" className="${styles.logo}" />
      </div>
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Metrics} />
        <div className="${styles.shortcutsDiv}">
          <div id="simplistic" className="${styles.shortcut}">
            <a
              className="${styles.shortcutLink}"
              onClick="${() => {
                window.location.href = LEVEL1;
              }}"
              href="${LEVEL1}"
              data-native
              >LEVEL 1:<br />Simple<br />System</a
            >
          </div>
          <div id="bottleneck" className="${styles.shortcut}">
            <a
              className="${styles.shortcutLink}"
              onClick="${() => {
                window.location.href = LEVEL2;
              }}"
              href="${LEVEL2}"
              data-native
              >LEVEL 2:<br />Bottleneck<br />
              in Test</a
            >
          </div>
          <div id="initiativeWipProblem" className="${styles.shortcut}">
            <a
              className="${styles.shortcutLink}"
              onClick="${() => {
                window.location.href = LEVEL3;
              }}"
              href="${LEVEL3}"
              >LEVEL 3:<br />Initiative<br />WIP Problem</a
            >
          </div>
        </div>
        <${Share} />
        <${LinkedIn} />
        <button id="ARButton">START</button>
        <${Sttngs} />
        <${Params} />
      </div>
    </div>
  `;
};
const LEVEL1 =
  "/?sid=LEVEL1&share=eyJkZXZQb3dlckZpeCI6MSwiZHJhZyI6MCwiZHJhZ1BvaW50IjowLjUsInBhcmV0b1BvaW50IjowLjgsImFycml2YWxSYXRlIjoxMCwiZmx3VGltZU1pbiI6MiwidGltZUJveCI6MTAsImV4cGR0UXVldWVMZW5ndGgiOjAsImV4cGR0RHZVbml0c0ZhY3RvciI6MSwiZmx3SXRtU2l6ZUxpbWl0IjoxLCJudW1iZXJPZlN0ZXBzIjozLCJyYW5nZU1heCI6MTAsInJhbmdlSW5jcmVhc2VSYXRlIjowLjEsInJhbmdlTWlkcG9pbnQiOjAuMSwiZnBzIjoxLCJzaG93TWV0cmljcyI6dHJ1ZSwiY29sb3JHb2xkIjoiZjZiYTAwIiwiY29sb3JHcmV5IjoiODA4MDgwIiwiY29sb3JHcmVlbiI6IjAwZmYwMCIsImNvbG9yQmx1ZSI6IjFkMjU3MCIsInBhcmFtc01heFdpcCI6MTAsInNjYWxlQ20iOjcsInNjYWxlIjowLjA3LCJ4IjowLjA3LCJ5IjowLjA3LCJ6IjowLjA3LCJzdGVwIjowLjM1LCJ5T2Zmc2V0IjowLjcsImRlYXRoIjowLCJiYWNrbG9nRGVhdGgiOjAsInN0ZXBzIjpbeyJuYW1lIjoiT3BlbiIsInN0YXR1cyI6ImJhY2tsb2ciLCJsaW1pdCI6MTAsIm1vdmluZ0xpbWl0IjoxMCwiYXZBZ2UiOjB9LHsibmFtZSI6IkluIFByb2dyZXNzIiwic3RhdHVzIjoidG91Y2giLCJsaW1pdCI6NiwibW92aW5nTGltaXQiOjYsImF2QWdlIjowLCJkZXZVbml0cyI6NiwibW92aW5nRGV2VW5pdHMiOjYsImZsd1RpbWVBdFN0YXJ0IjoyLCJhY3R1YWxGbHdUaW1lIjoyfSx7Im5hbWUiOiJEb25lIiwic3RhdHVzIjoiZG9uZSIsImxpbWl0IjowLCJhdkFnZSI6MCwibW92aW5nTGltaXQiOjB9XX0=";
const LEVEL2 =
  "/?sid=LEVEL2&share=eyJkZXZQb3dlckZpeCI6Mi4yMywiZHJhZyI6MC41LCJkcmFnUG9pbnQiOjAuNSwicGFyZXRvUG9pbnQiOjAuMiwiYXJyaXZhbFJhdGUiOjEwLCJmbHdUaW1lTWluIjoxLCJ0aW1lQm94IjoxMCwiZXhwZHRRdWV1ZUxlbmd0aCI6MCwiZXhwZHREdlVuaXRzRmFjdG9yIjoxLCJmbHdJdG1TaXplTGltaXQiOjEsIm51bWJlck9mU3RlcHMiOjYsInJhbmdlTWF4IjoxMCwicmFuZ2VJbmNyZWFzZVJhdGUiOjAuMSwicmFuZ2VNaWRwb2ludCI6MC4xLCJmcHMiOjEsInNob3dNZXRyaWNzIjp0cnVlLCJjb2xvckdvbGQiOiJmNmJhMDAiLCJjb2xvckdyZXkiOiI4MDgwODAiLCJjb2xvckdyZWVuIjoiMDBmZjAwIiwiY29sb3JCbHVlIjoiMWQyNTcwIiwicGFyYW1zTWF4V2lwIjoyMCwic2NhbGVDbSI6Nywic2NhbGUiOjAuMDcsIngiOjAuMDcsInkiOjAuMDcsInoiOjAuMDcsInN0ZXAiOjAuMzUsInlPZmZzZXQiOjAuNywiZGVhdGgiOjAsImJhY2tsb2dEZWF0aCI6MCwic3RlcHMiOlt7Im5hbWUiOiJPcGVuIiwic3RhdHVzIjoiYmFja2xvZyIsImxpbWl0IjoxMCwibW92aW5nTGltaXQiOjEwLCJhdkFnZSI6MH0seyJuYW1lIjoiUmVhZHkiLCJzdGF0dXMiOiJ3YWl0IiwibGltaXQiOjEwLCJtb3ZpbmdMaW1pdCI6MTAsImF2QWdlIjowfSx7Im5hbWUiOiJJbiBQcm9ncmVzcyIsInN0YXR1cyI6InRvdWNoIiwibGltaXQiOjEwLCJtb3ZpbmdMaW1pdCI6MTAsImRldlVuaXRzIjo1LCJtb3ZpbmdEZXZVbml0cyI6NSwiZmx3VGltZUF0U3RhcnQiOjUsImFjdHVhbEZsd1RpbWUiOjUsImF2QWdlIjowfSx7Im5hbWUiOiJSZWFkeSBmb3IgVGVzdCIsInN0YXR1cyI6IndhaXQiLCJsaW1pdCI6MCwibW92aW5nTGltaXQiOjAsImF2QWdlIjowfSx7Im5hbWUiOiJJbiBUZXN0Iiwic3RhdHVzIjoidG91Y2giLCJsaW1pdCI6MTAsIm1vdmluZ0xpbWl0IjoxMCwiZGV2VW5pdHMiOjUsIm1vdmluZ0RldlVuaXRzIjo1LCJmbHdUaW1lQXRTdGFydCI6NSwiYWN0dWFsRmx3VGltZSI6Ny41LCJhdkFnZSI6MH0seyJuYW1lIjoiRG9uZSIsInN0YXR1cyI6ImRvbmUiLCJsaW1pdCI6MCwiYXZBZ2UiOjAsIm1vdmluZ0xpbWl0IjowfV19";
const LEVEL3 =
  "/?sid=LEVEL3&share=eyJkZXZQb3dlckZpeCI6MS44LCJkcmFnIjowLjIsInBhcmV0b1BvaW50IjowLjIsImFycml2YWxSYXRlIjoxMCwiZmx3VGltZU1pbiI6MTAsInRpbWVCb3giOjYwLCJleHBkdFF1ZXVlTGVuZ3RoIjowLCJleHBkdER2VW5pdHNGYWN0b3IiOjEsImZsd0l0bVNpemVMaW1pdCI6MSwibnVtYmVyT2ZTdGVwcyI6NCwicmFuZ2VNYXgiOjEwLCJyYW5nZUluY3JlYXNlUmF0ZSI6MC4xLCJyYW5nZU1pZHBvaW50IjowLjEsImZwcyI6MSwic2hvd01ldHJpY3MiOnRydWUsImNvbG9yR29sZCI6ImY2YmEwMCIsImNvbG9yR3JleSI6IjgwODA4MCIsImNvbG9yR3JlZW4iOiIwMGZmMDAiLCJjb2xvckJsdWUiOiIxZDI1NzAiLCJwYXJhbXNNYXhXaXAiOjIwLCJzY2FsZUNtIjo3LCJzY2FsZSI6MC4wNywieCI6MC4wNywieSI6MC4wNywieiI6MC4wNywic3RlcCI6MC4zNSwieU9mZnNldCI6MC43LCJkZWF0aCI6MCwiYmFja2xvZ0RlYXRoIjowLCJzdGVwcyI6W3sibmFtZSI6Ik9wZW4iLCJzdGF0dXMiOiJiYWNrbG9nIiwibGltaXQiOjY4LCJtb3ZpbmdMaW1pdCI6NjgsImF2QWdlIjo0MC41OH0seyJuYW1lIjoiUmVhZHkiLCJzdGF0dXMiOiJ3YWl0IiwibGltaXQiOjEwLCJtb3ZpbmdMaW1pdCI6MTAsImF2QWdlIjo1Ljd9LHsibmFtZSI6IkluIFByb2dyZXNzIiwic3RhdHVzIjoidG91Y2giLCJsaW1pdCI6MTMwLCJtb3ZpbmdMaW1pdCI6MTMwLCJkZXZVbml0cyI6MjUsIm1vdmluZ0RldlVuaXRzIjoyNSwiZmx3VGltZUF0U3RhcnQiOjE4MCwiYWN0dWFsRmx3VGltZSI6MTgwLCJhdkFnZSI6MTAwLjY1fSx7Im5hbWUiOiJEb25lIiwic3RhdHVzIjoiZG9uZSIsImxpbWl0IjowLCJhdkFnZSI6MCwibW92aW5nTGltaXQiOjB9XX0=";
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
      }
    } else {
      setTimeout(loadSharedSettings(sid, share), 1000);
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
      backgroundImage: "url(/img/bg2.png)",
      backgroundClip: "border-box",
      backgroundSize: "cover",
      backgroundRepeat: "none",
      position: "absolute",
      backgroundPosition: "center",
    },
    logoDiv: {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    logo: {
      width: "75vw",
      maxWidth: "100vh",
      minWidth: "40vh",
      height: "auto",
      marginTop: "10vh",
    },
    shortcutsDiv: {
      position: "absolute",
      left: "0",
      bottom: "20px",
      width: "100%",
      height: "30%",
      zIndex: "2",
    },
    shortcut: {
      outline: "1px solid white",
      width: "30vw",
      height: "20vw",
      margin: "1.6vw",
      float: "left",
    },
    shortcutLink: {
      width: "100%",
      height: "100%",
      display: "block",
      color: "white",
      textShadow: "2px 2px 2px grey",
      textDecoration: "none",
      textAlign: "center",
      paddingTop: "11%",
    },
  });
  return styles;
};
