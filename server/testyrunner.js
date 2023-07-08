// @flow
import glob from "glob";
import { exec } from "child_process";

let counter /*: number */ = 0;

let testyExecs /*: Array<() => Promise<Array<string>>> */ = [];

const execFactory = async (e /*: Error */, testies /*: Array<string> */) => {
  testyExecs = [
    ...testyExecs,
    ...(await testies.reduce(execFactoryReducerFunction, Promise.resolve([]))),
  ];
  const faucetMessages /*: Array<string>*/ = await testyExecs.reduce(
    execReducerFunction,
    Promise.resolve([]),
  );
  // Log this out for the faucet reporter
  console.log(`1..${faucetMessages.length}`);
  faucetMessages
    .sort((a /*: string */, b /*: string */) /*: number */ => {
      // faucet needs the messages to be sorted by test number
      const aNum = cleanInt(a.split(" ")[1]);
      const bNum = cleanInt(b.split(" ")[1]);
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
      // a must be equal to b
      return 0;
    })
    .forEach((message /*: string */) => {
      // Log this out for the faucet reporter
      console.log(message);
    });
};

glob("**/testies/*.testy.js", execFactory);

//------------------------------------------------------------------
// cleanInt()
//------------------------------------------------------------------
const cleanInt = (getVar /*: string */) /*: number */ => {
  return Math.abs(Math.floor(parseFloat(getVar)) || 0);
};

const experimentalWarningFilter = (currentElement /*: string */) => {
  return (
    currentElement.indexOf(
      "ExperimentalWarning: The ESM module loader is experimental",
    ) === -1 && currentElement !== ""
  );
};

const processExecMessages =
  (resolve /*: function */) =>
  (
    e /*: Error */,
    stdout /*: function */,
    stderr /*: function */,
  ) /*: void */ => {
    if (e) {
      ++counter;
      resolve([`${e.message}...${stderr}`]);
    }
    let messageString = stdout.trim();
    if (stderr) {
      const notOks /*: Array<string> */ = stderr.split(/\r?\n/) || [];
      const trimmedNotOks = notOks.map((currentElement /*: string */) =>
        currentElement.trim(),
      );
      // Get rid of the stupid NodeJS es module warning
      const filtered = trimmedNotOks.filter(experimentalWarningFilter);
      if (filtered.length) {
        messageString += " - " + filtered.join(" ~ ");
      }
    }
    const messages /*: Array<string> */ = messageString.split(/\r?\n/) || [];
    const filteredMessages = messages
      .filter((currentElement /*: string */) => currentElement !== "")
      .sort();
    resolve(messages);
  };

const execFactoryReducerFunction = async (
  carry /*: Promise<Array<() => Promise<Array<string>>>> */,
  testyFilePath /*: string */,
) => {
  return [
    ...(await carry),
    () => {
      return new Promise((resolve) => {
        exec(`node ${testyFilePath}`, processExecMessages(resolve));
      });
    },
  ];
};

const execReducerFunction = async (
  carry /*: Promise<Array<string>> */,
  testyExec /*: () => Promise<Array<string>> */,
) => {
  const flatMessages /*: Array<string>*/ = [];
  const oksOrNotOk = await testyExec();
  oksOrNotOk.forEach((message /*: string */) => {
    // console.log("ADDING MESSAGE TO THE flatMessages", message);
    ++counter;
    flatMessages.push(message.replace(/ok/, `ok ${counter}`));
  });
  return [...(await carry), ...flatMessages];
};
