// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// FUNCTION: createTextCanvas()
//------------------------------------------------------------------
export const createTextCanvas = (
  lines /*: Array<string> */,
  fontSize /*: number */,
) /*: Object */ => {
  const lineHeight = fontSize * 1.2;
  const color /*: string */ = "white";
  const borderColor /*: string */ = "white";
  const bgColor /*: string */ = "black";
  const bgOpacity /*: number */ = 0.25;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `${fontSize}px Verdana`;

  // Measure the maximum width among all lines of text
  let maxTextWidth = 0;
  for (const line of lines) {
    const lineWidth = ctx.measureText(line).width;
    if (lineWidth > maxTextWidth) {
      maxTextWidth = lineWidth;
    }
  }

  canvas.width = maxTextWidth * 1.5;
  // Adjusted for multiple lines with one line at the end
  canvas.height = lineHeight * lines.length + lineHeight;
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
  let offsetY = lineHeight / 2;
  for (const line of lines) {
    const lineWidth = ctx.measureText(line).width;
    const centerX = (canvas.width - lineWidth) / 2; // Center horizontally
    ctx.fillText(line, centerX, offsetY);
    offsetY += lineHeight;
  }
  return canvas;
};
export default createTextCanvas;
