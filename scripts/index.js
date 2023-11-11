
const GITHUB_URL = "https://raw.githubusercontent.com/chathamabate/chathamabate.github.io/main";

function newIcon(relpath) {
    let iconDiv = document.createElement("div");
    iconDiv.classList.add("iconContainer");


    let img = document.createElement("img");
    img.width = "200";
    img.height = "100";
    img.src = GITHUB_URL + "/" + relpath;

    return img;
}

function newTextDiv(tag, text) {
    let div = document.createElement("div");
    let inner = document.createElement(tag);

    inner.appendChild(document.createTextNode(text));
    div.appendChild(inner);

    return div;
}

function newHeaderTextContainer(info) {
    let htc = document.createElement("div");
    htc.classList.add("projectHeaderTextContainer");

    let titleDiv = newTextDiv("h1", info.title);
    htc.appendChild(titleDiv);

    let subtitleDiv = newTextDiv("h2", info.subtitle);
    htc.appendChild(subtitleDiv);

    return htc;
}

function newProjectHeader(info) {
    let header = document.createElement("div");
    header.classList.add("projectHeader");
    
    let icon = newIcon(info.icon);
    header.appendChild(icon);

    let htc = newHeaderTextContainer(info);
    header.appendChild(htc);

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
