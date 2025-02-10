
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

    if (ey === 0 || em === 0) {
        return smStr + " " + sy + "—Present";
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

// Selections of the form... (Must be non-empty)
// [{
//      label: string,
//      pane: DOMElement
// }]
function newToggleDiv(selections) {
    let visiblePaneDiv = document.createElement("div");
    visiblePaneDiv.classList.add("toggleDivVisiblePane");

    let buttonDivs = selections.map((s) => {
        let button = newTextDiv(s.label, "toggleDivButton", "toggleDivButtonUnfocused");
        button.linkedPane = s.pane;

        return button;
    });

    let navBar = newParentDiv(buttonDivs, "toggleDivNavBar");

    // Set the first button div as focused!
    buttonDivs[0].classList.remove("toggleDivButtonUnfocused")
    buttonDivs[0].classList.add("toggleDivButtonFocused")
    navBar.focusedButton = buttonDivs[0];

    visiblePaneDiv.appendChild(buttonDivs[0].linkedPane);

    for (const button of buttonDivs) {
        // Close on button, navBar, and visiblePaneDiv.
        button.onclick = () => {
            if (button === navBar.focusedButton) {
                return; // No change.
            }

            // Change appeances.
            navBar.focusedButton.classList.remove("toggleDivButtonFocused");
            navBar.focusedButton.classList.add("toggleDivButtonUnfocused");

            button.classList.remove("toggleDivButtonUnfocused")
            button.classList.add("toggleDivButtonFocused")

            navBar.focusedButton = button;

            // Change visible Pane.
            visiblePaneDiv.innerHTML = "";
            visiblePaneDiv.appendChild(button.linkedPane);
        };
    }
    
    let toggleDiv = newParentDiv(
        [navBar, visiblePaneDiv], "miscUI", "toggleDiv"
    );

    return toggleDiv;
}
