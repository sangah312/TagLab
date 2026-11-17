
const propertyContent = document.querySelector(".property-content");

// 태그별 속성 설정
const propertyConfig = {
    // 링크
    a: [
        { name: "href", label: "링크 주소", type: "text", default: "https://naver.com" },
        { name: "target", label: "열기 방식", type: "select", options: ["_self", "_blank"] },
        { name: "title", label: "설명", type: "text" }
    ],

    // 이미지
    img: [
        { name: "src", label: "이미지 주소", type: "text" },
        { name: "alt", label: "대체 텍스트", type: "text", default: "이미지 설명" },
        { name: "width", label: "너비", type: "number" },
        { name: "height", label: "높이", type: "number" }
    ],

    // 입력창
    input: [
        {
            name: "type",
            label: "입력 유형",
            type: "select",
            options: ["text", "password", "number", "email", "checkbox", "radio", "date", "file"]
        },
        { name: "placeholder", label: "안내 문구", type: "text" },
        { name: "value", label: "초기값", type: "text" },
        { name: "required", label: "필수 입력", type: "checkbox" },
        { name: "disabled", label: "비활성화", type: "checkbox" }
    ],

    // 여러 줄 입력
    textarea: [
        { name: "placeholder", label: "안내 문구", type: "text" },
        { name: "rows", label: "줄 수", type: "number", default: 4 },
        { name: "cols", label: "너비", type: "number", default: 30 },
        { name: "maxlength", label: "최대 글자 수", type: "number" },
        { name: "disabled", label: "비활성화", type: "checkbox" }
    ],

    // 버튼
    button: [
        {
            name: "type",
            label: "버튼 유형",
            type: "select",
            options: ["button", "submit", "reset"]
        },
        { name: "disabled", label: "비활성화", type: "checkbox" }
    ],

    // 선택 목록
    select: [
        { name: "multiple", label: "여러 항목 선택", type: "checkbox" },
        { name: "required", label: "필수 선택", type: "checkbox" },
        { name: "disabled", label: "비활성화", type: "checkbox" }
    ],

    // 순서 없는 목록
    ul: [
        {
            name: "listStyleType",
            label: "글머리 모양",
            type: "select",
            options: ["disc", "circle", "square"]
        }
    ],

    // 순서 있는 목록
    ol: [
        {
            name: "type",
            label: "번호 형식",
            type: "select",
            options: ["1", "A", "a", "I", "i"]
        },
        { name: "start", label: "시작 번호", type: "number", default: 1 },
        { name: "reversed", label: "역순", type: "checkbox" }
    ],

    // 문단
    p: [
        {
            name: "textContent",
            label: "텍스트 내용",
            type: "text",
            content: true
        }
    ],

    // 제목
    h1: [{ name: "textContent", label: "제목 내용", type: "text", content: true }],
    h2: [{ name: "textContent", label: "제목 내용", type: "text", content: true }],
    h3: [{ name: "textContent", label: "제목 내용", type: "text", content: true }],
    h4: [{ name: "textContent", label: "제목 내용", type: "text", content: true }],
    h5: [{ name: "textContent", label: "제목 내용", type: "text", content: true }],
    h6: [{ name: "textContent", label: "제목 내용", type: "text", content: true }],

    // 표
    table: [
        { name: "border", label: "테두리 두께", type: "number", default: 1 }
    ]
};


// 속성 편집 화면 생성
function renderProperties(tag, element) {
    console.log("선택한 태그:", tag);
    console.log("미리보기 요소:", element);

    propertyContent.innerHTML = "";

    const properties = propertyConfig[tag.name];

    // 설정 가능한 속성이 없는 경우
    if (!properties || properties.length === 0) {
        propertyContent.innerHTML = `
            <p class="empty-property">
                이 태그에는 설정할 수 있는 속성이 없습니다.
            </p>
        `;
        return;
    }

    properties.forEach(property => {
        const group = document.createElement("div");
        group.classList.add("property-group");

        const label = document.createElement("label");
        label.textContent = property.label;

        let input;

        // select 생성
        if (property.type === "select") {
            input = document.createElement("select");

            property.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else {
            input = document.createElement("input");
            input.type = property.type;
        }

        // 현재 요소의 속성값 가져오기
        if (property.type === "checkbox") {
            input.checked = element.hasAttribute(property.name);

        } else if (property.content) {
            input.value = element.textContent;

        } else if (property.name === "listStyleType") {
            input.value = element.style.listStyleType || property.options[0];

        } else {
            input.value =
                element.getAttribute(property.name) ??
                property.default ??
                "";
        }

        // 속성 변경 이벤트
        input.addEventListener("input", () => {
            updateProperty(element, property, input);
        });

        input.addEventListener("change", () => {
            updateProperty(element, property, input);
        });

        group.append(label, input);
        propertyContent.appendChild(group);
    });
}


// 실제 속성 변경
function updateProperty(element, property, input) {

    const name = property.name;

    // 체크박스
    if (property.type === "checkbox") {

        if (input.checked) {
            element.setAttribute(name, "");
        } else {
            element.removeAttribute(name);
        }

        return;
    }

    // 텍스트 내용 변경
    if (property.content) {
        element.textContent = input.value;
        return;
    }

    // CSS 스타일 변경
    if (name === "listStyleType") {
        element.style.listStyleType = input.value;
        return;
    }

    // 일반 속성 변경
    element.setAttribute(name, input.value);
}


// 속성 편집 초기화
function resetProperties() {

    propertyContent.innerHTML = `
        <p class="empty-property">
            태그를 선택하면 속성을 수정할 수 있습니다.
        </p>
    `;

}
