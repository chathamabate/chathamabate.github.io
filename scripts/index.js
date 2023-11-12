
const GITHUB_URL = "https://raw.githubusercontent.com/chathamabate/chathamabate.github.io/main";

// Copied from some guy's blog.
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

function getTimelineString(timeline) {
    let sm = timeline[0][0];
    let sy = timeline[0][1];

    let em = timeline[1][0];
    let ey = timeline[1][1];

    // Same start and end.
    if (sm === em && sy === ey) {
        return getMonthName(sm) + " " + sy;
    }

    let smStr = getMonthName(sm);
    let emStr = getMonthName(em);

    // Same year, but different month.
    if (sy === ey) {
        return smStr + "-" + emStr + " " + ey;
    }

    // Different year.
    return smStr + " " + sy + "-" + emStr + " " + ey;
}

/* Project Header Functions */

function newIcon(relpath) {
    let iconDiv = document.createElement("div");
    iconDiv.classList.add("iconContainer");

    let img = document.createElement("img");
    img.width = "200";
    img.src = GITHUB_URL + "/" + relpath;

    iconDiv.appendChild(img);

    return iconDiv;
}

function newHeaderTextContainer(info) {
    let htc = document.createElement("div");
    htc.classList.add("projectHeaderTextContainer");

    // title div contains title and date.
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("projectHeaderTitleDiv");

    let titleSpan = document.createElement("span");
    titleSpan.classList.add("projectHeaderTitle");
    titleSpan.appendChild(document.createTextNode(info.title + " "));

    titleDiv.appendChild(titleSpan);

    let dateLabel = getTimelineString(info.timeline);
    let dateSpan = document.createElement("span");
    dateSpan.classList.add("projectHeaderDate");
    dateSpan.appendChild(document.createTextNode(dateLabel));

    titleDiv.appendChild(dateSpan);

    htc.appendChild(titleDiv);

    // Subtitle div contains just the description.
    
    let subtitleDiv = document.createElement("div");
    subtitleDiv.classList.add("projectHeaderSubtitle");
    subtitleDiv.appendChild(document.createTextNode(info.subtitle));
    htc.appendChild(subtitleDiv);

    // Now we create the skills div.
    // Skills used | links.
    
    let skillsDiv = document.createElement("div");
    skillsDiv.classList.add("projectHeaderSkillsDiv");

    let skillsSpan = document.createElement("span");
    skillsSpan.classList.add("projectHeaderSkillsSpan");

    let skillsText = document.createTextNode(info.skills.join(", "));
    skillsSpan.appendChild(skillsText);
    skillsDiv.appendChild(skillsSpan);

    let linksSpan = document.createElement("span");
    linksSpan.classList.add("projectHeaderLinksSpan");

    for (const link of info.links) {
        let l = document.createElement("a");
        l.classList.add("fa", link.faClass);
        l.href = link.url;
        linksSpan.appendChild(l);
    }
    skillsDiv.appendChild(linksSpan);


    htc.appendChild(skillsDiv);

    return htc;
}

function newProjectHeader(info) {
    let header = document.createElement("div");
    header.classList.add("projectHeader");
    
    let icon = newIcon(info.icon);
    // header.appendChild(icon);

    let htc = newHeaderTextContainer(info);
    header.appendChild(htc);

    return header;
}

/* Project Body Section */

function newBodyFigure(content) {
    let figureDiv = document.createElement("div");
    figureDiv.classList.add("projectFigureDiv");

    let figure = document.createElement("img");
    figure.classList.add("projectFigure");
    figure.src = GITHUB_URL + "/" + content.relpath;
    figureDiv.appendChild(figure);

    let description = document.createElement("div");
    description.classList.add("projectFigureDescription");
    description.appendChild(document.createTextNode(content.description));
    figureDiv.appendChild(description);

    return figureDiv;
}

function newBodyParagraph(content) {
    let pgDiv = document.createElement("div");
    pgDiv.classList.add("projectParagraph")

    let pgString = content.lines.join(" ");
    pgDiv.appendChild(document.createTextNode(pgString));

    return pgDiv;
}

function newProjectBody(info) {
    let projectBodyDiv = document.createElement("div");
    projectBodyDiv.classList.add("projectBody");

    for (const content of info.body) {
        let tag = content.contentType;

        if (tag === "fg") {
            projectBodyDiv.appendChild(newBodyFigure(content)); 
        } else if (tag === "pg") {
            projectBodyDiv.appendChild(newBodyParagraph(content)); 
        }
    }

    return projectBodyDiv;
}


async function newProjectSection(dirname) {
    let info_res = await fetch(GITHUB_URL + "/projects/" + dirname + "/info.json");
    let info = await info_res.json();

    let section = document.createElement("div");
    section.classList.add("project");

    let header = newProjectHeader(info);
    section.appendChild(header);

    let body = newProjectBody(info);
    section.appendChild(body);

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
