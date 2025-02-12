
const GITHUB_URL = "https://chathamabate.github.io/"

async function main() {
    // Hacky resize trick.
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    let relProjectPaths = [
        "data/TIRtx.json",
        "data/TIUnit.json",
        "data/GC.json",
        "data/CHUnit.json",
        "data/TIMS.json",
    ];

    let projectPaths = relProjectPaths.map(rpp => GITHUB_URL + rpp);
    let projectSection = await newCardSection(projectPaths);

    let relExperiencePaths = [
        "data/ISci.json",
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

    let dynamicSection = document.getElementById("dyna");
    dynamicSection.appendChild(toggleDiv);
}

main();
