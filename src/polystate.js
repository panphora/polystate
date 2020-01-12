// <body>
//   <button data-click-to-toggle-class="menu-open">toggle</button>
//   <aside data-click-away-to-remove-class="menu-open" data-show-if=".menu-open">menu</aside>
// </body>

// data-click-to-add-class="className .selector(optional)"
// data-click-away-to-add-class="className .selector(optional)"
// data-click-to-remove-class="className .selector(optional)"
// data-click-away-to-remove-class="className .selector(optional)"
// data-click-to-toggle-class="className .selector(optional)"
// data-click-away-to-toggle-class="className .selector(optional)"

// data-hide-if=".menu-open" 
  // hides element if it or any ancestor element has class "menu-open"
// data-show-if=".menu-open"
  // shows element ONLY if it or any ancestor element has class "menu-open"

  // generate visibility styles automatically using JS

// don't trigger click away actions if there's a click action affecting 
//   the same class OR the same class and selector

(function () {
  let clickSelectors = [
    "[data-click-to-add-class]",
    "[data-click-to-remove-class]",
    "[data-click-to-toggle-class]"
  ];

  let clickAwaySelectors = [
    "[data-click-away-to-add-class]",
    "[data-click-away-to-remove-class]",
    "[data-click-away-to-toggle-class]"
  ];

  let actionFunctionLookup = {
    "[data-click-to-add-class]": ({selector, className}) => {
      manipulateClass({selector, className, actionType: "add"});
    },
    "[data-click-away-to-add-class]": ({selector, className}) => {
      manipulateClass({selector, className, actionType: "add"});
    },
    "[data-click-to-remove-class]": ({selector, className}) => {
      manipulateClass({selector, className, actionType: "remove"});
    },
    "[data-click-away-to-remove-class]": ({selector, className}) => {
      manipulateClass({selector, className, actionType: "remove"});
    },
    "[data-click-to-toggle-class]": ({selector, className}) => {
      manipulateClass({selector, className, actionType: "toggle"});
    },
    "[data-click-away-to-toggle-class]": ({selector, className}) => {
      manipulateClass({selector, className, actionType: "toggle"});
    }
  };

  function manipulateClass ({selector, className, actionType}) {
    let elems = Array.from(document.querySelectorAll(selector));

    elems.forEach(elem => {
      if (actionType === "remove" || actionType === "toggle" && elem.classList.contains(className)) {
        elem.classList.remove(className);
      } else if (actionType === "add" || actionType === "toggle" && !elem.classList.contains(className)) {
        elem.classList.add(className);
      }
    });
  }

  document.addEventListener("click", (event) => {
    let clickActions = getAllClickActions(event.target, clickSelectors.join(","));
    // console.log("clickActions", clickActions);
    clickActions.forEach(clickAction => clickAction.actionFunc(clickAction.actionArgs));

    let clickAwayActions = getAllClickAwayActions(event.target, clickActions);
    // console.log("clickAwayActions", clickAwayActions);
    clickAwayActions.forEach(clickAwayAction => clickAwayAction.actionFunc(clickAwayAction.actionArgs));
  });

  function getAllClickActions (elem, selector) {
    let parent = elem.parentNode;
    let actions = [];

    if (!selector || elem.matches(selector)) {
      let actionDetails = getActionDetailsFromElem(elem, clickSelectors);
      actions = actions.concat(actionDetails);
    }

    while (parent !== document) {
      if (!selector || parent.matches(selector)) {
        let actionDetails = getActionDetailsFromElem(parent, clickSelectors);
        actions = actions.concat(actionDetails);
      }
      parent = parent.parentNode;
    }

    return actions;
  }

  function getActionDetailsFromElem (elem, selectorsList) {
    let matchingSelectors = getMatchingSelectors(elem, selectorsList);
    return matchingSelectors.map(selector => {
      let attrName = selector.replace(/^\[+|\]+$/g, "");
      let attrValue = elem.getAttribute(attrName);
      let actionArgs = getArgsFromString(attrValue);
      let actionFunc = actionFunctionLookup[selector];
      return {elem, selector, attrName, attrValue, actionArgs, actionFunc};
    });
  }

  function getAllClickAwayActions (clickedElem, clickActions) {
    let clickedElems = getSelfAndAllAncestors(clickedElem);
    let clickAwayElems = Array.from(document.querySelectorAll(clickAwaySelectors.join(",")));
    let clickAwayElemsNotClickedOn = clickAwayElems.filter(el => !clickedElems.includes(el));

    return clickAwayElemsNotClickedOn.reduce((arr, elem) => {
      let actionDetails = getActionDetailsFromElem(elem, clickAwaySelectors);
      // filter out matching actions (same selector and class name) 
      // that have already been triggered by click actions
      let actionDetailsFiltered = actionDetails.filter(awayAction => {
        let matchingClickAction = clickActions.find(clickAction => {
          let selectorMatch = clickAction.actionArgs.selector === awayAction.actionArgs.selector;
          let classMatch = clickAction.actionArgs.className === awayAction.actionArgs.className;
          return selectorMatch && classMatch;
        });
        return !matchingClickAction;
      });
      return arr.concat(actionDetailsFiltered);
    }, []);
  }

  function getSelfAndAllAncestors (elem) {
    let parents = [elem];
    let parent = elem.parentNode;
    while (parent !== document) {
      parents.push(parent);
      parent = parent.parentNode;
    }
    return parents;
  }

  function getMatchingSelectors (elem, selectors) {
    return selectors.filter(selector => elem.matches(selector));
  }

  function getArgsFromString (str) {
    let args = str.split(" ");
    if (args.length === 1) {
      args.push("body");
    }
    let [className, selector] = args;
    return {selector, className};
  }

  let visibilityStyles = Array.from(document.querySelectorAll("[data-show-if], [data-hide-if]")).map(showIfElem => {
    let showSelector = showIfElem.getAttribute("data-show-if");
    let hideSelector = showIfElem.getAttribute("data-hide-if");
    let showStyles = "";
    let hideStyles = "";

    if (showSelector) {
      showStyles = `${showSelector} [data-show-if="${showSelector}"], ${showSelector}[data-show-if="${showSelector}"] {display: block;} [data-show-if="${showSelector}"] {display: none}`;
    }

    if (hideSelector) {
      hideStyles = `${hideSelector} [data-hide-if="${hideSelector}"], ${hideSelector}[data-hide-if="${hideSelector}"] {display: none;}`;
    }

    return showStyles + hideStyles;
  }).join("");

  document.head.insertAdjacentHTML("beforeend", "<style>" + visibilityStyles + "</style>")
})()








