// copycode.js
// 8-9-21 by Rockz

const codeBlocks = document.querySelectorAll("pre > code");
// console.log(codeBlocks.length); // uncomment for debugging
codeBlocks.forEach(function(block) {
    var btn = document.createElement("button");
    btn.classList.add("simple-button-small", "code-copy"),
    btn.type = "button",
    btn.innerText = "Copy";
    [block, btn].forEach(function(element) {
        element.addEventListener("click", function() {
            // clipboard function provided by: clipboard-polyfill.promise.3.0.2.min.js
            clipboard.writeText(block.textContent).then((function() {
                btn.blur(),
                btn.innerText = "Copied!",
                setTimeout((function() {
                    btn.innerText = "Copy"
                }), 2000) // time before text reverts
            }))
        });
    });
    var sourceBlock = block.parentNode;
    sourceBlock.parentNode.classList.contains("pre") ? sourceBlock.parentNode.appendChild(btn) : sourceBlock.appendChild(btn);
}); // End main
