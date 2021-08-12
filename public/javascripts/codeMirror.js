const DEFAULT_INPUT = "function solution() {\n  return;\n}";

const textEditor = new CodeMirror.fromTextArea(document.querySelector(".solution-code"), {
  mode: "javascript",
  theme: "dracula",
  lineNumbers: true,
  indentUnit: 2,
});

textEditor.getDoc().setValue(DEFAULT_INPUT);
