//------------------------------------------------------------------------------
// EASY
//------------------------------------------------------------------------------
const easyStorage = {};
easyStorage.set = (dKey /*: string */, dValue /*: string */) => {
  fetch(`http://localhost:5000/set?sid=wrkflw&dkey=${dKey}&dvalue=${dValue}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then((response /*: Object */) => {
      //return "{}";
      return response.json();
    })
    .then((data /*: Object */) => {
      console.log(data);
    })
    .catch((e /*: Error */) => {
      // TODO: This seems to be throwing on CORS requests.
      // console.error(e);
    });
};
easyStorage.get = (dKey /*: string */) => {
  fetch(`http://localhost:5000/get?sid=wrkflw&dkey=${dKey}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then((response /*: Object */) => {
      //return "{}";
      return response.json();
    })
    .then((data /*: Object */) => {
      console.log(data);
    })
    .catch((e /*: Error */) => {
      // TODO: This seems to be throwing on CORS requests.
      // console.error(e);
    });
};
export default easyStorage;
