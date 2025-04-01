//
// Experiments on the grayscale screen of my Boox Palma 2
//
// @ Comments with leading @ form a rough outline
// @ Imports
import "./style.css";
import { sin, floor, TAO, generateArray, map } from "./utilities";

// @ Constants
// Empirically, gray values darker than min and lighter than max are
// indistinguishable on this screen. Tested by trying different values and
// squinting (could use more data)
export const GRAY = { min: 54, max: 253 }; // 0-255
const BACKGROUND = "#282828";

// @ Canvas Setup

const canvas = document.querySelector("canvas")!;
// @ c for Context
const c = canvas.getContext("2d")!;
// @ d for Dimensions
let d: Rect & {
  center: {
    x: number;
    y: number;
  };
};

// @ dimensions are calculated from the canvas element
function setCanvasDimensions() {
  let clientRect = canvas.getBoundingClientRect();
  d = {
    x: 0,
    y: 0,
    width: clientRect.width,
    height: clientRect.height,
    center: {
      x: clientRect.width / 2,
      y: clientRect.height / 2,
    },
  };
  canvas.width = d.width;
  canvas.height = d.height;

  // @ Reset the animation state after any dimension change
  setup();
}

// @ Entity definitions

// @ Abstract entities like points
type Point = { x: number; y: number };
type Rect = Point & { width: number; height: number };
type Circle = Point & { radius: number };

// @ Simple drawing utilities
function circle({ x, y, radius }: Circle) {
  c.beginPath();
  c.arc(x, y, radius, 0, TAO, true);
  c.fill();
}
function rect({ x, y, width, height }: Rect) {
  c.fillRect(x, y, width, height);
}

// @ Other dynamic state
let mouseX: number;
let mouseY: number;
let controllingWithMouse = false;

// @ Setup/reset initial animation state
function setup() {
  c.fillStyle = BACKGROUND;
  rect(d);
}

// @ Draw (in which all data us updated every frame before drawing)
type drawFunctionProps = {
  view: Rect;
  period: number;
};
function draw() {
  // @ Draw the background
  c.fillStyle = BACKGROUND;
  rect(d);
  // c.strokeStyle = "white";
  c.fillStyle = "white";

  // circle({ x: d.width / 2, y: d.height / 2, radius: d.width / 2 });
  const period = 4 * 1000;
  const timeOfPeriod = Date.now() / period;

  const functions = [
    drawBigBoxFlashing,
    drawLittleCheckerboardFlashing,
  ] as const;

  const view: Rect = {
    x: d.width / 4,
    y: d.height / 4,
    width: d.width / 2,
    height: d.height / 2,
  };
  functions[floor(timeOfPeriod) % functions.length]({ view, period });

  // @ Repeat all calculations and drawing each frame
  requestAnimationFrame(draw);
}

function drawBigBoxFlashing({ view, period }: drawFunctionProps) {
  const t = sin((TAO * (Date.now() % period)) / period);
  const chunkSize = 2;
  const chunkNumRows = floor(view.height / chunkSize);
  const chunkNumColumns = floor(view.width / chunkSize);
  const rows = generateArray(chunkNumRows, ({ index: row }) => {
    const columns = generateArray(chunkNumColumns, ({ index: column }) => {
      const cell: Rect = {
        x: column * chunkSize + view.x,
        y: row * chunkSize + view.y,
        width: chunkSize,
        height: chunkSize,
      };

      const gray = map(t, 0, 1, GRAY.min, GRAY.max);
      c.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      rect(cell);
      // const dot: Circle = {
      //   ...cell,
      //   radius: min(cell.width, cell.height) / 2,
      // };
      // circle(dot);
    });
  });
}

function drawLittleCheckerboardFlashing({ view, period }: drawFunctionProps) {
  const t = sin((TAO * (Date.now() % period)) / period);
  const chunkSize = 2;
  const chunkNumRows = floor(view.height / chunkSize);
  const chunkNumColumns = floor(view.width / chunkSize);
  const rows = generateArray(chunkNumRows, ({ index: row }) => {
    const columns = generateArray(chunkNumColumns, ({ index: column }) => {
      const cell: Rect = {
        x: column * chunkSize + view.x,
        y: row * chunkSize + view.y,
        width: chunkSize,
        height: chunkSize,
      };

      const index = row + column;
      const gray = map(index % 2 ? 1 - t : t, 0, 1, GRAY.min, GRAY.max);
      c.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      rect(cell);
      // const dot: Circle = {
      //   ...cell,
      //   radius: min(cell.width, cell.height) / 2,
      // };
      // circle(dot);
    });
  });
}

// @ Tracking events
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  mouseX = clientX;
  mouseY = clientY;
});
canvas.addEventListener("touchmove", ({ touches }) => {
  const { clientX, clientY } = touches[0];
  mouseX = clientX;
  mouseY = clientY;
});
canvas.addEventListener("mouseup", () => {
  // @ Click to toggle beings following the mouse
  controllingWithMouse = !controllingWithMouse;
  if (!controllingWithMouse) {
  }
});
canvas.addEventListener("mousedown", () => {
  // draw();
  canvas.requestFullscreen({ navigationUI: "hide" });
});

document.body.addEventListener("keydown", (event) => {
  const { key } = event;
  // @ Press 'r' to redraw (useful when background is semitransparent)
  if (key == "r") {
    c.fillStyle = "#282828"; // TODO Get calculated body font color
    c.fillRect(0, 0, d.width, d.height);
  }
});

window.addEventListener("resize", () => {
  setCanvasDimensions();
});

setCanvasDimensions();

// @ Everything's set up, so begin the draw loop
draw();
