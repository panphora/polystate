# Polystate

![npm bundle size](https://img.shields.io/bundlephobia/minzip/polystate)

Polystate lets you set and unset CSS classes on any element with a click.

Much better than including a large framework for simple sites.

## Install

**Load from CDN:** 

Add this `<script>` tag just before your closing `</body>` tag.

```html
<script src="https://cdn.jsdelivr.net/gh/panphora/polystate@v0.6.1/dist/polystate.min.js"></script>
```

You can start using it right away!

**Install from NPM:** (Alternative) 

```js
npm i polystate
```

Include it in your script.
```js
import polystate from 'polystate';
```

## Examples

**Sidebar**

```html
<button data-click-to-toggle-class="sidebar-open">toggle sidebar</button>
<aside data-click-away-to-remove-class="sidebar-open" data-show-if=".sidebar-open">sidebar content</aside>
```

[View Sidebar Demo](https://codepen.io/panphora/pen/ZEYRbbE)

**Tabs**
```html
<button data-click-to-add-class="tab-1-active" data-click-to-remove-class="[tab-2-active,tab-3-active]">Tab 1</button>
<button data-click-to-add-class="tab-2-active" data-click-to-remove-class="[tab-1-active,tab-3-active]">Tab 2</button>
<button data-click-to-add-class="tab-3-active" data-click-to-remove-class="[tab-1-active,tab-2-active]">Tab 3</button>
<div data-show-if=".tab-1-active">Content for the first tab.</div>
<div data-show-if=".tab-2-active">Content for the second tab.</div>
<div data-show-if=".tab-3-active">Content for the third tab.</div>
```

[View Tabs Demo](https://codepen.io/panphora/pen/RwNJWWx)

**Nav Menu**
```html
<button data-click-to-toggle-class="nav-menu-open">Toggle Menu</button>
<ul class="nav-menu__menu" data-click-away-to-remove-class="nav-menu-open" data-show-if=".nav-menu-open">
  <li><a href="#">Menu Item</a></li>
  <li><a href="#">Menu Item</a></li>
  <li><a href="#">Menu Item</a></li>
</ul>
```

[View Nav Menu Demo](https://codepen.io/panphora/pen/GRgGpZx)

## Learn More

### Set/unset a class when clicking on an element

* `data-click-to-add-class="className selector(optional)"`
  * Adds the `className` class to all elements that mtach `selector` (only when the current element is clicked)
* `data-click-to-remove-class="className selector(optional)"`
  * Removes the `className` class from all elements that mtach `selector` (only when the current element is clicked)
* `data-click-to-toggle-class="className selector(optional)"`
  * Toggles the `className` class on all elements that mtach `selector` (only when the current element is clicked)

**Notes** 

* If `selector` isn't specified, Polystate will default to targeting the `<body>` element.
* `selector` isn't assumed to be a class, so it must include either a `.` (for a class selector), `#` (for an ID selector), or `[]` (for an attribute selector)

### Set/unset a class when clicking *AWAY FROM* an element

* `data-click-away-to-add-class="className selector(optional)"`
  * Adds the `className` class to all elements that mtach `selector` (only when an element that's not the current element is clicked)
* `data-click-away-to-remove-class="className selector(optional)"`
  * Removes the `className` class from all elements that mtach `selector` (only when an element that's not the current element is clicked)
* `data-click-away-to-toggle-class="className selector(optional)"`
  * Toggles the `className` class on all elements that mtach `selector` (only when an element that's not the current element is clicked)

**Important** 

* A click away action will *NOT* trigger if the current click event also triggers a normal click action targeting the same `className` and `selector`

### Control visibility of elements

* `data-show-if="selector"`
  * shows element *ONLY* if it or any ancestor element matches the `selector`
* `data-hide-if="selector"`
  * hides element if it or any ancestor element matches the `selector`

**Notes** 

* The visibility styles that make these attributes work are generated automatically as soon as Polystate loads.





