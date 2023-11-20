
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

function newTextDiv(text, ...classes) { 
    let newDiv = document.createElement("div");

    classes.forEach((c) => newDiv.classList.add(c));

    newDiv.appendChild(document.createTextNode(text));

    return newDiv;
}

// Children should be an array of nodes to append.
function newParentDiv(children, ...classes) {
    let pDiv = document.createElement("div");
    classes.forEach((c) => pDiv.classList.add(c));

    for (const c of children) {
        pDiv.appendChild(c);
    }

    return pDiv;
}
