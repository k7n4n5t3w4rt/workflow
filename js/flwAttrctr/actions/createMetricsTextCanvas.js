// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// FUNCTION: createMetricsTextCanvas()
//------------------------------------------------------------------
export const createMetricsTextCanvas = (
  metics /*: Array<{key:string,value:string}> */,
  color /*: string */ = "white",
  borderColor /*: string */ = "white",
  bgColor /*: string */ = "black",
  bgOpacity /*: number */ = 0.25,
) /*: Object */ => {
  const scaleCm = gState().get("scaleCm");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const fontSize = 25; // in pixels
  ctx.font = `${fontSize}px Verdana`;
  // Measure the maximum width among all lines of text
  let maxTextWidth = 0;
  const textLines = metics.map((m) => `${m.key}: ${m.value}`);
  for (const line of textLines) {
    const lineWidth = ctx.measureText(line).width;
    if (lineWidth > maxTextWidth) {
      maxTextWidth = lineWidth;
    }
  }
  canvas.width = maxTextWidth * 1.5;
  canvas.height = fontSize * textLines.length * scaleCm; // Adjusted for multiple lines
  const borderThickness = 2;
  // Background fill
  ctx.globalAlpha = bgOpacity;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Border drawing
  ctx.globalAlpha = 1; // Reset opacity for the border
  ctx.lineWidth = borderThickness;
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(
    borderThickness / 2,
    borderThickness / 2,
    canvas.width - borderThickness,
    canvas.height - borderThickness,
  );
  // Text color
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Verdana`;
  ctx.textBaseline = "top";
  // Write each line of text
  let offsetY = 105;
  for (const line of textLines) {
    const lineWidth = ctx.measureText(line).width;
    const centerX = (canvas.width - lineWidth) / 2; // Center horizontally
    ctx.fillText(line, centerX, offsetY);
    offsetY += fontSize * (scaleCm / 2);
  }
  return canvas;
};
export default createMetricsTextCanvas;
