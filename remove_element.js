const isContainer = (el) => {
    return ["block", "flex", "grid"].includes(getComputedStyle(el).display);
};

const doNotDelete = ["HTML", "BODY", "A"];

const shouldNotDelete = (el) => {
    return doNotDelete.includes(el.tagName);
};

const unblockScrolling = () => {
    [document.body, document.querySelector("html")].forEach((node) => {
        if (node.style.overflow === "hidden") {
            node.style.overflow = "";
        }
    });
};

document.addEventListener("click", (e) => {
    if (e.altKey) {
        let el = e.target;
        const original = el;
        if (shouldNotDelete(original)) {
            return;
        }
        unblockScrolling();
        while (!isContainer(el)) {
            el = el.parentElement;
            if (shouldNotDelete(el)) {
                console.log("removing", original);
                return original.remove();
            }
        }
        console.log("removing", el);
        return el.remove();
    }
});
