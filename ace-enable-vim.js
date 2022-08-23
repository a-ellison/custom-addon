const w = window.wrappedJSObject;

function enableVim() {
    document.querySelectorAll(".ace_editor").forEach((n) => {
        e = n.wrappedJSObject.env.editor;
        e.setKeyboardHandler(w.ace.require("ace/keyboard/vim").handler);
    });
}

function enable() {
    if (w.ace !== undefined) {
        didSetup = true;
        let script = document.createElement("script");
        script.src = browser.runtime.getURL("ace-keybinding-vim.js");
        script.onload = enableVim;
        w.document.head.appendChild(script);
        // document.addEventListener("keybinding-loaded", () => {
        //     console.log("on-keybinding-loaded");
        //     document.querySelectorAll(".ace_editor").forEach((n) => {
        //         editor = n.wrappedJSObject.env.editor;
        //         editor.setKeyboardHandler(
        //             w.ace.require("ace/keyboard/vim").handler
        //         );
        //     });
        // });
        // const e = new Event("ace-loaded");
        // document.dispatchEvent(e);
    }
}

let didSetup = false;
let c = 0;

function setup() {
    c++;
    setTimeout(() => {
        const nodes = document.querySelectorAll(
            ".ant-tree-node-content-wrapper"
        );
        if (nodes.length > 0) {
            nodes.forEach((n) => {
                n.addEventListener("click", () => {
                    if (w.ace === undefined) {
                        setTimeout(enable, 1000);
                    } else {
                        enable();
                    }
                });
            });
        }
        enable();
        if (!didSetup && c < 6) {
            setup();
        }
    }, 500);
}

setup();
