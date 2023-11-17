

async function main() {
    let info_res = await fetch(GITHUB_URL + "/projects/GC/info.json");
    let info = await info_res.json();

    let c = newCard(info);
    console.log(c);
    document.appendChild(c);
}

main();
