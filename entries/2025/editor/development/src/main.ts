//
// Experiments with Codemirror as a text editor
//
// @ Comments which start with @ form a rough outline
// @ Imports
import "./style.css";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { vim } from "@replit/codemirror-vim";
import { markdown } from "@codemirror/lang-markdown";
import { Parser, HtmlRenderer } from "commonmark";

// @ Codemirror State Setup
let startState = EditorState.create({
  doc: "Hello World *now with `markdown` highlighting*!",
  extensions: [vim(), keymap.of(defaultKeymap), markdown()],
});

let parent = document.querySelector('[data-js="editor"]')!;
let rendered = document.querySelector('[data-js="rendered"]')!;

// @ Codemirror View Setup
let view = new EditorView({
  state: startState,
  parent,
});

view.focus();

let renderToggle = document.querySelector('[data-js="renderToggle"]')!;

type State = "rendering" | "editing";
type Event = "render" | "edit";
let state: State = "editing";

const actions: Partial<Record<`${State} -> ${State}`, () => void>> = {
  "editing -> rendering": () => {
    renderToggle.innerHTML = "Edit";
    parent.classList.add("hidden");
    rendered.classList.remove("hidden");
    let reader = new Parser();
    let writer = new HtmlRenderer();
    let content = view.state.doc.toString();
    let parsed = reader.parse(content);
    rendered.innerHTML = writer.render(parsed);
  },
  "rendering -> editing": () => {
    renderToggle.innerHTML = "Render";
    parent.classList.remove("hidden");
    rendered.classList.add("hidden");
  },
};

const transitions: Partial<Record<`${State} X ${Event}`, State>> = {
  "rendering X edit": "editing",
  "editing X render": "rendering",
};

function sendEvent(event: Event) {
  const originalState = state;
  const t: keyof typeof transitions = `${state} X ${event}`;
  const nextState = transitions[t];
  if (!nextState) {
    return console.warn(`No transition for ${t}`);
  }
  state = nextState;
  const a: keyof typeof actions = `${originalState} -> ${nextState}`;
  const action = actions[a];
  if (!action) {
    return;
  }
  action();
}

renderToggle.addEventListener("click", () => {
  switch (state) {
    case "rendering":
      return sendEvent("edit");
    case "editing":
      return sendEvent("render");
    default:
      let exhaustive: never = state;
      throw new Error(`Bad state ${exhaustive}`);
  }
});
