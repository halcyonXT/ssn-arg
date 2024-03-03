function processMessages() {
    let messageElements = document.querySelectorAll("[data-from]");

    const STATION_TABLE = {
        "APOLLON": {
            number: 0,
            rep: "Magnus Whiteford",
            insignia: "⎉",
            timezone: "GMT+1"
        },
        "NEBULA": {
            number: 1,
            rep: "Frederik Hellqvist",
            insignia: "⦽",
            timezone: "GMT+1"
        },
        "VELVET": {
            number: 2,
            rep: "Daniil Salas",
            insignia: "⎈",
            timezone: "GMT+1"
        },
        "MEDUSA": {
            number: 3,
            rep: "Abaad Bensaïd",
            insignia: "⏣",
            timezone: "GMT+1"
        },
        "SILVER": {
            number: 4,
            rep: "Lucas Reed",
            insignia: "⬲",
            timezone: "GMT+1"
        },
        "MARROW": {
            number: 5,
            rep: "Colton Adams",
            insignia: "⥉",
            timezone: "GMT+1"
        },
        "TORQUE": {
            number: 6,
            rep: "Bukin Leonidovich",
            insignia: "🕀",
            timezone: "GMT+0"
        },
        "DESIRE": {
            number: 4,
            rep: "Leonie Weber",
            insignia: "〶",
            timezone: "GMT+1"
        },
    }

    const workstationMessage = (element, name) => {
        element.classList.add("t");

        let FROM, pattern = name.slice(0, 2);

        for (let key of Object.keys(STATION_TABLE)) {
            if (key.startsWith(pattern)) {
                FROM = key;
                break;
            }
        }

        let username = document.createElement("p");
        username.classList.add("username");
        username.textContent = `${STATION_TABLE[FROM].insignia} ${name}`


        let metadata = document.createElement("div");
        metadata.classList.add("metadata");
        const date = element.getAttribute("data-date").toUpperCase(), time = STATION_TABLE[FROM].timezone;
        metadata.innerHTML = `<p>${date}</p><p>${time}</p>`

        element.insertBefore(metadata, element.firstChild);
        element.insertBefore(username, element.firstChild);
    }

    for (let element of messageElements) {
        const FROM = element.getAttribute("data-from").toUpperCase();

        if (!(FROM in STATION_TABLE)) {
            workstationMessage(element, FROM);
            continue;
        }

        element.classList.add("t");

        let username = document.createElement("p");
        username.classList.add("username");
        username.textContent = `${STATION_TABLE[FROM].insignia} ${FROM} (st. ${STATION_TABLE[FROM].number})`

        let rep = document.createElement("p");
        rep.classList.add("rep");
        rep.textContent = `Rep: ${STATION_TABLE[FROM].rep}`

        let metadata = document.createElement("div");
        metadata.classList.add("metadata");
        const date = element.getAttribute("data-date").toUpperCase(), time = STATION_TABLE[FROM].timezone;
        metadata.innerHTML = `<p>${date}</p><p>${time}</p>`

        element.insertBefore(metadata, element.firstChild);
        element.insertBefore(rep, element.firstChild);
        element.insertBefore(username, element.firstChild);
    }

    document.removeEventListener("DOMContentLoaded", processMessages);
}

document.addEventListener("DOMContentLoaded", processMessages);