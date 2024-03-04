
/**
 * <div class="cind">
            <a href="pages/board-nexus.html"><p><u>Expedition Updates</u></p></a>
            <p>></p>
            <p>Thread EU-1b-2921979</p>
            <div class="arch">ARCHIVED</div>
        </div>
 */
String.prototype.toTitleCase = function() {
    return this.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    );
}


function processThreadHeader() {
    let header = document.querySelector('[data-thread]');

    if (!(header.classList.contains("cind"))) {
        header.classList.add("cind");
    }

    let lowercased = header?.dataset.thread.toLowerCase();

    let HTML = "";
    let threadData = null;

    for (let type of Object.keys(THREAD_TABLE)) {
        for (let boardName of Object.keys(THREAD_TABLE[type])) {
            for (let thread of THREAD_TABLE[type][boardName].threads.active) {
                if (thread.name.toLowerCase() === lowercased) {
                    threadData = {
                        metadata: {
                            type,
                            board: boardName,
                            state: "active"
                        },
                        ...thread
                    }
                }
            }
            for (let thread of THREAD_TABLE[type][boardName].threads.archived) {
                if (thread.name.toLowerCase() === lowercased) {
                    threadData = {
                        metadata: {
                            type,
                            board: boardName,
                            state: "archived"
                        },
                        ...thread
                    }
                }
            }
        }
    }

    if (!threadData) {return console.warn("No thread data")};

    HTML += `<a href="${URL_BASE}pages/board-nexus.html"><p><u>${threadData.metadata.board.replaceAll("_"," ").toTitleCase()}</u></p></a>`
    HTML += `<p>></p>`
    HTML += `<p>Thread ${threadData.name} (${threadData.title})</p>`

    if (threadData.metadata.state === "archived") {
        HTML += `<div class="arch">ARCHIVED</div>`;
    }

    header.innerHTML = HTML;

    document.removeEventListener("DOMContentLoaded", processThreadHeader);
}

document.addEventListener("DOMContentLoaded", processThreadHeader);