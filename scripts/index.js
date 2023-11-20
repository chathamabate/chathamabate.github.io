
const GITHUB_URL = "https://chathamabate.github.io/"

async function main() {

    let relProjectPaths = [
        "data/TIUnit.json",
        "data/GC.json",
        "data/CHUnit.json",
        "data/TIMS.json",
    ];

    let projectPaths = relProjectPaths.map(rpp => GITHUB_URL + rpp);
    let projectSection = await newCardSection(projectPaths);

    let relExperiencePaths = [
        "data/CY.json",
        "data/Lavner.json",
        "data/Datadog.json",
        "data/Brigade.json",
    ];

    let experiencePaths = relExperiencePaths.map(rep => GITHUB_URL + rep);
    let experienceSection = await newCardSection(experiencePaths);

    let toggles = [
        {
            label: "Projects",
            pane: projectSection
        },
        {
            label: "Experience",
            pane: experienceSection
        }
    ];

    let toggleDiv = newToggleDiv(toggles);

    let body = document.getElementById("b");
    body.appendChild(toggleDiv);
}

main();
