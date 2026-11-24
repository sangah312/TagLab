const codePreviewEl = document.querySelector(".code .code-preview code") || document.querySelector(".code");
const copyCodeButton = document.querySelector("#copy-code-button");

let copyTimer = null;

// Prettier 스타일 HTML 포맷터 (2칸 들여쓰기, 중첩 태그 줄바꿈)
function formatHtmlPrettier(html, indentSize = 2) {
    if (!html) return "";

    const voidTags = new Set([
        "area", "base", "br", "col", "embed", "hr", "img",
        "input", "link", "meta", "param", "source", "track", "wbr"
    ]);
    const inlineTags = new Set([
        "a", "abbr", "b", "bdi", "bdo", "button", "cite", "code",
        "data", "dfn", "em", "i", "kbd", "label", "mark", "q",
        "s", "samp", "select", "small", "span", "strong", "sub",
        "sup", "textarea", "time", "u", "var"
    ]);

    const tokens = html
        .replace(/>\s+</g, "><")
        .trim()
        .match(/(<\/?[^>]+>|[^<]+)/g);

    if (!tokens) return html;

    let level = 0;
    const lines = [];
    const indent = (n) => " ".repeat(Math.max(0, n * indentSize));

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].trim();
        if (!token) continue;

        if (/^<\/[^>]+>$/.test(token)) {
            const tagName = token.replace(/^<\/|>$/g, "").toLowerCase();
            if (!inlineTags.has(tagName)) {
                level = Math.max(0, level - 1);
                lines.push(`${indent(level)}${token}`);
            } else if (lines.length > 0) {
                lines[lines.length - 1] += token;
            } else {
                lines.push(`${indent(level)}${token}`);
            }
            continue;
        }

        if (/^<[^!/?][^>]*>$/.test(token)) {
            const isSelfClosing = /\/>$/.test(token);
            const tagMatch = token.match(/^<([a-zA-Z0-9-]+)/);
            const tagName = tagMatch ? tagMatch[1].toLowerCase() : "";
            const isVoid = isSelfClosing || voidTags.has(tagName);
            const nextToken = tokens[i + 1]?.trim();
            const closingToken = tokens[i + 2]?.trim();

            if (
                inlineTags.has(tagName) ||
                (!isVoid &&
                    nextToken &&
                    !nextToken.startsWith("<") &&
                    closingToken === `</${tagName}>`)
            ) {
                lines.push(`${indent(level)}${token}`);
                if (!isVoid && nextToken && !nextToken.startsWith("<")) {
                    lines[lines.length - 1] += nextToken;
                    i += 1;
                    if (closingToken === `</${tagName}>`) {
                        lines[lines.length - 1] += closingToken;
                        i += 1;
                    }
                }
            } else {
                lines.push(`${indent(level)}${token}`);
                if (!isVoid) {
                    level += 1;
                }
            }
            continue;
        }

        if (lines.length > 0) {
            lines[lines.length - 1] += token;
        } else {
            lines.push(`${indent(level)}${token}`);
        }
    }

    return lines.join("\n");
}

window.updateCodeOutput = function () {
    if (!codePreviewEl) return;
    const canvasContent = document.querySelector(".canvas-content");
    const previewEl = canvasContent ? canvasContent.querySelector(".canvas-element > *") : null;

    if (!previewEl) {
        codePreviewEl.textContent = "<!-- 태그를 선택하면 코드가 표시됩니다. -->";
        return;
    }

    const isTable = previewEl.tagName.toLowerCase() === "table";
    const cleanHtml =
        isTable && typeof window.withCleanTableSelection === "function"
            ? window.withCleanTableSelection(previewEl, () => previewEl.outerHTML)
            : previewEl.outerHTML;

    codePreviewEl.textContent = formatHtmlPrettier(cleanHtml, 2);
};

if (copyCodeButton) {
    copyCodeButton.addEventListener("click", async () => {
        if (!codePreviewEl) return;
        const textToCopy = codePreviewEl.textContent || "";
        if (!textToCopy || textToCopy.startsWith("<!--")) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch {
            const tempTextarea = document.createElement("textarea");
            tempTextarea.value = textToCopy;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);
        }

        copyCodeButton.textContent = "복사됨!";
        copyCodeButton.classList.add("copied");

        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => {
            copyCodeButton.textContent = "복사";
            copyCodeButton.classList.remove("copied");
        }, 1500);
    });
}