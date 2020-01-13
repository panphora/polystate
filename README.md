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

## Use

*Sidebar*
```html
<button data-click-to-toggle-class="sidebar-open">toggle sidebar</button>
<aside data-click-away-to-remove-class="sidebar-open" data-show-if=".sidebar-open">sidebar content</aside>
```

[View Demo]()

*Tabs*
```html
<button data-click-to-add-class="tab-1-active" data-click-to-remove-class="[tab-2-active,tab-3-active]">Tab 1</button>
<button data-click-to-add-class="tab-2-active" data-click-to-remove-class="[tab-1-active,tab-3-active]">Tab 2</button>
<button data-click-to-add-class="tab-3-active" data-click-to-remove-class="[tab-1-active,tab-2-active]">Tab 3</button>
<div data-show-if=".tab-1-active">Content for the first tab.</div>
<div data-show-if=".tab-2-active">Content for the second tab.</div>
<div data-show-if=".tab-3-active">Content for the third tab.</div>
```

*Nav Menu*
```html
<button data-click-to-toggle-class="nav-menu-open">Toggle Menu</button>
<ul class="nav-menu__menu" data-click-away-to-remove-class="nav-menu-open" data-show-if=".nav-menu-open">
  <li><a href="#">Menu Item</a></li>
  <li><a href="#">Menu Item</a></li>
  <li><a href="#">Menu Item</a></li>
</ul>
```

## Learn

