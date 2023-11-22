
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

    return titleLineDiv;
}

function newCardSubtitleLine(info) {
    const subtitle = info.subtitle;
    return newTextDiv(subtitle, "cardSubtitle");
}

function newCardLinkAnchor(link) {
    let anchor = document.createElement("a");
    anchor.classList.add("fa", link.faClass, "miscUI", "clickable", "cardLink");

    anchor.href = link.url;

    return anchor;
}

function newCardSpecsLine(info) {
    const skills = info.skills;
    const links = info.links;

    let skillsDiv = newTextDiv(skills.join(", "), "cardSkills");

    let linkAnchors = links.map(newCardLinkAnchor);
    let parentLinkDiv = newParentDiv(linkAnchors, "cardLinksContainer");

    let specsLineDiv = newParentDiv(
        [skillsDiv, parentLinkDiv], "cardSpecsLine"
    );

    return specsLineDiv;
}

function newCardHeader(info) {
    let lines = [
        newCardTitleLine(info),
        newCardSubtitleLine(info),
    ];

    if (("links" in info) && ("skills" in info)) {
        lines.push(newCardSpecsLine(info));
    }

    let headerDiv = newParentDiv(
        lines, "cardHeader"
    );

    return headerDiv;
}

// Card Body Creation

function newCardBodyFigure(content) {
    let figureImage = document.createElement("img");
    figureImage.classList.add("cardFigureImage");
    figureImage.src = content.relpath;

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
    let smButtonDiv = newTextDiv("See More", "miscUI", "clickable", "cardSMButton");
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
            button.innerText = "See Less";
        } else {
            bcd.style.display = "none";
            button.innerText = "See More";
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
    let bodyDiv = newCardBody(info.body);

    let card = newParentDiv(
        [headerDiv, bodyDiv], "card"
    );

    return card;
}

async function newCardSection(cardPaths) {
    let cardDivs = [];

    for (let i = 0; i < cardPaths.length; i++) {
        if (i > 0) {
            let space = document.createElement("div");
            space.classList.add("cardDivider");

            cardDivs.push(space);
        }

        const cardPath = cardPaths[i];

        let response = await fetch(cardPath);    
        let info = await response.json();

        cardDivs.push(newCard(info));

    }

    let cardSection = newParentDiv(cardDivs, "cardSection");

    return cardSection;
}
