// @flow
//------------------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------------------
// EASY
//------------------------------------------------------------------------------
const easyStorage = {
  set: (
    sid /*: string */,
    dKey /*: string */,
    dValue /*: string */,
  ) /*: Promise<{ [string]: string }> | Promise<null> */ => {
    if (
      (typeof process === "undefined" || process.env.RUN_CONTEXT !== "testy") &&
      gSttngs().get("easyStorage") === true
    ) {
      return fetch(
        `https://easy-oe3ejk3kya-ts.a.run.app/set?sid=${sid}&dkey=${dKey}&dvalue=${dValue}`,
        // `http://localhost:5000/set?sid=${sid}&dkey=${dKey}&dvalue=${dValue}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        },
      )
        .then((response /*: Object */) /*: Promise<Object> */ => {
          //return "{}";
          return response.json();
        })
        .then((data /*: Object */) /*: Promise<Object> */ => {
          return data;
        })
        .catch((e /*: Error */) /*: Object */ => {
          // TODO: This seems to be throwing on CORS requests.
          console.error(e);
        });
    } else {
      return Promise.resolve(null);
    }
  },
  get: (
    sid /*: string */,
    dKey /*: string */,
  ) /*: Promise<{ [string]: string }> | Promise<null> */ => {
    if (
      (typeof process === "undefined" || process.env.RUN_CONTEXT !== "testy") &&
      gSttngs().get("easyStorage") === true
    ) {
      return fetch(
        `https://easy-oe3ejk3kya-ts.a.run.app/get?sid=${sid}&dkey=${dKey}`,
        // `http://localhost:5000/get?sid=${sid}&dkey=${dKey}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        },
      )
        .then((response /*: Object */) /*: Promise<Object> */ => {
          //return "{}";
          return response.json();
        })
        .then((data /*: Object */) /*: Promise<Object> */ => {
          return data;
        })
        .catch((e /*: Error */) /*: Object */ => {
          // TODO: This seems to be throwing on CORS requests.
          console.error(e);
        });
    } else {
      return Promise.resolve(null);
    }
  },
  getAll: (
    sid /*: string */,
  ) /*: Promise<{ [string]: string }> | Promise<null> */ => {
    if (
      (typeof process === "undefined" || process.env.RUN_CONTEXT !== "testy") &&
      gSttngs().get("easyStorage") === true
    ) {
      return fetch(
        `https://easy-oe3ejk3kya-ts.a.run.app/getall?sid=${sid}`,
        // `http://localhost:5000/get?sid=${sid}&dkey=${dKey}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        },
      )
        .then((response /*: Object */) /*: Promise<Object> */ => {
          //return "{}";
          return response.json();
        })
        .then((data /*: Object */) /*: Promise<Object> */ => {
          return data;
        })
        .catch((e /*: Error */) /*: Object */ => {
          // TODO: This seems to be throwing on CORS requests.
          console.error(e);
        });
    } else {
      return Promise.resolve(null);
    }
  },
};
export default easyStorage;
