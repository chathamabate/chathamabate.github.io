
const GITHUB_URL = "https://raw.githubusercontent.com/chathamabate/chathamabate.github.io/main";

// Copied from some guy's blog.
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

function newIcon(relpath) {
    let iconDiv = document.createElement("div");
    iconDiv.classList.add("iconContainer");

    let img = document.createElement("img");
    img.width = "200";
    img.src = GITHUB_URL + "/" + relpath;

    iconDiv.appendChild(img);

    return iconDiv;
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

    // title div contains title and date?
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("projectHeaderTitleDiv");

    let titleSpan = document.createElement("span");
    titleSpan.classList.add("projectHeaderTitle");
    titleSpan.appendChild(document.createTextNode(info.title + " "));

    titleDiv.appendChild(titleSpan);

    let dateLabel = getMonthName(info.month) + " " + info.year;
    let dateSpan = document.createElement("span");
    dateSpan.classList.add("projectHeaderDate");
    dateSpan.appendChild(document.createTextNode(dateLabel));

    titleDiv.appendChild(dateSpan);

    htc.appendChild(titleDiv);

    // Subtitle div contains just the description.
    
    let subtitleDiv = newTextDiv("h2", info.subtitle);
    htc.appendChild(subtitleDiv);

    // Now we create the specs div.
    // Specs div includes Date | Skills used | links.
    
    let specsDiv = document.createElement("div");

    let skillsSpan = document.createElement("span");
    skillsSpan.classList.add("specSkills");

    let skillsBold = document.createElement("b");
    skillsBold.appendChild(document.createTextNode("Skills: "))
    skillsSpan.appendChild(skillsBold);

    let skillsText = document.createTextNode(info.skills.join(" "));
    skillsSpan.appendChild(skillsText);

    specsDiv.appendChild(skillsSpan);

    htc.appendChild(specsDiv);


    // Add links after the title.
    /*
    for (const link of info.links) {
        let s = document.createElement("span");
        let ico = document.createElement("i");

        ico.classList.add("fa", link.faClass);

        s.appendChild(ico);
    }
    */


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
