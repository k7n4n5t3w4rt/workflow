var alphas = /*#__PURE__*/'abcdefghijklmnopqrstuvwxyz'.split('');
function numToAlpha(num) {
  return alphas[num];
}

var inc = /*#__PURE__*/Date.now();
function setSeed(seed) {
  if (seed === null) {
    inc = Date.now();
    return;
  }

  if (typeof seed !== 'number') throw Error('Unable to setSeed as provided seed was not a valid number');
  if (seed === Number.MAX_SAFE_INTEGER) throw Error('Unable to setSeed because the seed was already the maximum safe JavaScript number allowed');
  if (seed === Number.POSITIVE_INFINITY || seed === Number.NEGATIVE_INFINITY) throw new Error('Unable to setSeed. Positive or negative infinity is not allowed');
  if (seed < 0) throw new Error('Unable to setSeed. Seed must be a number >= 0');
  inc = seed;
}
var numPairsRegex = /(\d{1,2})/g;
function getUniqueSuffix() {
  var numPairs = [];
  var incStr = inc.toString();
  var result = numPairsRegex.exec(incStr);

  while (result) {
    numPairs.push(result[0]);
    result = numPairsRegex.exec(incStr);
  }

  var out = '_';
  numPairs.forEach(function (pair) {
    var val = +pair;

    if (val > 25) {
      var _pair$split = pair.split(''),
          first = _pair$split[0],
          second = _pair$split[1];

      out += "" + numToAlpha(+first) + numToAlpha(+second);
    } else out += numToAlpha(val);
  });
  inc += 1;
  return out;
}
function generateClassName(c) {
  return "" + c + getUniqueSuffix();
}

var posthooks = [];
function getPosthooks() {
  return posthooks;
}
function registerPosthook(posthook) {
  posthooks.push(posthook);
}

function isNestedSelector(r) {
  return /&/g.test(r);
}

function isMedia(r) {
  return r.toLowerCase().startsWith('@media');
}

function formatCSSRuleName(rule) {
  return rule.replace(/([A-Z])/g, function (p1) {
    return "-" + p1.toLowerCase();
  });
}

function formatCSSRules(cssRules) {
  return Object.entries(cssRules).reduce(function (prev, _ref) {
    var cssProp = _ref[0],
        cssVal = _ref[1];
    return "" + prev + formatCSSRuleName(cssProp) + ":" + cssVal + ";";
  }, '');
}

function execCreateStyles(rules, options, parentSelector, noGenerateClassName) {
  if (noGenerateClassName === void 0) {
    noGenerateClassName = false;
  }

  var out = {};
  var sheetBuffer = '';
  var mediaQueriesbuffer = '';
  var styleEntries = Object.entries(rules);
  var ruleWriteOpen = false;

  var guardCloseRuleWrite = function guardCloseRuleWrite() {
    if (ruleWriteOpen) sheetBuffer += '}';
    ruleWriteOpen = false;
  };

  var _loop = function _loop() {
    var _styleEntries$_i = _styleEntries[_i],
        classNameOrCSSRule = _styleEntries$_i[0],
        classNameRules = _styleEntries$_i[1];

    // if the classNameRules is a string, we are dealing with a display: none; type rule
    if (isMedia(classNameOrCSSRule)) {
      if (typeof classNameRules !== 'object') throw new Error('Unable to map @media query because rules / props are an invalid type');
      guardCloseRuleWrite();
      mediaQueriesbuffer += classNameOrCSSRule + "{";

      var _execCreateStyles = execCreateStyles(classNameRules, options, parentSelector),
          regularOutput = _execCreateStyles[1],
          mediaQueriesOutput = _execCreateStyles[2];

      mediaQueriesbuffer += regularOutput;
      mediaQueriesbuffer += '}';
      mediaQueriesbuffer += mediaQueriesOutput;
    } else if (isNestedSelector(classNameOrCSSRule)) {
      if (!parentSelector) throw new Error('Unable to generate nested rule because parentSelector is missing');
      guardCloseRuleWrite(); // format of { '& > span': { display: 'none' } } (or further nesting)

      var replaced = classNameOrCSSRule.replace(/&/g, parentSelector);
      replaced.split(/,\s*/).forEach(function (selector) {
        var _execCreateStyles2 = execCreateStyles(classNameRules, options, selector),
            regularOutput = _execCreateStyles2[1],
            mediaQueriesOutput = _execCreateStyles2[2];

        sheetBuffer += regularOutput;
        mediaQueriesbuffer += mediaQueriesOutput;
      });
    } else if (!parentSelector && typeof classNameRules === 'object') {
      guardCloseRuleWrite();
      var generated = noGenerateClassName ? classNameOrCSSRule : generateClassName(classNameOrCSSRule);
      out[classNameOrCSSRule] = generated;
      var generatedSelector = "" + (noGenerateClassName ? '' : '.') + generated;

      var _execCreateStyles3 = execCreateStyles(classNameRules, options, generatedSelector),
          _regularOutput = _execCreateStyles3[1],
          _mediaQueriesOutput = _execCreateStyles3[2];

      sheetBuffer += _regularOutput;
      mediaQueriesbuffer += _mediaQueriesOutput;
    } else {
      var _formatCSSRules2;

      if (!parentSelector) throw new Error('Unable to write css props because parent selector is null');

      if (!ruleWriteOpen) {
        var _formatCSSRules;

        sheetBuffer += parentSelector + "{" + formatCSSRules((_formatCSSRules = {}, _formatCSSRules[classNameOrCSSRule] = classNameRules, _formatCSSRules));
        ruleWriteOpen = true;
      } else sheetBuffer += formatCSSRules((_formatCSSRules2 = {}, _formatCSSRules2[classNameOrCSSRule] = classNameRules, _formatCSSRules2));
    }
  };

  for (var _i = 0, _styleEntries = styleEntries; _i < _styleEntries.length; _i++) {
    _loop();
  }

  guardCloseRuleWrite();
  return [out, sheetBuffer, mediaQueriesbuffer];
}

function replaceBackReferences(out, sheetContents) {
  var outputSheetContents = sheetContents;
  var toReplace = [];
  var toReplaceRegex = /\$\w([a-zA-Z0-9_-]+)?/gm;
  var matches = toReplaceRegex.exec(outputSheetContents);

  while (matches) {
    toReplace.push(matches[0].valueOf());
    matches = toReplaceRegex.exec(outputSheetContents);
  }

  for (var _i2 = 0, _toReplace = toReplace; _i2 < _toReplace.length; _i2++) {
    var r = _toReplace[_i2];
    outputSheetContents = outputSheetContents.replace(r, "." + out[r.substring(1)]);
  }

  return getPosthooks().reduce(function (prev, hook) {
    return hook(prev);
  }, outputSheetContents);
}

function createSheet(sheetContents) {
  if (typeof document !== 'undefined' && document.head && document.head.appendChild && typeof document.createElement === 'function') {
    var styleTag = document.createElement('style');
    styleTag.innerHTML = sheetContents;
    return styleTag;
  }

  return null;
}

function flushSheetContents(sheetContents, options) {
  // In case we're in come weird test environment that doesn't support JSDom
  var styleTag = createSheet(sheetContents);

  if (styleTag) {
    var _options$insertAfter, _options$insertBefore;

    if (options != null && options.insertAfter && options != null && options.insertBefore) {
      throw new Error('Both insertAfter and insertBefore were provided. Please choose only one.');
    }

    if (options != null && (_options$insertAfter = options.insertAfter) != null && _options$insertAfter.after) options.insertAfter.after(styleTag);else if (options != null && (_options$insertBefore = options.insertBefore) != null && _options$insertBefore.before) options.insertBefore.before(styleTag);else document.head.appendChild(styleTag);
  }

  return styleTag;
}

function coerceCreateStylesOptions(options) {
  return {
    flush: options && typeof options.flush === 'boolean' ? options.flush : true
  };
}

function rawStyles(rules, options) {
  var coerced = coerceCreateStylesOptions(options);

  var _execCreateStyles4 = execCreateStyles(rules, coerced, null, true),
      sheetContents = _execCreateStyles4[1],
      mediaQueriesContents = _execCreateStyles4[2];

  var mergedContents = "" + sheetContents + mediaQueriesContents;
  if (coerced.flush) flushSheetContents(mergedContents, options);
  return mergedContents;
}
function keyframes(frames, options) {
  var coerced = coerceCreateStylesOptions(options);
  var keyframeName = generateClassName('keyframes_');

  var _execCreateStyles5 = execCreateStyles(frames, coerced, null, true),
      keyframesContents = _execCreateStyles5[1];

  var sheetContents = "@keyframes " + keyframeName + "{" + keyframesContents + "}";
  if (coerced.flush) flushSheetContents(sheetContents);
  return [keyframeName, sheetContents];
}
function createStyles(rules, options) {
  var coerced = coerceCreateStylesOptions(options);

  var _execCreateStyles6 = execCreateStyles(rules, coerced, null),
      out = _execCreateStyles6[0],
      sheetContents = _execCreateStyles6[1],
      mediaQueriesContents = _execCreateStyles6[2];

  var mergedContents = "" + sheetContents + mediaQueriesContents;
  var replacedSheetContents = replaceBackReferences(out, mergedContents);
  var sheet = null;

  var updateSheet = function updateSheet(updatedRules) {
    if (sheet) {
      var _execCreateStyles7 = execCreateStyles(updatedRules, {
        flush: false
      }, null),
          updatedOut = _execCreateStyles7[0],
          updatedSheetContents = _execCreateStyles7[1],
          updatedMediaQueriesContents = _execCreateStyles7[2];

      var updatedMergedContents = "" + updatedSheetContents + updatedMediaQueriesContents;
      var updatedReplacedSheetContents = replaceBackReferences(out, updatedMergedContents);
      sheet.innerHTML = updatedReplacedSheetContents;
      return [updatedOut, updatedReplacedSheetContents];
    }

    return null;
  };

  if (coerced.flush) sheet = flushSheetContents(replacedSheetContents, options); // Need this TS cast to get solid code assist from the consumption-side

  return [out, replacedSheetContents, updateSheet];
}

export { createStyles, keyframes, rawStyles, registerPosthook, setSeed };
