
let selectedThreadType = "public";

let URL_BASE = "";
URL_BASE = "/ssn-arg/"

String.prototype.toTitleCase = function() {
    return this.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    );
}


const listBoards = (type = "public") => {
    let HTML = "";
    let previousHTML = document.querySelector(`[data-cl="${selectedThreadType}"]`);
    previousHTML.classList.remove("active");
    selectedThreadType = type;
    document.querySelector(`[data-cl="${type}"]`).classList.add("active");
    for (let boardName of Object.keys(THREAD_TABLE[type])) {
        const presentableName = boardName.replaceAll("_", " ").toTitleCase()
        HTML += `<button class="board-list-i" onclick="listThreads('${type}', '${boardName}')">${presentableName} (${THREAD_TABLE[type][boardName].threads.active.length} active, ${THREAD_TABLE[type][boardName].threads.archived.length} archived)</button>`
    }
    let list = document.querySelector('.board-list');
    list.innerHTML = HTML;
}

const listThreads = (type, boardName) => {
    let HTML = "";
    const presentableName = boardName.replaceAll("_", " ").toTitleCase();
    HTML += `<button class="board-list-i" onclick="listBoards('${type}')">${presentableName} (${THREAD_TABLE[type][boardName].threads.active.length} active, ${THREAD_TABLE[type][boardName].threads.archived.length} archived)</button>`

    for (let threadName of THREAD_TABLE[type][boardName].threads.active) {
        HTML += `<button class="board-list-i"><a href="${URL_BASE}/pages/${threadName.name.toLowerCase()}.html">${threadName.title} - ${threadName.name} <small>(AUTHOR: ${threadName.init})</small></a></button>`;
    }

    for (let threadName of THREAD_TABLE[type][boardName].threads.archived) {
        HTML += `<button class="board-list-i"><a href="${URL_BASE}/pages/${threadName.name.toLowerCase()}.html">${threadName.title} - ${threadName.name} <small>(AUTHOR: ${threadName.init})</small></a><div class="arch">ARCHIVED</div></button>`;
    }

    document.querySelector('.board-list').innerHTML = HTML;
}


const __DCL__ = () => {listBoards(selectedThreadType); document.removeEventListener("DOMContentLoaded", __DCL__)}
document.addEventListener("DOMContentLoaded", __DCL__);
