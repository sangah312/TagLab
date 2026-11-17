const data = [
    {
        id: "text",
        name: "텍스트",
        tags: [
            { name: "h1", description: "문서에서 가장 중요한 제목을 나타냅니다. 일반적으로 페이지의 주제를 표현할 때 사용합니다.", keywords: ["제목", "큰제목", "헤딩", "타이틀"] },
            { name: "h2", description: "두 번째 수준의 제목을 나타냅니다. h1의 하위 주제나 큰 단락의 제목으로 사용합니다.", keywords: ["제목", "소제목", "헤딩"] },
            { name: "h3", description: "세 번째 수준의 제목을 나타냅니다. h2 아래의 세부 내용을 구분할 때 사용합니다.", keywords: ["제목", "소제목", "헤딩"] },
            { name: "h4", description: "네 번째 수준의 제목을 나타냅니다. 더 세부적인 하위 내용을 구분할 때 사용합니다.", keywords: ["제목", "소제목", "헤딩"] },
            { name: "h5", description: "다섯 번째 수준의 제목을 나타냅니다. 깊은 단계의 하위 주제를 표현할 때 사용합니다.", keywords: ["제목", "소제목", "헤딩"] },
            { name: "h6", description: "가장 낮은 수준의 제목을 나타냅니다. 제목 단계 중 가장 세부적인 내용을 표현합니다.", keywords: ["제목", "소제목", "헤딩"] },
            { name: "p", description: "하나의 문단을 나타냅니다. 일반적인 텍스트나 글의 내용을 작성할 때 가장 많이 사용합니다.", keywords: ["문단", "단락", "텍스트", "글"] },
            { name: "b", description: "텍스트를 굵게 표시합니다. 특별한 중요성을 부여하기보다는 시각적으로 글씨를 강조할 때 사용합니다.", keywords: ["굵게", "볼드", "진하게", "두껍게"] },
            { name: "strong", description: "내용이 중요하거나 강조할 필요가 있음을 의미합니다. 브라우저에서는 일반적으로 굵은 글씨로 표시됩니다.", keywords: ["강조", "중요", "굵게", "볼드"] },
            { name: "i", description: "텍스트를 기울임꼴로 표시합니다. 외국어, 전문 용어, 생각 등을 표현할 때 사용할 수 있습니다.", keywords: ["기울임", "이탤릭", "외국어"] },
            { name: "em", description: "텍스트에 강조의 의미를 부여합니다. 일반적으로 기울임꼴로 표시되며 중첩하여 강조의 정도를 표현할 수 있습니다.", keywords: ["강조", "기울임", "이탤릭"] },
            { name: "small", description: "주석, 저작권, 부가 정보처럼 상대적으로 중요도가 낮은 내용을 작은 글씨로 표시합니다.", keywords: ["작은글씨", "작게", "주석", "부가정보"] },
            { name: "mark", description: "문서에서 관련성이 있거나 주목해야 하는 텍스트를 형광펜으로 표시한 것처럼 강조합니다.", keywords: ["형광펜", "하이라이트", "강조", "배경색"] },
            { name: "u", description: "텍스트 아래에 밑줄을 표시합니다. 일반적인 링크와 혼동되지 않도록 사용에 주의해야 합니다.", keywords: ["밑줄", "언더라인"] },
            { name: "s", description: "더 이상 정확하지 않거나 관련이 없는 내용을 취소선으로 표시합니다.", keywords: ["취소선", "가로줄", "삭제표시"] },
            { name: "sub", description: "텍스트를 아래 첨자로 표시합니다. 화학식이나 수학 표현에서 아래에 붙는 작은 글자를 나타낼 때 사용합니다.", keywords: ["아래첨자", "수식", "작은글자"] },
            { name: "sup", description: "텍스트를 위 첨자로 표시합니다. 제곱이나 지수처럼 기준 글자 위에 붙는 작은 글자를 나타낼 때 사용합니다.", keywords: ["위첨자", "제곱", "수식"] },
            { name: "q", description: "문장 안에 짧은 인용문을 표시합니다. 브라우저가 일반적으로 인용 부호를 자동으로 추가합니다.", keywords: ["인용", "짧은인용", "따옴표"] },
            { name: "pre", description: "작성한 공백과 줄바꿈을 그대로 유지하여 표시합니다. 코드나 미리 서식이 지정된 텍스트를 보여줄 때 사용합니다.", keywords: ["서식유지", "공백", "줄바꿈", "코드"] },
            { name: "code", description: "컴퓨터 코드나 프로그래밍 구문을 나타냅니다. 일반적으로 고정폭 글꼴로 표시됩니다.", keywords: ["코드", "프로그래밍", "소스코드"] },
        ]
    }, 
    {
        id: "list",
        name: "목록",
        tags: [
            {
                name: "ul",
                description: "순서가 중요하지 않은 항목들을 글머리 기호로 나열합니다.",
                previewType: "list",
                example: ["사과", "바나나", "포도"]
            },
            {
                name: "ol",
                description: "항목에 번호를 붙여 순서가 있는 목록을 만듭니다.",
                previewType: "list",
                example: ["첫 번째 항목", "두 번째 항목", "세 번째 항목"]
            },
        ]
    },
    {
        id: "table",
        name: "표",
        tags: [
            {
                name: "table",
                description: "행과 열로 구성된 표를 만듭니다.",
                previewType: "table",
                example: {
                    headers: ["이름", "나이"],
                    rows: [["철수", "20"], ["영희", "22"]]
                }
            },
        ]
    },
    {
        id: "form",
        name: "입력",
        tags: [
            {
                name: "input",
                description: "텍스트, 숫자, 체크박스, 라디오 버튼 등 다양한 형태의 입력 요소를 만듭니다.",
                previewType: "input",
                example: { type: "text", placeholder: "이름을 입력하세요" }
            },
            {
                name: "textarea",
                description: "사용자가 여러 줄의 긴 텍스트를 입력할 수 있는 입력창입니다.",
                previewType: "textarea",
                example: "내용을 입력하세요."
            },
            {
                name: "button",
                description: "클릭하여 특정 작업을 실행하거나 양식을 제출할 수 있는 버튼입니다.",
                previewType: "button",
                example: "확인"
            },
            {
                name: "select",
                description: "여러 선택 항목 중 하나를 선택할 수 있는 드롭다운 목록을 만듭니다.",
                previewType: "select",
                example: ["선택하세요", "서울", "부산", "대구"]
            },
        ]
    },
];

const tagContainer = document.querySelector(".tag-list");

data.forEach(category => {
    const section = document.createElement("div");
    section.classList.add("tag-category");

    section.innerHTML = `
        <h4>${category.name}</h4>
        <div class="tag-items"></div>
    `;

    const tagItems = section.querySelector(".tag-items");

    category.tags.forEach(tag => {
        const item = document.createElement("div");
        item.classList.add("tag-item");

        item.innerHTML = `
            <span>${tag.name}</span>
        `;

        // 태그 클릭 이벤트
        item.addEventListener("click", () => {
            addElement(tag);
        });

        tagItems.appendChild(item);
    });

    tagContainer.appendChild(section);
});