const mainNavigation = document.getElementById("main-navigation");
const mainMenu = getElementByClass("main-menu", mainNavigation);

console.log("mainMenu", mainMenu);
console.log("mainMenu.tagName", mainMenu.tagName.toLowerCase());

const pageHeaderRight = getElementByClass("page-header-right");
if (pageHeaderRight) {
    if (pageHeaderRight.children.length > 2) {
        addMenuItem(pageHeaderRight.children[2], mainMenu);
    }
    if (pageHeaderRight.children.length > 1) {
        addMenuItem(pageHeaderRight.children[1], mainMenu);
    }
    // addMenuItem(pageHeaderRight, mainMenu);
}

const fixedBar = getElementByClass("fixed-bar");
if (fixedBar && fixedBar.children.length) {
    fixedBar.classList.add("fixed-bar-menu");

    const index = fixedBar.children.length > 1 ? 1 : 0;

    configureToggleElement(fixedBar.children[index].children[0], "eye10", "Piilota lohkot");
    configureToggleElement(fixedBar.children[index].children[1], "eye9", "Näytä lohkot");

    if (index > 0) {
        fixedBar.removeChild(fixedBar.children[index - 1]);
    }
    addMenuItem(fixedBar, mainMenu)
}

function configureToggleElement(element, className, tooltip) {
    element.innerHTML = "";
    element.setAttribute("title", "");
    element.setAttribute("data-toggle", "tooltip");
    element.setAttribute("data-original-title", tooltip);

    const i = document.createElement("i");
    // i.setAttribute("src", chrome.runtime.getURL("svg/eye-9.svg"));
    i.classList.add(className);

    element.appendChild(i);
}

function addMenuItem(element, menuElement) {
    if (menuElement && menuElement.tagName.toLowerCase() == "ul") {

        console.log("menuElement.children", menuElement.children);

        if (menuElement.children.length) {
            const item = document.createElement("li");
            item.appendChild(element)

            console.log("item", item);

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
