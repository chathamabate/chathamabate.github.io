
const GITHUB_URL = "https://chathamabate.github.io/"

async function main() {
    let info_res = await fetch(GITHUB_URL + "projects/GC/info.json");
    let info = await info_res.json();

    let c = newCard(info);

    let body = document.getElementById("b");
    body.appendChild(c);
}

main();
