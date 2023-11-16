

// This script is for generating cards!
// Cards can be used anywhere, but are mainly
// used for projects and work experience.

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
        return smStr + "—" + emStr + " " + ey;
    }

    // Different year.
    return smStr + " " + sy + "—" + emStr + " " + ey;
}

// A Card will have the following structure.
//
// CardHeader:
//  Title       Date
//  Subtitle
//  Specs       Links       
//
// CardBody: 
//  Read More button.
//  Content...
//
// Cards are generated from info files with the following
// structure:
//
//    title: string
//    subtitle: string
//
//    timeline: [
//        [startMonth, startYear],
//        [endMonth, endYear]
//    ]
//
//    links: [{faClass:string, url:string}]
//    skills: [string]
//
//    body: [
//        {
//            contentType: ("fg" | "pg")
//            
//            // if "fg"
//            relpath: string,
//            description: string
//
//            // if "pg"
//            lines: [string]
//        }
//    ]


// Card Header Creation.

function newTextDiv(text, ...classes) { 
    let newDiv = document.createElement("div");
    newDiv.classList.add(classes);
    newDiv.appendChild(document.createTextNode(text));

    return newDiv;
}

// Children should be an array of nodes to append.
function newParentDiv(children, ...classes) {
    let pDiv = document.createElement("div");
    pDiv.classList.add(classes);

    for (const c of children) {
        pDiv.appendChild(c);
    }

    return pDiv;
}

function newCardTitleLine(info) {
    const title = info.title;
    const dateString = getTimelineString(info.timeline);
    
    let titleDiv = newTextDiv(title, "cardTitle");
    let dateDiv = newTextDiv(dateString, "cardDate");
    
    let titleLineDiv = newParentDiv(
        [titleDiv, dateDiv], "cardTitleLine"
    );
}

function newCardSubtitleLine(info) {
    const subtitle = info.subtitle;
    return newTextDiv(subtitle, "cardSubtitle");
}

function newLinkDiv(link) {
    let div = document.createElement("div");
    div.classList.add("fa", link.faClass, "cardLink");

    const url = link.url;
    link.onclick = () => {
        window.open(url, "_blank");
    };

    return div;
}

function newCardSpecsLine(info) {
    const skills = info.skills;
    const links = info.links;

    let skillsDiv = newTextDiv(skills.join(", "), "cardSkills");

    let linkDivs = links.map(newLinkDiv);
    let parentLinkDiv = newParentDiv(linkDivs, "cardLinksContainer");

    let specsLineDiv = newParentDiv(
        [skillsDiv, parentLinkDiv], "cardSpecsLine"
    );

    return specsLineDiv;
}

function newCardHeader(info) {
    let titleLine = newCardTitleLine(info);
    let subtitleLine = newCardSubtitleLine(info);
    
    let headerDiv = newParentDiv(
        [titleLine, subtitleLine, specsLine], "cardHeader"
    );
}

// Card Body Creation

function newBodyFigure(content) {
    let figureImage = document.createElement("img");
    figureImage.classList.add("cardFigureImage");
    figureImage.src = GITHUB_URL + "/" + content.relpath;

    let figureDescription = newTextDiv(content.description, "cardFigureDescription");

    let figureDiv = newParentDiv(
        [figureImage, figureDescription], "cardFigure"
    );

    return figureDiv;
}

function newBodyParagraph(content) {
    let pgDiv = newTextDiv(
        content.lines.join(" "),
        "cardParagraph"
    );

    return pgDiv;
}

function newBody(body) {

    

    let bodyContentDiv = document.createElement("div");
    bodyContentDiv.classList.add("cardBodyContentContainer");

    for (let i = 0; i < body.length; i++) {
        // Add in divider.
        if (i > 0) {
            let divider = document.createElement("div");
            divider.classList.add("cardBodyContentDivider");

            bodyContentDiv.appendChild(divider);
        }

        const content = body[i];

        let tag = content.contentType;

        if (tag === "fg") {
            bodyContentDiv.appendChild(newBodyFigure(content)); 
        } else if (tag === "pg") {
            bodyContentDiv.appendChild(newBodyParagraph(content)); 
        }
    }

}



// Generate
