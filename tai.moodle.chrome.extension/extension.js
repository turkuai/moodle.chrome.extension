// Auto scroll
const urlParams = new URLSearchParams(window.location.search);
const scrollPosition = urlParams.get("scrollTo")

if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
}

// Move the buttons.
const mainNavigation = document.getElementById("main-navigation");
const mainMenu = getElementByClass("main-menu", mainNavigation);

if (mainMenu) {
    const titleButtonsMoved = moveTitleButtons(mainMenu);
    moveFixedBarButtons(mainMenu, titleButtonsMoved);
}

// Set scroll handler for second edit button.
const editItem = getElementByClass("item-turneditingcourse");
// console.log("editItem", editItem);
if (editItem && editItem.children.length > 0) {
    setupEditElementToHandleScroll(editItem.children[0]);
}

removeDropdownHrefs();

// ----------------------------------------------------------------------------

function removeDropdownHrefs() {
    
    for (element of document.getElementsByClassName("dropdown-toggle")) {
        if (element.tagName.toLowerCase() == "a" && element.getAttribute("href") == "#") {
            element.removeAttribute("href");
        }
    }
}

// ----------------------------------------------------------------------------

function setupEditElementToHandleScroll(editElement) {
    editElement.addEventListener("click", event => {

        let anchorElement = event.target;
        if (!anchorElement.href) {
            anchorElement = anchorElement.parentElement;
        }

        if (anchorElement.href) {
            const scrollValue = calculateScrollY(anchorElement.classList.contains("isediting") ? -1 : 1);
            anchorElement.href = anchorElement.href + "%26scrollTo=" + scrollValue;
        }
    });
}

const ADD_BUTTON_HEIGHT = 42; // hack
const EDIT_BUTTON_HEIGHT = 35; // hack

function calculateScrollY(direction) {

    let topElementsCount = 0;
    let gap = 0;
    for (element of document.getElementsByClassName("section main")) {
        const bounds = element.getBoundingClientRect();

        if (bounds.bottom < ADD_BUTTON_HEIGHT) {
            topElementsCount++;

            if (bounds.bottom > 0) {
                gap = ADD_BUTTON_HEIGHT - bounds.bottom;
                break;
            }

        } else {
            break;
        }
    }

    return Math.round(window.scrollY + ((topElementsCount * ADD_BUTTON_HEIGHT + gap) * direction));
}

// ----------------------------------------------------------------------------

function moveTitleButtons(mainMenu) {
    const pageHeaderRight = getElementByClass("page-header-right");
    if (pageHeaderRight) {
        if (pageHeaderRight.children.length > 2) {
            const editItem = pageHeaderRight.children[2];

            setupEditElementToHandleScroll(editItem);

            // Edit item.
            insertMenuItemAsFirst(editItem, mainMenu);
        }
        if (pageHeaderRight.children.length > 1) {
            insertMenuItemAsFirst(pageHeaderRight.children[1], mainMenu);
        }

        return true;

    } else {
        return false;
    }
}

function moveFixedBarButtons(mainMenu, removeSettings = true) {
    const fixedBar = getElementByClass("fixed-bar");

    if (fixedBar && fixedBar.children.length) {

        const index = fixedBar.children.length > 1 ? 1 : 0;

        const eyeButton = fixedBar.children[index];

        configureIconElement(eyeButton.children[0], "eye10", "Piilota lohkot");
        configureIconElement(eyeButton.children[1], "eye9", "Näytä lohkot");
        
        const settingsButton = fixedBar.children[index - 1];

        if (settingsButton) {
            if (index > 0 && removeSettings) {
                fixedBar.removeChild(settingsButton);
            } else {
                settingsButton.classList.remove("fixed-panel-link");
                configureIconElement(settingsButton.children[0], "fa fa-cog", "Kurssinhallinta");
            }
        }

        insertMenuItemAsFirst(fixedBar, mainMenu);
    }
}

function configureIconElement(element, className, tooltip) {
    element.innerHTML = "";
    element.setAttribute("title", "");
    element.setAttribute("data-toggle", "tooltip");
    element.setAttribute("data-original-title", tooltip);

    const i = document.createElement("i");
    i.className = className;

    element.appendChild(i);
}

function insertMenuItemAsFirst(element, menuElement) {
    if (menuElement && menuElement.tagName.toLowerCase() == "ul") {

        if (menuElement.children.length) {
            const item = document.createElement("li");
            item.appendChild(element)

            menuElement.insertBefore(item, menuElement.children[0]);

            return item;
        }
    }

    return null;
}

function getElementByClass(className, parent) {
    if (!parent) {
        parent = document;
    }
    const element = parent.getElementsByClassName(className);

    if (element && element.length) {
        return element[0];
    } else {
        return null;
    }
}
