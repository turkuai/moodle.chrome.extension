const urlParams = new URLSearchParams(window.location.search);
const scrollPosition = urlParams.get("scrollTo")

if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
    // console.log("scrollPosition:", scrollPosition);
}

// Move the buttons.
const mainNavigation = document.getElementById("main-navigation");
const mainMenu = getElementByClass("main-menu", mainNavigation);

// console.log("mainMenu", mainMenu);
// console.log("mainMenu.tagName", mainMenu.tagName.toLowerCase());

if (mainMenu) {
    moveTitleButtons(mainMenu);
    moveFixedBarButtons(mainMenu);
}

// Set scroll handler for second edit button.
const editItem = getElementByClass("item-turneditingcourse");
// console.log("editItem", editItem);
if (editItem && editItem.children.length > 0) {
    setupEditElementToHandleScroll(editItem.children[0]);
}

// ----------------------------------------------------------------------------

function removeDropdownHrefs() {
    //dropdown-toggle
}

// ----------------------------------------------------------------------------

function setupEditElementToHandleScroll(editElement) {
    editElement.addEventListener("click", event => {
        // event.preventDefault();
        // event.stopPropagation();

        let anchorElement = event.target;
        // console.log("element:", anchorElement);
        if (!anchorElement.href) {
            anchorElement = anchorElement.parentElement;
            // console.log("element 2:", anchorElement);
        }

        if (anchorElement.href) {
            // isediting

            // console.log("original href:", anchorElement.href);

            const scrollValue = calculateScrollY(anchorElement.classList.contains("isediting") ? -1 : 1);
            anchorElement.href = anchorElement.href + "%26scrollTo=" + scrollValue;

            // console.log("new href:", anchorElement.href);
        }
    });
}

const ADD_BUTTON_HEIGHT = 42; // hack
const EDIT_BUTTON_HEIGHT = 35; // hack

function calculateScrollY(direction) {

    const sectionElements = document.getElementsByClassName("section main");

    let topElementsCount = 0;
    let gap = 0;
    for (element of sectionElements) {
        const bounds = element.getBoundingClientRect();
        // console.log(topElementsCount, "offset:", bounds.bottom);

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

    // console.log("topElementsCount:", topElementsCount);
    return Math.round(window.scrollY + ((topElementsCount * 42 + gap) * direction));
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
    }
}

function moveFixedBarButtons(mainMenu) {
    const fixedBar = getElementByClass("fixed-bar");

    // console.log("fixedBar", fixedBar);

    if (fixedBar && fixedBar.children.length) {

        const index = fixedBar.children.length > 1 ? 1 : 0;

        // console.log("fixedBar.children", fixedBar.children);
        // console.log("index", index, fixedBar.children.length);

        const eyeButton = fixedBar.children[index];

        configureToggleElement(eyeButton.children[0], "eye10", "Piilota lohkot");
        configureToggleElement(eyeButton.children[1], "eye9", "Näytä lohkot");
        
        if (index > 0) {
            fixedBar.removeChild(fixedBar.children[index - 1]);
        }

        insertMenuItemAsFirst(fixedBar, mainMenu);
    }
}

function configureToggleElement(element, className, tooltip) {
    element.innerHTML = "";
    element.setAttribute("title", "");
    element.setAttribute("data-toggle", "tooltip");
    element.setAttribute("data-original-title", tooltip);

    const i = document.createElement("i");
    i.classList.add(className);

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
