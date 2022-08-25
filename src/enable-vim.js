const w = window.wrappedJSObject;

function loadScript(src, onload) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = onload;
  document.head.appendChild(script);
}

const editors = {
  ace: () => {
    loadScript(browser.runtime.getURL("scripts/ace-keybinding-vim.js"), () => {
      for (let n of document.getElementsByClassName("ace_editor")) {
        e = n.wrappedJSObject.env.editor;
        e.setKeyboardHandler(w.ace.require("ace/keyboard/vim").handler);
      }
    });
  },
  codemirror: () => {
    loadScript(
      browser.runtime.getURL("scripts/codemirror-keybinding-vim.js"),
      () => {
        for (let n of document.getElementsByClassName("CodeMirror")) {
          n.wrappedJSObject.CodeMirror.setOption("keyMap", "vim");
          n.addEventListener("keydown", (e) => {
            // keep focus on editor when escape is pressed
            // 27 is ESC key
            if (e.keyCode == 27) {
              e.stopPropagation();
              e.preventDefault();
            }
          });
        }
      }
    );
  },
};

function setup() {
  const observer = new MutationObserver((_, observer) => {
    if (document.getElementsByClassName("ace_editor").length > 0) {
      observer.disconnect();
      editors.ace();
    }
    if (document.getElementsByClassName("CodeMirror").length > 0) {
      observer.disconnect();
      editors.codemirror();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

setup();
