
const GITHUB_URL = "https://chathamabate.github.io/"

async function main() {

    /*
    let relProjectPaths = [
        "data/TIUnit.json",
        "data/GC.json",
        "data/CHUnit.json",
        "data/TIMS.json",
    ];
    */

    let relProjectPaths = [
        "data/CY.json",
        "data/Lavner.json",
        "data/Datadog.json",
        "data/Brigade.json",
    ];

    let projectPaths = relProjectPaths.map(rpp => GITHUB_URL + rpp);
    let projectSection = await newCardSection(projectPaths);

    let body = document.getElementById("b");
    body.appendChild(projectSection);
}

main();
