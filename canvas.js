const canvasContent = document.querySelector(".canvas-content");
const description = document.querySelector(".canvas-description p");
const resetButton = document.querySelector("#reset-button");

// 초기화 버튼
resetButton.addEventListener("click", () => {
    canvasContent.innerHTML = "";
    description.textContent = "";

    resetProperties();
});


// 태그 추가
window.addElement = function(tag) {
    canvasContent.innerHTML = "";

    const element = document.createElement("div");
    element.classList.add("canvas-element");

    // 미리보기 생성
    if (tag.previewType) {
        renderExample(tag, element);
    } else {
        renderText(tag, element);
    }

    canvasContent.appendChild(element);

    // 설명 업데이트
    description.textContent = tag.description;

    // 실제 미리보기 요소 가져오기
    const preview = element.firstElementChild;

    // 오른쪽 속성 편집 활성화
    if (preview) {
        renderProperties(tag, preview);
    }
};


// 기본 텍스트 태그
function renderText(tag, container) {
    const element = document.createElement(tag.name);

    // 첨자 예외 처리
    switch (tag.name) {
        case "sup":
            element.textContent = "E = mc";
            const sup = document.createElement("sup");
            sup.textContent = "2";
            element.appendChild(sup);
            break;

        case "sub":
            element.textContent = "H";
            const sub = document.createElement("sub");
            sub.textContent = "2";
            element.appendChild(sub);
            const text = document.createTextNode("O");
            element.appendChild(text);
            break;

        default:
            element.textContent = `${tag.name} 요소입니다.`;
    }

    container.appendChild(element);
}


// 예시 렌더링
function renderExample(tag, container) {
    const example = tag.example;

    switch (tag.previewType) {

        // 순서 없는 목록 / 순서 있는 목록
        case "list": {
            const list = document.createElement(tag.name);

            example.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                list.appendChild(li);
            });

            container.appendChild(list);
            break;
        }

        // 표
        // 표
        case "table": {
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.borderWidth = "1px";
            table.style.borderStyle = "solid";
            table.style.borderColor = "#333333";

            if (example.headers) {
                const thead = document.createElement("thead");
                const tr = document.createElement("tr");

                example.headers.forEach((header) => {
                    const th = document.createElement("th");
                    th.textContent = header;
                    th.style.border = "1px solid #333333";
                    th.style.padding = "8px 12px";
                    tr.appendChild(th);
                });

                thead.appendChild(tr);
                table.appendChild(thead);
            }

            if (example.rows) {
                const tbody = document.createElement("tbody");

                example.rows.forEach((row) => {
                    const tr = document.createElement("tr");

                    row.forEach((value) => {
                        const td = document.createElement("td");
                        td.textContent = value;
                        td.style.border = "1px solid #333333";
                        td.style.padding = "8px 12px";
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
            }

            container.appendChild(table);
            break;
        }

        // 입력창
        case "input": {
            const input = document.createElement("input");
            input.type = example.type;
            input.placeholder = example.placeholder;

            container.appendChild(input);
            break;
        }

        // 여러 줄 입력창
        case "textarea": {
            const textarea = document.createElement("textarea");
            textarea.placeholder = example;
            container.appendChild(textarea);
            break;
        }

        // 버튼
        case "button": {
            const button = document.createElement("button");
            button.textContent = example;
            container.appendChild(button);
            break;
        }

        // 선택 목록
        case "select": {
            const select = document.createElement("select");

            example.forEach(item => {
                const option = document.createElement("option");
                option.textContent = item;
                select.appendChild(option);
            });

            container.appendChild(select);
            break;
        }
    }
}
