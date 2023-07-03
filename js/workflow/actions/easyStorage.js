//------------------------------------------------------------------------------
// EASY
//------------------------------------------------------------------------------
const easyStorage = {};
easyStorage.set = (
  sid /*: string */,
  dKey /*: string */,
  dValue /*: string */,
) /*: Promise<{ [string]: string }> */ => {
  return fetch(
    `http://localhost:5000/set?sid=${sid}&dkey=${dKey}&dvalue=${dValue}`,
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
    .then((response /*: Object */) => {
      //return "{}";
      return response.json();
    })
    .then((data /*: Object */) => {
      console.log(data);
      return data;
    })
    .catch((e /*: Error */) => {
      // TODO: This seems to be throwing on CORS requests.
      console.error(e);
    });
};
easyStorage.get = (
  sid /*: string */,
  dKey /*: string */,
) /*: Promise<{ [string]: string }> */ => {
  return fetch(`http://localhost:5000/get?sid=${sid}&dkey=${dKey}`, {
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
      return data;
    })
    .catch((e /*: Error */) => {
      // TODO: This seems to be throwing on CORS requests.
      console.error(e);
    });
};
export default easyStorage;
