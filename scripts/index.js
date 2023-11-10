
const GITHUB_URL = "https://raw.githubusercontent.com/chathamabate/chathamabate.github.io/main";

function newTextDiv(tag, text) {
    let div = document.createElement("div");
    let inner = document.createElement(tag);

    inner.appendChild(document.createTextNode(text));
    div.appendChild(inner);

    return div;
}

function newProjectHeader(info) {
    let header = document.createElement("div");
    header.classList.add("projectHeader");

    let titleDiv = newTextDiv("h1", info.title);
    header.appendChild(titleDiv);

    let subtitleDiv = newTextDiv("h2", info.subtitle);
    header.appendChild(subtitleDiv);

    return header;
}

async function newProjectSection(dirname) {
    let info_res = await fetch(GITHUB_URL + "/projects/" + dirname + "/info.json");
    let info = await info_res.json();

    let section = document.createElement("div");
    section.classList.add("project");

    let header = newProjectHeader(info);
    section.appendChild(header);


    return section;
}

async function main() {
    let info_res = await fetch(GITHUB_URL + "/projects/info.json");
    let info = await info_res.json();

    let body = document.getElementById("b");

    for (const subdir of info.projects) {
        s = await newProjectSection(subdir);
        body.appendChild(s);
        console.log(s.info);
    }
}

main();
