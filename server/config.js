// @flow
// Here we're assuming that all environment variables are strings
const NODE_ENV /*: string */ = process.env.NODE_ENV || "development";
const REMEMBER_ME /*: boolean */ = process.env.REMEMBER_ME === "true";
const PORT /*: number */ = parseInt(process.env.PORT) || 4000;
const SSR /*: boolean */ = process.env.SSR === "false";
const EASY_URL /*: string */ = process.env.EASY_URL || "localhost:5000";

export default { NODE_ENV, EASY_URL, REMEMBER_ME, PORT, SSR };
