
// This script is for generating cards!
// Cards can be used anywhere, but are mainly
// used for projects and work experience.


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

function newCardLinkDiv(link) {
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

    let linkDivs = links.map(newCardLinkDiv);
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

function newCardBodyFigure(content) {
    let figureImage = document.createElement("img");
    figureImage.classList.add("cardFigureImage");
    figureImage.src = GITHUB_URL + "/" + content.relpath;

    let figureDescription = newTextDiv(content.description, "cardFigureDescription");

    let figureDiv = newParentDiv(
        [figureImage, figureDescription], "cardFigure"
    );

    return figureDiv;
}

function newCardBodyParagraph(content) {
    let pgDiv = newTextDiv(
        content.lines.join(" "),
        "cardParagraph"
    );

    return pgDiv;
}

function newCardBody(body) {
    let smButtonDiv = newTextDiv("See More", "cardSMButton");
    let smButtonContainerDiv = newParentDiv(
        [smButtonDiv], "cardSMButtonContainer"
    );

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
            bodyContentDiv.appendChild(newCardBodyFigure(content)); 
        } else if (tag === "pg") {
            bodyContentDiv.appendChild(newCardBodyParagraph(content)); 
        }
    }

    // Hook up button.
    bodyContentDiv.style.display = "none";

    const bcd = bodyContentDiv;
    const button = smButtonDiv;
    smButtonDiv.onclick = () => {
        if (bcd.style.display === "none") {
            bcd.style.display = "block";
            button.innerText = "Show Less";
        } else {
            bcd.style.display = "none";
            button.innerText = "Show More";
        }
    };

    let bodyDiv = newParentDiv(
        [smButtonContainerDiv, bodyContentDiv], "cardBody"
    );

    return bodyDiv;
}

// Card Creation.

function newCard(info) {
    let headerDiv = newCardHeader(info);
    let bodyDiv = newCardBody(body);

    let card = newParentDiv(
        [headerDiv, bodyDiv], "card"
    );

    return card;
}
