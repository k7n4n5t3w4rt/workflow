//------------------------------------------------------------------------------
// EASY
//------------------------------------------------------------------------------
const easyStorage = {
  set: (
    sid /*: string */,
    dKey /*: string */,
    dValue /*: string */,
  ) /*: Promise<{ [string]: string }> */ => {
    return fetch(
      `https://easy-oe3ejk3kya-ts.a.run.app/set?sid=${sid}&dkey=${dKey}&dvalue=${dValue}`,
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
        // console.log(data);
        return data;
      })
      .catch((e /*: Error */) /*: Object */ => {
        // TODO: This seems to be throwing on CORS requests.
        console.error(e);
      });
  },
  get: (
    sid /*: string */,
    dKey /*: string */,
  ) /*: Promise<{ [string]: string }> */ => {
    return fetch(
      `https://easy-oe3ejk3kya-ts.a.run.app/get?sid=${sid}&dkey=${dKey}`,
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
        // console.log(data);
        return data;
      })
      .catch((e /*: Error */) /*: Object */ => {
        // TODO: This seems to be throwing on CORS requests.
        console.error(e);
      });
  },
};
export default easyStorage;
