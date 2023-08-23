addEventListener("load", event => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollPosition = urlParams.get("scrollTo")

    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
        console.log("scrollPosition:", scrollPosition);
    }    
});

const editItem = getElementByClass("item-turneditingcourse");
console.log("editItem", editItem);
if (editItem && editItem.children.length > 0) {
    setupEditElementToHandleScroll(editItem.children[0]);
}

const mainNavigation = document.getElementById("main-navigation");
const mainMenu = getElementByClass("main-menu", mainNavigation);

console.log("mainMenu", mainMenu);
console.log("mainMenu.tagName", mainMenu.tagName.toLowerCase());

if (mainMenu) {
    moveTitleButtons(mainMenu);
    moveFixedBarButtons(mainMenu);
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

            console.log("original href:", anchorElement.href);

            const scrollValue = calculateScrollY(anchorElement.classList.contains("isediting") ? -1 : 1);
            anchorElement.href = anchorElement.href + "%26scrollTo=" + scrollValue;

            console.log("new href:", anchorElement.href);
        }
    });
}

function calculateScrollY(direction) {

    const sectionElements = document.getElementsByClassName("section main");

    // console.log("window:", window.scrollY, window.screenTop, window.innerHeight);
    // console.log("sectionElements:", sectionElements);

    let topElementsCount = 0;
    for (element of sectionElements) {
        if (element.offsetTop + element.offsetHeight < window.scrollY) {
            topElementsCount++;
        } else {
            break;
        }
        // console.log("offset:", element.id, element.offsetTop, element.offsetHeight);
        // console.log("element:", element);
    }

    topElementsCount++;

    console.log("topElementsCount:", topElementsCount);
    return window.scrollY + (topElementsCount * 42 * direction);
}

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
    if (fixedBar && fixedBar.children.length) {
        fixedBar.classList.add("fixed-bar-menu");

        const index = fixedBar.children.length > 1 ? 1 : 0;

        configureToggleElement(fixedBar.children[index].children[0], "eye10", "Piilota lohkot");
        configureToggleElement(fixedBar.children[index].children[1], "eye9", "Näytä lohkot");

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
        }
    }
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
