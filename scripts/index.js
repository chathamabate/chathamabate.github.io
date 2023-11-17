
const GITHUB_URL = "https://chathamabate.github.io/"

async function main() {

    let relProjectPaths = [
        "data/TIUnit.json",
        "data/GC.json",
        "data/CHUnit.json",
        "data/TIMS.json",
    ];

    let projectPaths = relProjectPaths.map(rpp => GITHUB_URL + rpp);
    let projectSection = newCardSection(projectPaths);

    let body = document.getElementById("b");
    body.appendChild(projectSection);
}

main();
