const propertyContent = document.querySelector(".property-content");

let currentTarget = null;
let currentTag = null;

// 태그별 속성 정의
const propertySchemaByTag = {
    p: [
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" },
        { label: "글자 크기", kind: "style", prop: "fontSize", type: "range", min: 12, max: 48, step: 1, unit: "px", defaultValue: "16" },
        {
            label: "글자 두께",
            kind: "style",
            prop: "fontWeight",
            type: "select",
            options: [
                { label: "보통 (400)", value: "400" },
                { label: "중간 (500)", value: "500" },
                { label: "굵게 (700)", value: "700" }
            ],
            defaultValue: "400"
        },
        {
            label: "정렬",
            kind: "style",
            prop: "textAlign",
            type: "select",
            options: [
                { label: "왼쪽", value: "left" },
                { label: "가운데", value: "center" },
                { label: "오른쪽", value: "right" }
            ],
            defaultValue: "left"
        },
        { label: "문단 내용", kind: "text", prop: "textContent", type: "text", defaultValue: "" }
    ],

    ul: [
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" },
        { label: "글자 크기", kind: "style", prop: "fontSize", type: "range", min: 12, max: 36, step: 1, unit: "px", defaultValue: "16" },
        {
            label: "목록 기호",
            kind: "style",
            prop: "listStyleType",
            type: "select",
            options: [
                { label: "원형 (disc)", value: "disc" },
                { label: "빈 원 (circle)", value: "circle" },
                { label: "사각형 (square)", value: "square" },
                { label: "없음 (none)", value: "none" }
            ],
            defaultValue: "disc"
        }
    ],

    ol: [
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" },
        { label: "글자 크기", kind: "style", prop: "fontSize", type: "range", min: 12, max: 36, step: 1, unit: "px", defaultValue: "16" },
        {
            label: "번호 스타일",
            kind: "style",
            prop: "listStyleType",
            type: "select",
            options: [
                { label: "숫자 (decimal)", value: "decimal" },
                { label: "소문자 알파벳 (lower-alpha)", value: "lower-alpha" },
                { label: "대문자 알파벳 (upper-alpha)", value: "upper-alpha" },
                { label: "소문자 로마숫자 (lower-roman)", value: "lower-roman" },
                { label: "대문자 로마숫자 (upper-roman)", value: "upper-roman" }
            ],
            defaultValue: "decimal"
        }
    ],

    table: [
        { label: "테두리 두께", kind: "style", prop: "borderWidth", type: "range", min: 0, max: 8, step: 1, unit: "px", defaultValue: "1" },
        { label: "테두리 색상", kind: "style", prop: "borderColor", type: "color", defaultValue: "#333333" },
        {
            label: "테두리 합치기",
            kind: "style",
            prop: "borderCollapse",
            type: "select",
            options: [
                { label: "합치기 (collapse)", value: "collapse" },
                { label: "분리 (separate)", value: "separate" }
            ],
            defaultValue: "collapse"
        },
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" }
    ],

    input: [
        {
            label: "입력 타입 (type)",
            kind: "attr",
            prop: "type",
            type: "select",
            options: [
                { label: "text", value: "text" },
                { label: "password", value: "password" },
                { label: "number", value: "number" },
                { label: "email", value: "email" },
                { label: "date", value: "date" },
                { label: "checkbox", value: "checkbox" },
                { label: "radio", value: "radio" }
            ],
            defaultValue: "text"
        },
        { label: "안내 문구 (placeholder)", kind: "attr", prop: "placeholder", type: "text", defaultValue: "" },
        { label: "기본값 (value)", kind: "attr", prop: "value", type: "text", defaultValue: "" },
        { label: "비활성화 (disabled)", kind: "attr", prop: "disabled", type: "checkbox", defaultValue: false },
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" }
    ],

    textarea: [
        { label: "안내 문구 (placeholder)", kind: "attr", prop: "placeholder", type: "text", defaultValue: "" },
        { label: "줄 수 (rows)", kind: "attr", prop: "rows", type: "range", min: 2, max: 12, step: 1, unit: "", defaultValue: "4" },
        { label: "너비 칸 수 (cols)", kind: "attr", prop: "cols", type: "range", min: 15, max: 60, step: 1, unit: "", defaultValue: "30" },
        { label: "읽기 전용 (readonly)", kind: "attr", prop: "readOnly", type: "checkbox", defaultValue: false },
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" }
    ],

    button: [
        { label: "버튼 텍스트", kind: "text", prop: "textContent", type: "text", defaultValue: "확인" },
        {
            label: "버튼 타입 (type)",
            kind: "attr",
            prop: "type",
            type: "select",
            options: [
                { label: "button", value: "button" },
                { label: "submit", value: "submit" },
                { label: "reset", value: "reset" }
            ],
            defaultValue: "button"
        },
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#ffffff" },
        { label: "배경 색", kind: "style", prop: "backgroundColor", type: "color", defaultValue: "#3478f6" },
        { label: "글자 크기", kind: "style", prop: "fontSize", type: "range", min: 12, max: 32, step: 1, unit: "px", defaultValue: "14" },
        { label: "비활성화 (disabled)", kind: "attr", prop: "disabled", type: "checkbox", defaultValue: false }
    ],

    select: [
        { label: "다중 선택 (multiple)", kind: "attr", prop: "multiple", type: "checkbox", defaultValue: false },
        { label: "비활성화 (disabled)", kind: "attr", prop: "disabled", type: "checkbox", defaultValue: false },
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" },
        { label: "글자 크기", kind: "style", prop: "fontSize", type: "range", min: 12, max: 28, step: 1, unit: "px", defaultValue: "14" }
    ]
};

function getSchemaForTag(tagName) {
    const key = tagName.toLowerCase();
    if (propertySchemaByTag[key]) {
        return propertySchemaByTag[key];
    }

    const headingSizes = { h1: "32", h2: "26", h3: "22", h4: "19", h5: "17", h6: "15" };
    const defaultFontSize = headingSizes[key] || "16";

    const schema = [
        { label: "글자 색", kind: "style", prop: "color", type: "color", defaultValue: "#444444" },
        { label: "배경 색", kind: "style", prop: "backgroundColor", type: "color", defaultValue: "#ffffff" },
        { label: "글자 크기", kind: "style", prop: "fontSize", type: "range", min: 10, max: 56, step: 1, unit: "px", defaultValue: defaultFontSize },
        {
            label: "글자 두께",
            kind: "style",
            prop: "fontWeight",
            type: "select",
            options: [
                { label: "보통 (400)", value: "400" },
                { label: "중간 (500)", value: "500" },
                { label: "굵게 (700)", value: "700" }
            ],
            defaultValue: ["b", "strong", "h1", "h2", "h3", "h4", "h5", "h6"].includes(key) ? "700" : "400"
        }
    ];

    if (!["sup", "sub"].includes(key)) {
        schema.push({ label: "텍스트 내용", kind: "text", prop: "textContent", type: "text", defaultValue: "" });
    }

    return schema;
}

function rgbToHex(colorStr) {
    if (!colorStr) return "#333333";
    if (colorStr.startsWith("#")) return colorStr;

    const match = colorStr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!match) return "#333333";

    return (
        "#" +
        [match[1], match[2], match[3]]
            .map((num) => Number(num).toString(16).padStart(2, "0"))
            .join("")
    );
}

function getInitialValue(el, item) {
    if (item.kind === "style") {
        const computed = window.getComputedStyle(el)[item.prop];
        if (item.type === "color") {
            return rgbToHex(computed);
        }
        if (item.type === "range") {
            const parsed = parseFloat(computed);
            return Number.isNaN(parsed) ? item.defaultValue : String(parsed);
        }
        return computed || item.defaultValue;
    }

    if (item.kind === "attr") {
        if (item.type === "checkbox") {
            return Boolean(el[item.prop] || el.hasAttribute(item.prop));
        }
        return el.getAttribute(item.prop) ?? item.defaultValue;
    }

    if (item.kind === "text") {
        return el.textContent ?? item.defaultValue;
    }

    return item.defaultValue;
}

function applyProperty(el, item, value) {
    if (!el) return;

    if (item.kind === "style") {
        const finalValue = item.unit ? `${value}${item.unit}` : value;
        el.style[item.prop] = finalValue;

        if (el.tagName.toLowerCase() === "table" && typeof window.handleTableStyleSync === "function") {
            window.handleTableStyleSync(el, item.prop);
        }
    } else if (item.kind === "attr") {
        if (item.type === "checkbox") {
            el[item.prop] = Boolean(value);
            const attrName = item.prop === "readOnly" ? "readonly" : item.prop;
            if (value) {
                el.setAttribute(attrName, "");
            } else {
                el.removeAttribute(attrName);
            }
        } else {
            if (value === "" && item.prop !== "value") {
                el.removeAttribute(item.prop);
            } else {
                el.setAttribute(item.prop, value);
                if (item.prop === "value") {
                    el.value = value;
                }
            }
        }
    } else if (item.kind === "text") {
        el.textContent = value;
    }

    if (typeof window.updateCodeOutput === "function") {
        window.updateCodeOutput();
    }
}

window.renderProperties = function (tag, targetEl) {
    if (!propertyContent) return;

    currentTag = tag;
    currentTarget = targetEl;
    propertyContent.innerHTML = "";

    if (!targetEl || !tag) {
        resetProperties();
        return;
    }

    const badge = document.createElement("div");
    badge.className = "property-target-badge";
    badge.textContent = `<${tag.name}>`;
    propertyContent.appendChild(badge);

    const schema = getSchemaForTag(tag.name);

    schema.forEach((item) => {
        const group = document.createElement("div");
        group.className = "property-group";

        const label = document.createElement("label");
        label.textContent = item.label;
        group.appendChild(label);

        const currentValue = getInitialValue(targetEl, item);

        if (item.type === "select") {
            const select = document.createElement("select");
            item.options.forEach((opt) => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.textContent = opt.label;
                if (String(currentValue) === String(opt.value)) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            select.addEventListener("change", (e) => {
                applyProperty(targetEl, item, e.target.value);
            });
            group.appendChild(select);
        } else if (item.type === "checkbox") {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = Boolean(currentValue);
            checkbox.addEventListener("change", (e) => {
                applyProperty(targetEl, item, e.target.checked);
            });
            group.appendChild(checkbox);
        } else if (item.type === "range") {
            const rangeRow = document.createElement("div");
            rangeRow.className = "range-row";

            const range = document.createElement("input");
            range.type = "range";
            range.min = item.min;
            range.max = item.max;
            range.step = item.step ?? 1;
            range.value = currentValue;

            const valueSpan = document.createElement("span");
            valueSpan.className = "range-value";
            valueSpan.textContent = `${range.value}${item.unit || ""}`;

            range.addEventListener("input", (e) => {
                valueSpan.textContent = `${e.target.value}${item.unit || ""}`;
                applyProperty(targetEl, item, e.target.value);
            });

            rangeRow.appendChild(range);
            rangeRow.appendChild(valueSpan);
            group.appendChild(rangeRow);
        } else {
            const input = document.createElement("input");
            input.type = item.type;
            input.value = currentValue;
            input.addEventListener("input", (e) => {
                applyProperty(targetEl, item, e.target.value);
            });
            group.appendChild(input);
        }

        propertyContent.appendChild(group);
    });

    if (tag.name.toLowerCase() === "table" && typeof window.renderTableEditorControls === "function") {
        window.renderTableEditorControls(propertyContent, targetEl);
    }

    if (typeof window.updateCodeOutput === "function") {
        window.updateCodeOutput();
    }
};

window.resetProperties = function () {
    currentTarget = null;
    currentTag = null;

    if (typeof window.resetTableSelection === "function") {
        window.resetTableSelection();
    }

    if (propertyContent) {
        propertyContent.innerHTML = `<p class="empty-property">태그를 선택하면 속성을 수정할 수 있습니다.</p>`;
    }

    const codeEl = document.querySelector(".code .code-preview code") || document.querySelector(".code");
    if (codeEl) {
        codeEl.textContent = "<!-- 태그를 선택하면 코드가 표시됩니다. -->";
    }
};