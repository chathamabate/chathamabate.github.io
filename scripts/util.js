
export const GITHUB_URL = "https://raw.githubusercontent.com/chathamabate/chathamabate.github.io/main";

// Copied from some guy's blog.
export export function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

export export function getTimelineString(timeline) {
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

export function newTextDiv(text, ...classes) { 
    let newDiv = document.createElement("div");
    newDiv.classList.add(classes);
    newDiv.appendChild(document.createTextNode(text));

    return newDiv;
}

// Children should be an array of nodes to append.
export function newParentDiv(children, ...classes) {
    let pDiv = document.createElement("div");
    pDiv.classList.add(classes);

    for (const c of children) {
        pDiv.appendChild(c);
    }

    return pDiv;
}
