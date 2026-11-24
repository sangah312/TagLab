function notifyCodeUpdate() {
    if (typeof window.updateCodeOutput === "function") {
        window.updateCodeOutput();
    }
}

// 표와 셀 테두리 동기화
function syncTableCellsBorder(tableEl) {
    const borderWidth = tableEl.style.borderWidth || "1px";
    const borderStyle = borderWidth === "0px" ? "none" : "solid";
    const borderColor = tableEl.style.borderColor || "#333333";

    tableEl.style.borderStyle = borderStyle;
    tableEl.querySelectorAll("th, td").forEach((cell) => {
        cell.style.borderWidth = borderWidth;
        cell.style.borderStyle = borderStyle;
        cell.style.borderColor = borderColor;
        if (!cell.style.padding) {
            cell.style.padding = "8px 12px";
        }
    });
}

// 표의 열 개수 구하기 (첫 번째 행 기준)
function getColumnCount(tableEl) {
    const firstRow = tableEl.querySelector("thead tr, tbody tr");
    if (!firstRow) return 1;

    let count = 0;
    Array.from(firstRow.children).forEach((cell) => {
        count += parseInt(cell.getAttribute("colspan") || "1", 10);
    });
    return Math.max(1, count);
}

// 아래(맨 끝)에 행 추가
function addTableRow(tableEl) {
    if (!tableEl) return;

    let tbody = tableEl.querySelector("tbody");
    if (!tbody) {
        tbody = document.createElement("tbody");
        tableEl.appendChild(tbody);
    }

    const colCount = getColumnCount(tableEl);
    const rowNum = tbody.querySelectorAll("tr").length + 1;
    const tr = document.createElement("tr");

    for (let c = 0; c < colCount; c++) {
        const td = document.createElement("td");
        td.textContent = `행${rowNum}-${c + 1}`;
        tr.appendChild(td);
    }

    tbody.appendChild(tr);
    syncTableCellsBorder(tableEl);
    notifyCodeUpdate();
}

// 맨 아래 행 삭제
function deleteTableRow(tableEl) {
    if (!tableEl) return;

    const rows = Array.from(tableEl.querySelectorAll("tr"));
    if (rows.length <= 1) return;

    rows[rows.length - 1].remove();
    syncTableCellsBorder(tableEl);
    notifyCodeUpdate();
}

// 오른쪽(맨 끝)에 열 추가
function addTableColumn(tableEl) {
    if (!tableEl) return;

    const theadRow = tableEl.querySelector("thead tr");
    if (theadRow) {
        const mergedTitleCell = theadRow.querySelector("th[colspan]");
        if (mergedTitleCell) {
            const nextSpan = parseInt(mergedTitleCell.getAttribute("colspan") || "1", 10) + 1;
            mergedTitleCell.setAttribute("colspan", String(nextSpan));
        } else {
            const th = document.createElement("th");
            th.textContent = `열${theadRow.children.length + 1}`;
            theadRow.appendChild(th);
        }
    }

    tableEl.querySelectorAll("tbody tr").forEach((tr, idx) => {
        const td = document.createElement("td");
        td.textContent = `행${idx + 1}-${tr.children.length + 1}`;
        tr.appendChild(td);
    });

    syncTableCellsBorder(tableEl);
    notifyCodeUpdate();
}

// 맨 오른쪽 열 삭제
function deleteTableColumn(tableEl) {
    if (!tableEl) return;

    const colCount = getColumnCount(tableEl);
    if (colCount <= 1) return;

    const theadRow = tableEl.querySelector("thead tr");
    if (theadRow) {
        const mergedTitleCell = theadRow.querySelector("th[colspan]");
        if (mergedTitleCell) {
            const curSpan = parseInt(mergedTitleCell.getAttribute("colspan") || "1", 10);
            if (curSpan > 2) {
                mergedTitleCell.setAttribute("colspan", String(curSpan - 1));
            } else {
                mergedTitleCell.removeAttribute("colspan");
            }
        } else if (theadRow.children.length > 1) {
            theadRow.lastElementChild.remove();
        }
    }

    tableEl.querySelectorAll("tbody tr").forEach((tr) => {
        if (tr.children.length > 1) {
            tr.lastElementChild.remove();
        }
    });

    syncTableCellsBorder(tableEl);
    notifyCodeUpdate();
}

// 표 제목 행(첫 번째 행) 병합
function mergeTableTitle(tableEl) {
    if (!tableEl) return;

    const firstRow = tableEl.querySelector("thead tr, tbody tr");
    if (!firstRow || firstRow.children.length <= 1) return;

    const colCount = getColumnCount(tableEl);
    const firstCell = firstRow.firstElementChild;
    const titleText = firstCell.textContent.trim() || "표 제목";

    while (firstRow.children.length > 1) {
        firstRow.lastElementChild.remove();
    }

    firstCell.textContent = titleText;
    firstCell.setAttribute("colspan", String(colCount));

    syncTableCellsBorder(tableEl);
    notifyCodeUpdate();
}

// 표 제목 행 병합 해제
function unmergeTableTitle(tableEl) {
    if (!tableEl) return;

    const firstRow = tableEl.querySelector("thead tr, tbody tr");
    if (!firstRow) return;

    const firstCell = firstRow.firstElementChild;
    const span = parseInt(firstCell?.getAttribute("colspan") || "1", 10);
    if (!firstCell || span <= 1) return;

    firstCell.removeAttribute("colspan");

    for (let i = 1; i < span; i++) {
        const cellTag = firstCell.tagName.toLowerCase() === "th" ? "th" : "td";
        const newCell = document.createElement(cellTag);
        newCell.textContent = `제목 ${i + 1}`;
        firstRow.appendChild(newCell);
    }

    syncTableCellsBorder(tableEl);
    notifyCodeUpdate();
}

window.handleTableStyleSync = function (tableEl, prop) {
    if (!tableEl) return;
    if (["borderWidth", "borderColor", "borderCollapse"].includes(prop)) {
        syncTableCellsBorder(tableEl);
    }
};

window.renderTableEditorControls = function (container, tableEl) {
    if (!container || !tableEl) return;

    const group = document.createElement("div");
    group.className = "property-group";

    const label = document.createElement("label");
    label.textContent = "표 편집";
    group.appendChild(label);

    const btnWrap = document.createElement("div");
    btnWrap.className = "table-actions";

    const buttons = [
        { text: "+ 아래 행 추가", onClick: () => addTableRow(tableEl) },
        { text: "- 행 삭제", onClick: () => deleteTableRow(tableEl) },
        { text: "+ 오른쪽 열 추가", onClick: () => addTableColumn(tableEl) },
        { text: "- 열 삭제", onClick: () => deleteTableColumn(tableEl) },
        { text: "제목 병합", onClick: () => mergeTableTitle(tableEl) },
        { text: "병합 해제", onClick: () => unmergeTableTitle(tableEl) }
    ];

    buttons.forEach((info) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "table-action-btn";
        btn.textContent = info.text;
        btn.addEventListener("click", info.onClick);
        btnWrap.appendChild(btn);
    });

    group.appendChild(btnWrap);
    container.appendChild(group);
};