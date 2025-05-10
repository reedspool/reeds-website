//
// Experiments with Codemirror as a text editor
//
// @ Comments with leading @ form a rough outline
// @ Imports
import "./style.css";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { vim } from "@replit/codemirror-vim";

// @ Codemirror State Setup
let startState = EditorState.create({
  doc: "Hello World",
  extensions: [vim(), keymap.of(defaultKeymap)],
});

// @ Codemirror View Setup
let view = new EditorView({
  state: startState,
  parent: document.body,
});
